const express = require('express');
const router = express.Router();

// Mock users data
let users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    major: 'Computer Science',
    year: 'Junior'
  }
];

// Get all users
router.get('/', (req, res) => {
  try {
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single user
router.get('/:id', (req, res) => {
  try {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create user
router.post('/', (req, res) => {
  try {
    const newUser = {
      id: users.length + 1,
      ...req.body
    };
    users.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update user
router.put('/:id', (req, res) => {
  try {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    Object.assign(user, req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete user
router.delete('/:id', (req, res) => {
  try {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    const deletedUser = users.splice(index, 1);
    res.json({ message: 'User deleted', user: deletedUser[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;