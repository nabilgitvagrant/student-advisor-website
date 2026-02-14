const express = require('express');
const router = express.Router();

// Mock appointments data (temporary storage)
let appointments = [];

// Get all appointments
router.get('/', (req, res) => {
  try {
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create appointment
router.post('/', (req, res) => {
  try {
    const { fullName, email, phone, date, time, topic } = req.body;

    // Validation
    if (!fullName || !email || !phone || !date || !time || !topic) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create new appointment
    const newAppointment = {
      id: appointments.length + 1,
      fullName,
      email,
      phone,
      date,
      time,
      topic,
      status: 'Confirmed',
      createdAt: new Date()
    };

    appointments.push(newAppointment);

    console.log('✅ Appointment created:', newAppointment);

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment: newAppointment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single appointment
router.get('/:id', (req, res) => {
  try {
    const appointment = appointments.find(a => a.id === parseInt(req.params.id));
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update appointment
router.put('/:id', (req, res) => {
  try {
    const appointment = appointments.find(a => a.id === parseInt(req.params.id));
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    Object.assign(appointment, req.body);
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete appointment
router.delete('/:id', (req, res) => {
  try {
    const index = appointments.findIndex(a => a.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const deletedAppointment = appointments.splice(index, 1);
    res.json({ message: 'Appointment deleted', appointment: deletedAppointment[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;