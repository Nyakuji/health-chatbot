const {
  getAllUsers,
  getAllDoctors,
  getAllAppointments,
  updateUser,
  deleteUser,
  updateAppointment,
  deleteAppointment,
} = require('../controllers/adminController')
const { isAdmin } = require('../middleware/authMiddleware')
const { logActivity } = require('../middleware/activityLogMiddleware')

const adminRoutes = (app) => {
  app.get('/api/users', isAdmin, logActivity, getAllUsers)
  app.get('/api/doctors', isAdmin, logActivity, getAllDoctors)
  app.get('/api/appointments', isAdmin, logActivity, getAllAppointments)
  app.put('/api/user', isAdmin, logActivity, updateUser)
  app.delete('/api/user/:userId', logActivity, isAdmin, deleteUser)
  app.put('/api/appointment', isAdmin, logActivity, updateAppointment)
  app.delete(
    '/api/appointment/:appointmentId',
    isAdmin,
    logActivity,
    deleteAppointment,
  )
}

module.exports = adminRoutes
