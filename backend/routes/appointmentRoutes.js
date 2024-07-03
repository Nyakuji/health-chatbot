const express = require('express')
const {
  bookAppointment,
  getDoctorAvailability,
  cancelAppointment,
  getAppointmentHistory,
} = require('../controllers/appointmentController')
const router = express.Router()

router.get('/availability', getDoctorAvailability)
router.post('/book', bookAppointment)
router.post('/cancel', cancelAppointment)
router.get('/history', getAppointmentHistory)

module.exports = router
