const express = require('express')
const {
  bookAppointment,
  getDoctorAvailability,
  cancelAppointment,
  getAppointmentHistory
} = require('../controllers/appointmentController')
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router()

router.use(authMiddleware)

router.get('/availability', getDoctorAvailability)
router.post('/book', bookAppointment)
router.post('/cancel', cancelAppointment)
router.get('/history', getAppointmentHistory);

module.exports = router
