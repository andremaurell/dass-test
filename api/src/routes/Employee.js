const express = require("express");
const router = express.Router();
const pool = require("../database");

// Rota para criar um novo funcionário
router.post("/", async (req, res) => {
  const { cpf, name, email, shirtSize, shoeSize } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO employees (cpf, name, email, shirt_size, shoe_size)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
      [cpf, name, email, shirtSize, shoeSize]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating employee:", error);
    res
      .status(400)
      .json({ error: "Error creating employee.", details: error.message });
  }
});

router.get("/", async (req, res) => {
  const { search, shirt_size, shoe_size } = req.query;

  try {
    let query = "SELECT * FROM employees WHERE 1=1";
    const params = [];
    let paramIndex = 1;

    if (search) {
      query += ` AND (cpf ILIKE $${paramIndex} OR name ILIKE $${paramIndex} OR email ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    if (shirt_size) {
      query += ` AND shirt_size = $${paramIndex}`;
      params.push(shirt_size);
      paramIndex++;
    }

    if (shoe_size) {
      query += ` AND shoe_size = $${paramIndex}`;
      params.push(shoe_size);
      paramIndex++;
    }

    const result = await pool.query(query, params);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res
      .status(500)
      .json({ error: "Error fetching employees.", details: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { cpf, name, email, shirtSize, shoeSize } = req.body;

  try {
    const result = await pool.query(
      `UPDATE employees
       SET cpf = $1, name = $2, email = $3, shirt_size = $4, shoe_size = $5
       WHERE id = $6
       RETURNING *`,
      [cpf, name, email, shirtSize, shoeSize, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Employee not found." });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating employee:", error);
    res
      .status(400)
      .json({ error: "Error updating employee.", details: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM employees WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Employee not found." });
    }

    res.status(200).json({ message: "Employee deleted successfully." });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res
      .status(500)
      .json({ error: "Error deleting employee.", details: error.message });
  }
});

module.exports = router;
