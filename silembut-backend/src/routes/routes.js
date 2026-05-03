const express = require('express');
const router = express.Router();
const db = require('../database/db');
    

// ambil semua loans
router.get('/loans', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM loans');
  res.json(rows);
});

module.exports = router;
