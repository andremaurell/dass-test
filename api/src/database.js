const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'employee_user',
  password: process.env.DB_PASSWORD || 'securepassword',
  database: process.env.DB_NAME || 'employee_manager',
  port: process.env.DB_PORT || 5432,
});

module.exports = pool;