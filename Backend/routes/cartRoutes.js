const express = require("express");
const db = require("../config/db.js");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

// All cart routes are protected and require a logged-in user
router.use(verifyToken);

// GET /api/cart - Fetch all items in the user's cart
router.get("/", async (req, res) => {
  try {
    const userId = req.user.userId;
    const query = `
      SELECT c.BookID, c.Quantity, b.Title, b.Price, b.BookImg
      FROM Cart c
      JOIN Books b ON c.BookID = b.BookID
      WHERE c.CID = ?
    `;
    const [items] = await db.execute(query, [userId]);
    res.json(items);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST /api/cart - Add an item or update its quantity
router.post("/", async (req, res) => {
  try {
    const userId = req.user.userId;
    const { bookId } = req.body;

    // Check if the item is already in the cart
    const [existing] = await db.execute("SELECT * FROM Cart WHERE CID = ? AND BookID = ?", [userId, bookId]);

    if (existing.length > 0) {
      // If it exists, increment the quantity
      await db.execute("UPDATE Cart SET Quantity = Quantity + 1 WHERE CID = ? AND BookID = ?", [userId, bookId]);
    } else {
      // If it's a new item, insert it
      await db.execute("INSERT INTO Cart (CID, BookID, Quantity) VALUES (?, ?, 1)", [userId, bookId]);
    }
    res.status(200).json({ message: "Item added to cart" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// PUT /api/cart/:bookId - Update a specific item's quantity
router.put("/:bookId", async (req, res) => {
  try {
    const userId = req.user.userId;
    const { bookId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    await db.execute("UPDATE Cart SET Quantity = ? WHERE CID = ? AND BookID = ?", [quantity, userId, bookId]);
    res.status(200).json({ message: "Cart updated" });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// DELETE /api/cart/:bookId - Remove an item from the cart
router.delete("/:bookId", async (req, res) => {
  try {
    const userId = req.user.userId;
    const { bookId } = req.params;
    await db.execute("DELETE FROM Cart WHERE CID = ? AND BookID = ?", [userId, bookId]);
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
