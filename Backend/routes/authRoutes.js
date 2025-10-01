const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db.js");
const twilio = require("twilio");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const otpStore = {};

// == ENDPOINT 1: SEND OTP ==
router.post("/send-otp", async (req, res) => {
  const { phoneNo } = req.body;
  if (!phoneNo) {
    return res.status(400).json({ message: "Phone number is required." });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = Date.now() + 10 * 60 * 1000;
  otpStore[phoneNo] = { otp, expiry };

  try {
    // --- THIS CODE IS NOW ACTIVE ---
    // Use the Twilio client to send the real SMS
    await twilioClient.messages.create({
      body: `Your verification code for Izzy Bookstore is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio number
      to: phoneNo, // The user's number
    });

    // Check if the user already exists to inform the frontend
    const [rows] = await db.execute("SELECT CID FROM Customer WHERE PhoneNo = ?", [phoneNo]);
    const userExists = rows.length > 0;
    res.status(200).json({ message: "OTP sent successfully.", userExists });
  } catch (error) {
    console.error("Error during OTP sending:", error);
    res.status(500).json({ message: "Failed to send OTP. Please check the phone number." });
  }
});

// == ENDPOINT 2: VERIFY OTP & LOGIN/PROMPT REGISTRATION ==
router.post("/verify-otp", async (req, res) => {
  const { phoneNo, otp } = req.body;
  const storedOtpData = otpStore[phoneNo];

  if (!storedOtpData) {
    return res.status(400).json({ message: "OTP not found or expired. Please try again." });
  }
  if (Date.now() > storedOtpData.expiry) {
    delete otpStore[phoneNo];
    return res.status(400).json({ message: "OTP has expired. Please request a new one." });
  }
  if (storedOtpData.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP." });
  }

  delete otpStore[phoneNo];

  try {
    const [rows] = await db.execute("SELECT * FROM Customer WHERE PhoneNo = ?", [phoneNo]);

    if (rows.length > 0) {
      const user = rows[0];
      const token = jwt.sign({ userId: user.CID, name: user.Name }, JWT_SECRET, { expiresIn: "7d" });
      res.status(200).json({ message: "Login successful.", token, user: { Name: user.Name, Email: user.Email, Address: user.Address, PhoneNo: user.PhoneNo } });
    } else {
      const registrationToken = jwt.sign({ phoneNo }, JWT_SECRET, { expiresIn: "10m" });
      res.status(201).json({ message: "Phone number verified. Please complete your registration.", registrationToken });
    }
  } catch (error) {
    console.error("Database error on verify-otp:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// == ENDPOINT 3: COMPLETE REGISTRATION ==
router.post("/register", async (req, res) => {
  const { name, email, password, registrationToken } = req.body;

  if (!name || !email || !password || !registrationToken) {
    return res.status(400).json({ message: "All fields are required." });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(registrationToken, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired registration token." });
  }

  const { phoneNo } = decodedToken;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute("INSERT INTO Customer (Name, Email, PhoneNo, Address, Password) VALUES (?, ?, ?, ?, ?)", [name, email, phoneNo, "", hashedPassword]);

    const newUserId = result.insertId;
    const token = jwt.sign({ userId: newUserId, name }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ message: "Registration successful!", token, user: { Name: name, Email: email, Address: "", PhoneNo: phoneNo } });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "An account with this email or phone number already exists." });
    }
    console.error("Database error on register:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
