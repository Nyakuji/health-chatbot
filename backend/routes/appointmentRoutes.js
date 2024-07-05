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

const appointmentRoutes = (app) => {
  app.post('/api/book', verifyToken, isPatient, bookAppointment)
  app.get('/api/availability', isDoctor, getDoctorAvailability)
  app.post('/api/cancel', verifyToken, validateAppointmentId, cancelAppointment)
  app.get('/api/history', verifyToken, validateUserId, getAppointmentHistory)
}

module.exports = appointmentRoutes
