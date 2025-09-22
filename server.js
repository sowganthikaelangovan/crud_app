import dotenv from "dotenv";
import express from "express";
import mysql from "mysql2/promise";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Create DB connection
const pool = await mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Test route
app.get("/", (req, res) => {
  res.send("🚀 API is working!");
});

// Example: get lists with user + liked users
app.get("/lists", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT l.Id, l.Topic, l.Description, l.Content, l.IsActive, 
             u.FirstName, u.LastName,
             (SELECT JSON_ARRAYAGG(JSON_OBJECT('Id', lu.Id, 'FirstName', lu.FirstName, 'LastName', lu.LastName))
              FROM Likes li
              JOIN Users lu ON lu.Id = li.UserId
              WHERE li.ListId = l.Id) AS LikedUsers
      FROM Lists l
      JOIN Users u ON u.Id = l.CreatedBy
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌍 Server running at http://localhost:${PORT}`);
});
