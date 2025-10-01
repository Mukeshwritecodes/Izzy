const express = require("express");
const db = require("../config/db.js");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

// This ensures all routes in this file are protected and require a valid token.
router.use(verifyToken);

/**
 * @route   GET /api/orders
 * @desc    Get all orders and their items for the logged-in user
 * @access  Private
 */
router.get("/", async (req, res) => {
  try {
    const userId = req.user.userId;

    // This SQL query joins the Orders, OrderDetails, and Books tables
    // to collect all necessary information for the user's order history.
    const query = `
      SELECT 
        o.OrderID,
        o.OrderDate,
        o.TotalAmt,
        od.Quantity,
        od.SubTotal,
        b.Title,
        b.Author,
        b.BookImg
      FROM Orders o
      JOIN OrderDetails od ON o.OrderID = od.OrderID
      JOIN Books b ON od.BookID = b.BookID
      WHERE o.CID = ?
      ORDER BY o.OrderDate DESC;
    `;
    const [rows] = await db.execute(query, [userId]);

    // The database returns a flat list of items. We need to group them by OrderID
    // to create a structured response for the frontend.
    const orders = {};
    rows.forEach((row) => {
      // If we haven't seen this OrderID yet, create a new order object.
      if (!orders[row.OrderID]) {
        orders[row.OrderID] = {
          id: row.OrderID,
          date: row.OrderDate,
          total: row.TotalAmt,
          items: [], // This array will hold the books for this order.
        };
      }
      // Add the current book item to its corresponding order.
      orders[row.OrderID].items.push({
        title: row.Title,
        author: row.Author,
        quantity: row.Quantity,
        subtotal: row.SubTotal,
        imageUrl: row.BookImg,
      });
    });

    // Convert the orders object into an array and send it to the frontend.
    res.json(Object.values(orders));
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @route   POST /api/orders
 * @desc    Create a new order from the user's cart (existing code)
 * @access  Private
 */
router.post("/", async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const userId = req.user.userId;
    const { shippingAddress, paymentMethod } = req.body; // These are available if you add them to your Orders table

    const [cartItems] = await connection.execute("SELECT c.BookID, c.Quantity, b.Price FROM Cart c JOIN Books b ON c.BookID = b.BookID WHERE c.CID = ?", [userId]);

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Your cart is empty." });
    }

    const totalAmount = cartItems.reduce((sum, item) => sum + item.Price * item.Quantity, 0);

    const [orderResult] = await connection.execute("INSERT INTO Orders (CID, TotalAmt, OrderDate) VALUES (?, ?, NOW())", [userId, totalAmount]);
    const orderId = orderResult.insertId;

    for (const item of cartItems) {
      const subTotal = item.Price * item.Quantity;
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
