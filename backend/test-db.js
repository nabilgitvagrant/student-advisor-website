const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

console.log('🔌 Testing MongoDB Connection...');
console.log('📍 URI:', uri.split('@')[0] + '@[HIDDEN]');

mongoose.connect(uri)
  .then(() => {
    console.log('✅ SUCCESS! MongoDB connected!');
    process.exit(0);
  })
  .catch(err => {
    console.log('❌ ERROR:', err.message);
    console.log('\n💡 Troubleshooting:');
    console.log('1. Check MongoDB URI is correct');
    console.log('2. Check IP is whitelisted (0.0.0.0/0)');
    console.log('3. Check username and password');
    console.log('4. Check internet connection');
    process.exit(1);
  });