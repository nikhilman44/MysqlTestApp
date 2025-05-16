// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Register API
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, password], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Email already registered' });
      }
      return res.status(500).json({ message: 'Database error', error: err });
    }

    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
  });
});

router.get("/users", async(request,response)=>{
    const query = 'SELECT * FROM users;'
    db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }

    response.send(result);
  });

})

module.exports = router;
