const mysql = require('mysql2');
const migration = require('mysql-migrations');
const path = require('path');
require('dotenv').config();

const connection = mysql.createPool({
  connectionLimit: process.env.DB_CONNECTION_LIMIT || 10,
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'NewPassword123!',
  database: process.env.DB_NAME || 'sql'
});

migration.init(connection, path.join(__dirname, 'migrations'));
