const {
  getAllUsers,
  getAllDoctors,
  getAllAppointments,
  updateUser,
  deleteUser,
  updateAppointment,
  deleteAppointment,
} = require('../controllers/adminController')
const { verifyToken, isAdmin } = require('../middleware/authMiddleware')
const { logActivity } = require('../middleware/activityLogMiddleware')

const adminRoutes = (app) => {
  app.get('/api/users', verifyToken, isAdmin, logActivity, getAllUsers)
  app.get('/api/doctors', verifyToken, isAdmin, logActivity, getAllDoctors)
  app.get(
    '/api/appointments',
    verifyToken,
    isAdmin,
    logActivity,
    getAllAppointments,
  )
  app.put('/api/user', verifyToken, isAdmin, logActivity, updateUser)
  app.delete('/api/user/:userId', verifyToken, logActivity, isAdmin, deleteUser)
  app.put(
    '/api/appointment',
    verifyToken,
    isAdmin,
    logActivity,
    updateAppointment,
  )
  app.delete(
    '/api/appointment/:appointmentId',
    verifyToken,
    isAdmin,
    logActivity,
    deleteAppointment,
  )
}

module.exports = adminRoutes
