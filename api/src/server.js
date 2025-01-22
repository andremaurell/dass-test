const express = require('express');
const cors = require('cors');
const pool = require('./database'); 
const EmployeeRoutes = require('./routes/Employee');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Database connected at:', res.rows[0].now);
  }
});

async function initializeDatabase() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS employees (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      cpf VARCHAR(11) NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      shirt_size VARCHAR(2) NOT NULL CHECK (shirt_size IN ('PP', 'P', 'M', 'G', 'GG', 'XG')),
      shoe_size INT NOT NULL CHECK (shoe_size BETWEEN 34 AND 48),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    const client = await pool.connect();
    await client.query(createTableQuery);
    console.log("'employees' table verified/created succesfully");
    client.release();
  } catch (error) {
    console.error("Error to verify/create employees table:", error);
    process.exit(1);
  }
}

initializeDatabase()


app.use('/api/employees', EmployeeRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});