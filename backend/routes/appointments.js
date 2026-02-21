const express = require('express');
const router = express.Router();

// Mock appointments storage (in memory)
let appointments = [];
let nextId = 1;

// ========== GET ALL APPOINTMENTS ==========
router.get('/', (req, res) => {
  try {
    console.log('✅ GET /appointments - returned', appointments.length, 'appointments');
    res.json(appointments);
  } catch (error) {
    console.error('❌ Error fetching appointments:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// ========== CREATE APPOINTMENT ==========
router.post('/', (req, res) => {
  try {
    const { fullName, email, phone, date, time, topic } = req.body;

    console.log('📅 Appointment request from:', email);

    // Validation
    if (!fullName || !email || !phone || !date || !time || !topic) {
      console.log('❌ Missing fields');
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate phone format (basic)
    if (phone.length < 10) {
      return res.status(400).json({ message: 'Invalid phone number' });
    }

    // Create appointment
    const appointment = {
      id: nextId++,
      fullName,
      email,
      phone,
      date,
      time,
      topic,
      status: 'Confirmed',
      createdAt: new Date()
    };

    appointments.push(appointment);

    console.log('✅ Appointment created:', fullName, 'on', date, 'at', time);

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment
    });
  } catch (error) {
    console.error('❌ Error creating appointment:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// ========== GET SINGLE APPOINTMENT ==========
router.get('/:id', (req, res) => {
  try {
    const appointment = appointments.find(a => a.id === parseInt(req.params.id));
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    console.log('✅ GET /appointments/:id - returned appointment', req.params.id);
    res.json(appointment);
  } catch (error) {
    console.error('❌ Error fetching appointment:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// ========== UPDATE APPOINTMENT ==========
router.put('/:id', (req, res) => {
  try {
    const appointmentId = parseInt(req.params.id);
    const appointment = appointments.find(a => a.id === appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Update appointment fields
    Object.assign(appointment, req.body);
    appointment.updatedAt = new Date();

    console.log('✅ PUT /appointments/:id - updated appointment', appointmentId);
    res.json(appointment);
  } catch (error) {
    console.error('❌ Error updating appointment:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// ========== DELETE APPOINTMENT ==========
router.delete('/:id', (req, res) => {
  try {
    const appointmentId = parseInt(req.params.id);
    const index = appointments.findIndex(a => a.id === appointmentId);

    if (index === -1) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const deletedAppointment = appointments.splice(index, 1);

    console.log('✅ DELETE /appointments/:id - deleted appointment', appointmentId);
    res.json({ 
      message: 'Appointment deleted successfully',
      appointment: deletedAppointment[0]
    });
  } catch (error) {
    console.error('❌ Error deleting appointment:', error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;