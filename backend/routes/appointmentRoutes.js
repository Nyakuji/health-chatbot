const express = require('express');
const { bookAppointment, getDoctorAvailability } = require('../controllers/appointmentController');
const router = express.Router();

router.post('/book', bookAppointment);
router.get('/availability', getDoctorAvailability);

module.exports = router;
