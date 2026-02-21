const express = require('express');
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

// ========== Health Check ==========
app.get('/api/health', (req, res) => {
  res.json({ 
    message: '✅ Server is running',
    timestamp: new Date()
  });
});

// ========== Routes ==========
console.log('📌 Loading routes...');

try {
  app.use('/api/auth', require('./routes/auth'));
  console.log('  ✅ /api/auth loaded');
} catch (error) {
  console.error('  ❌ Error loading auth:', error.message);
}

try {
  app.use('/api/advisors', require('./routes/advisors'));
  console.log('  ✅ /api/advisors loaded');
} catch (error) {
  console.error('  ❌ Error loading advisors:', error.message);
}

try {
  app.use('/api/appointments', require('./routes/appointments'));
  console.log('  ✅ /api/appointments loaded');
} catch (error) {
  console.error('  ❌ Error loading appointments:', error.message);
}

try {
  app.use('/api/users', require('./routes/users'));
  console.log('  ✅ /api/users loaded');
} catch (error) {
  console.error('  ❌ Error loading users:', error.message);
}

// ========== 404 Handler ==========
app.use('/api', (req, res) => {
  console.log('❌ 404 - Route not found:', req.method, req.originalUrl);
  res.status(404).json({ 
    message: 'API endpoint not found',
    requested: req.method + ' ' + req.originalUrl
  });
});

// ========== Error Handler ==========
app.use((err, req, res, next) => {
  console.error('🔴 Server Error:', err.message);
  res.status(500).json({ 
    message: 'Internal server error', 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Server error'
  });
});

// ========== Start Server ==========
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n✅ Server running on http://localhost:${PORT}`);
  console.log(`🔗 Test: http://localhost:${PORT}/api/health\n`);
});

module.exports = app;