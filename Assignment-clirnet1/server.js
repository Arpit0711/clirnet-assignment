const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Create Express app
const app = express();

// Middleware to parse request body as JSON
app.use(express.json());

// In-memory database for demo purposes
const users = [
  { id: 1, username: 'admin', password: '12345' },
  { id: 2, username: 'jane', password: 'password2' }
];

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Find user by username and password in the database
  const user = users.find(user => user.username === username && user.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token with user ID as payload
  const token = jwt.sign({ userId: user.id }, 'secret_key', { expiresIn: '1h' });

  // Return success response with JWT token
  res.json({ message: 'Login successful', token });
});

// Start server on port 3000
app.listen(3000, () => {
  console.log('Server started on port 3000');
});