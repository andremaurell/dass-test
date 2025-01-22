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

// Rotas
app.use('/api/employees', EmployeeRoutes);

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});