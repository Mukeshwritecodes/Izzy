const express = require("express");
const db = require("../config/db.js");
const verifyToken = require("../middleware/verifyToken");
const bcrypt = require("bcrypt");

const router = express.Router();

// GET current user's profile (Protected Route)
router.get("/", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT CID, Name, Email, PhoneNo, Address FROM Customer WHERE CID = ?",
      [req.user.userId] // Get user ID from the token payload
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching profile:", error); // Added error logging
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// *** UPDATED ROUTE ***
// UPDATE user's profile (Protected Route)
router.put("/", verifyToken, async (req, res) => {
  // 1. Use the correct capitalized keys from the frontend
  const { Name, Email, Address } = req.body;

  // Basic validation
  if (!Name || !Email) {
    return res.status(400).json({ message: "Name and Email are required." });
  }

  try {
    // 2. Use the capitalized variables in the query
    await db.execute("UPDATE Customer SET Name = ?, Email = ?, Address = ? WHERE CID = ?", [Name, Email, Address, req.user.userId]);
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    // 3. Log the specific database error for easier debugging
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// UPDATE user's password (Protected Route)
router.put("/password", verifyToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const [rows] = await db.execute("SELECT Password FROM Customer WHERE CID = ?", [req.user.userId]);
    if (rows.length === 0) return res.status(404).json({ message: "User not found" });

    const currentHashedPassword = rows[0].Password;

    const isMatch = await bcrypt.compare(currentPassword, currentHashedPassword);
    if (!isMatch) return res.status(401).json({ message: "Incorrect current password" });

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    await db.execute("UPDATE Customer SET Password = ? WHERE CID = ?", [newHashedPassword, req.user.userId]);

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error); // Added error logging
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
