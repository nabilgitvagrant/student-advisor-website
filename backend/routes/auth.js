const express = require('express');
const router = express.Router();

// Register endpoint
router.post('/register', (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: 1,
        name,
        email
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login endpoint
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    res.json({
      message: 'Login successful',
      token: 'fake_token_12345',
      user: {
        id: 1,
        name: 'John Doe',
        email
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Logout endpoint
router.post('/logout', (req, res) => {
  res.json({ message: 'Logout successful' });
});

module.exports = router;