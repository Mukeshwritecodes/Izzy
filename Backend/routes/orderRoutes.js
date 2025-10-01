const express = require("express");
const db = require("../config/db.js");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.use(verifyToken);

router.post("/", async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const userId = req.user.userId;
    const { shippingAddress, paymentMethod } = req.body;

    const [cartItems] = await connection.execute(
      // Also select the book title for clear error messages
      "SELECT c.BookID, c.Quantity, b.Price, b.Title, b.Stock FROM Cart c JOIN Books b ON c.BookID = b.BookID WHERE c.CID = ?",
      [userId]
    );

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Your cart is empty." });
    }

    // --- THIS IS THE NEW LOGIC ---
    // 1. Check stock for every item in the cart BEFORE creating the order.
    for (const item of cartItems) {
      if (item.Stock < item.Quantity) {
        // If any item is out of stock, stop the entire process.
        await connection.rollback();
        return res.status(400).json({
          message: `Sorry, we don't have enough stock for "${item.Title}". Available: ${item.Stock}, Requested: ${item.Quantity}.`,
        });
      }
    }

    const totalAmount = cartItems.reduce((sum, item) => sum + item.Price * item.Quantity, 0);

    const [orderResult] = await connection.execute("INSERT INTO Orders (CID, TotalAmt, OrderDate) VALUES (?, ?, NOW())", [userId, totalAmount]);
    const orderId = orderResult.insertId;

    for (const item of cartItems) {
      const subTotal = item.Price * item.Quantity;
      // This will now only run if stock is sufficient, and the trigger will handle the update.
      await connection.execute("INSERT INTO OrderDetails (OrderID, BookID, Quantity, SubTotal) VALUES (?, ?, ?, ?)", [orderId, item.BookID, item.Quantity, subTotal]);
    }

    await connection.execute("DELETE FROM Cart WHERE CID = ?", [userId]);
    await connection.commit();

    res.status(201).json({ message: "Order placed successfully!", orderId });
  } catch (error) {
    await connection.rollback();
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    connection.release();
  }
});

module.exports = router;
