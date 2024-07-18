const {
  bookAppointment,
  getDoctorAvailability,
  cancelAppointment,
  getAppointmentHistory,
} = require('../controllers/appointmentController')

const appointmentRoutes = (app) => {
  app.post('/api/book', bookAppointment)
  app.get('/api/availability', getDoctorAvailability)
  app.post('/api/cancel', cancelAppointment)
  app.get('/api/history', getAppointmentHistory)
}

module.exports = appointmentRoutes
