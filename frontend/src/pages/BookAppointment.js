import React, { useState } from 'react';
import { appointmentService } from '../services/appointmentService';
import '../styles/BookAppointment.css';

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    topic: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await appointmentService.create(formData);
      setSubmitted(true);
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          topic: ''
        });
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      setError('Failed to book appointment: ' + error.message);
    }
  };

  if (submitted) {
    return (
      <div className="book-appointment">
        <div className="success-message">
          <h2>✅ Appointment Booked Successfully!</h2>
          <p>You will receive a confirmation email shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="book-appointment">
      <h1>Book an Appointment</h1>
      <p>Schedule a meeting with one of our expert advisors</p>

      <form onSubmit={handleSubmit} className="appointment-form">
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="Your full name"
          />
        </div>

        <div className="form-group">
          <label>Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your.email@example.com"
          />
        </div>

        <div className="form-group">
          <label>Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div className="form-group">
          <label>Date *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Time *</label>
          <select
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          >
            <option value="">Select a time</option>
            <option value="9:00 AM">9:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="1:00 PM">1:00 PM</option>
            <option value="2:00 PM">2:00 PM</option>
            <option value="3:00 PM">3:00 PM</option>
            <option value="4:00 PM">4:00 PM</option>
            <option value="5:00 PM">5:00 PM</option>
          </select>
        </div>

        <div className="form-group">
          <label>Topic of Discussion *</label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            required
            placeholder="e.g., Major Selection, Career Planning"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-large">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;