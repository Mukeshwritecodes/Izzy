// routes/authRoutes.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db.js");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// In-memory store for OTPs. In production, use a more persistent store like Redis.
const otpStore = {};

// == ENDPOINT 1: SEND OTP ==
router.post("/send-otp", async (req, res) => {
  const { phoneNo } = req.body;
  if (!phoneNo) {
    return res.status(400).json({ message: "Phone number is required." });
  }

  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

  otpStore[phoneNo] = { otp, expiry };

  // --- OTP Sending Simulation ---
  // In a real application, you would use an SMS service like Twilio here.
  console.log(`✅ OTP for ${phoneNo} is: ${otp}. (Expires in 10 minutes)`);
  // Example with Twilio:
  // twilioClient.messages.create({ body: `Your OTP is ${otp}`, from: '+123456789', to: phoneNo });

  try {
    const [rows] = await db.execute("SELECT CID FROM Customer WHERE PhoneNo = ?", [phoneNo]);
    const userExists = rows.length > 0;
    res.status(200).json({ message: "OTP sent successfully.", userExists });
  } catch (error) {
    console.error("Database error on send-otp:", error);
    res.status(500).json({ message: "Internal server error." });
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

  // OTP is correct, clear it from the store
  delete otpStore[phoneNo];

  try {
    const [rows] = await db.execute("SELECT * FROM Customer WHERE PhoneNo = ?", [phoneNo]);

    if (rows.length > 0) {
      // --- USER EXISTS: LOGIN ---
      const user = rows[0];
      const token = jwt.sign({ userId: user.CID, name: user.Name }, JWT_SECRET, { expiresIn: "7d" });
      res.status(200).json({ message: "Login successful.", token, user: { name: user.Name, email: user.Email } });
    } else {
      // --- USER DOES NOT EXIST: PROCEED TO REGISTER ---
      // Create a temporary token that verifies the phone number for the next step
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
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      "INSERT INTO Customer (Name, Email, PhoneNo, Address, Password) VALUES (?, ?, ?, ?, ?)",
      [name, email, phoneNo, "", hashedPassword] // Address is optional, empty for now
    );

    const newUserId = result.insertId;
    const token = jwt.sign({ userId: newUserId, name }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ message: "Registration successful!", token, user: { name, email } });
  } catch (error) {
    // Handle potential duplicate email/phone errors
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "An account with this email or phone number already exists." });
    }
    console.error("Database error on register:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
