const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Izzy Bookstore Backend 🚀");
});

// Example API
app.get("/api/books", (req, res) => {
  res.json([
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 2, title: "1984", author: "George Orwell" },
    { id: 3, title: "Pride and Prejudice", author: "Jane Austen" },
  ]);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
