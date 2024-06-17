const express = require('express')
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
const router = express.Router()

router.use(verifyToken)
router.use(isAdmin)

router.get('/users', logActivity('Viewed all users'), getAllUsers)
router.get('/doctors', logActivity('Viewed all doctors'), getAllDoctors)
router.get(
  '/appointments',
  logActivity('Viewed all appointments'),
  getAllAppointments,
)
router.put('/user', logActivity('Updated a user'), updateUser)
router.delete('/user/:userId', logActivity('Deleted a user'), deleteUser)
router.put(
  '/appointment',
  logActivity('Updated an appointment'),
  updateAppointment,
)
router.delete(
  '/appointment/:appointmentId',
  logActivity('Deleted an appointment'),
  deleteAppointment,
)

module.exports = router
