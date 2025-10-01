const express = require("express");
const db = require("../config/db.js");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.use(verifyToken);

// --- THIS IS THE MISSING ROUTE ---
/**
 * @route   GET /api/orders
 * @desc    Get all orders and their items for the logged-in user
 * @access  Private
 */
router.get("/", async (req, res) => {
  try {
    const userId = req.user.userId;

    // This query joins all three tables to get complete order details
    const query = `
      SELECT 
        o.OrderID, o.OrderDate, o.TotalAmt,
        od.Quantity, od.SubTotal,
        b.Title, b.Author, b.BookImg
      FROM Orders o
      JOIN OrderDetails od ON o.OrderID = od.OrderID
      JOIN Books b ON od.BookID = b.BookID
      WHERE o.CID = ?
      ORDER BY o.OrderDate DESC;
    `;
    const [rows] = await db.execute(query, [userId]);

    // Group the flat list of items by their OrderID
    const orders = {};
    rows.forEach(row => {
      if (!orders[row.OrderID]) {
        orders[row.OrderID] = {
          id: row.OrderID,
          date: row.OrderDate,
          total: row.TotalAmt,
          items: []
        };
      }
      orders[row.OrderID].items.push({
        title: row.Title,
        author: row.Author,
        quantity: row.Quantity,
        subtotal: row.SubTotal,
        imageUrl: row.BookImg
      });
    });

    // Send the structured list of orders back to the frontend
    res.json(Object.values(orders));

  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// This is your existing route for creating an order
router.post("/", async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const userId = req.user.userId;
    const { shippingAddress, paymentMethod } = req.body;

    const [cartItems] = await connection.execute(
      "SELECT c.BookID, c.Quantity, b.Price, b.Title, b.Stock FROM Cart c JOIN Books b ON c.BookID = b.BookID WHERE c.CID = ?",
      [userId]
    );

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Your cart is empty." });
    }

    for (const item of cartItems) {
      if (item.Stock < item.Quantity) {
        await connection.rollback();
        return res.status(400).json({
          message: `Sorry, we don't have enough stock for "${item.Title}". Available: ${item.Stock}, Requested: ${item.Quantity}.`,
        });
      }
    }

    const totalAmount = cartItems.reduce((sum, item) => sum + item.Price * item.Quantity, 0);

    const [orderResult] = await connection.execute(
      "INSERT INTO Orders (CID, TotalAmt, OrderDate) VALUES (?, ?, NOW())",
      [userId, totalAmount]
    );
    const orderId = orderResult.insertId;

    for (const item of cartItems) {
      const subTotal = item.Price * item.Quantity;
      await connection.execute(
        "INSERT INTO OrderDetails (OrderID, BookID, Quantity, SubTotal) VALUES (?, ?, ?, ?)",
        [orderId, item.BookID, item.Quantity, subTotal]
      );
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

