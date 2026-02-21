const mongoose = require('mongoose');

const advisorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: String,
  specialty: String,
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0
  },
  bio: String,
  availability: String,
  education: [String],
  experience: [String],
  expertise: [String],
  languages: [String],
  image: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Advisor', advisorSchema);