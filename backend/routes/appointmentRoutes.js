const express = require('express');
const { bookAppointment, getDoctorAvailability, cancelAppointment } = require('../controllers/appointmentController');
const router = express.Router();

router.post('/book', bookAppointment);
router.get('/availability', getDoctorAvailability);
router.post('/cancel', cancelAppointment);

module.exports = router;
