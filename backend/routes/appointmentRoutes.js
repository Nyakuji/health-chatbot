const express = require('express')
const {
  bookAppointment,
  getDoctorAvailability,
  cancelAppointment,
  getAppointmentHistory,
} = require('../controllers/appointmentController')
const {
  verifyToken,
  isDoctor,
  isPatient,
} = require('../middleware/authMiddleware')
const {
  validateAppointmentId,
  validateUserId,
} = require('../middleware/validateMiddleware')

const router = express.Router()

router.post('/book', verifyToken, isPatient, bookAppointment)
router.get('/availability', verifyToken, isDoctor, getDoctorAvailability)
router.post('/cancel', verifyToken, validateAppointmentId, cancelAppointment)
router.get('/history', verifyToken, validateUserId, getAppointmentHistory)

module.exports = router
