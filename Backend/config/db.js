require("dotenv").config();
const mysql = require("mysql2/promise");
const fs = require("fs");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    // This is often required for cloud databases like Aiven
    // You'll need to download your CA certificate file
    ca: fs.readFileSync("./ca.pem"),
  },
});

console.log("MySQL Connection Pool Created.");
module.exports = pool;
