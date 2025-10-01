const express = require("express");
const db = require("../config/db.js");
const router = express.Router();

/**
 * @route   GET /api/books
 * @desc    Get all books
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM Books");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// --- CORRECT ROUTE ORDER ---
// Specific routes like '/search' MUST be defined BEFORE dynamic routes like '/:id'.

/**
 * @route   GET /api/books/search
 * @desc    Search for books by title or author
 * @access  Public
 */
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query; // e.g., /search?q=habits

    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const searchQuery = `
      SELECT * FROM Books 
      WHERE Title LIKE ? OR Author LIKE ?
    `;
    const searchTerm = `%${q}%`;

    const [rows] = await db.execute(searchQuery, [searchTerm, searchTerm]);

    res.json(rows);
  } catch (error) {
    console.error("Error searching books:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @route   GET /api/books/:id
 * @desc    Get a single book by its BookID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.execute("SELECT * FROM Books WHERE BookID = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    const book = rows[0];
    const [relatedBooks] = await db.execute("SELECT * FROM Books WHERE CategoryID = ? AND BookID != ? LIMIT 4", [book.CategoryID, book.BookID]);

    res.json({
      mainBook: book,
      related: relatedBooks,
    });
  } catch (error) {
    console.error(`Error fetching book with ID ${req.params.id}:`, error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
