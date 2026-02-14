const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log('🚀 Starting Server...');
console.log('🔧 CORS Origin:', corsOptions.origin);

// Health check endpoint
app.get('/api/health', (req, res) => {
  console.log('✅ GET /api/health');
  res.json({ message: '✅ Server is running', timestamp: new Date() });
});

// ⭐ LOAD ALL ROUTES
console.log('📌 Loading routes...');
app.use('/api/auth', require('./routes/auth'));
console.log('  ✅ /api/auth loaded');

app.use('/api/advisors', require('./routes/advisors'));
console.log('  ✅ /api/advisors loaded');

app.use('/api/appointments', require('./routes/appointments'));
console.log('  ✅ /api/appointments loaded');

app.use('/api/users', require('./routes/users'));
console.log('  ✅ /api/users loaded');

// 404 handler
app.use('/api', (req, res) => {
  console.log('❌ 404 - Route not found:', req.method, req.originalUrl);
  res.status(404).json({ 
    message: 'API endpoint not found',
    requested: req.method + ' ' + req.originalUrl,
    available: [
      'GET /api/health',
      'GET /api/advisors',
      'GET /api/advisors/:id',
      'POST /api/appointments',
      'GET /api/appointments'
    ]
  });
});

// General error handler
app.use((err, req, res, next) => {
  console.error('🔴 Server Error:', err);
  res.status(500).json({ 
    message: 'Internal server error', 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Server error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n✅ Server running on http://localhost:${PORT}`);
  console.log(`🔗 Test in browser:`);
  console.log(`   http://localhost:${PORT}/api/health`);
  console.log(`   http://localhost:${PORT}/api/advisors\n`);
});

module.exports = app;