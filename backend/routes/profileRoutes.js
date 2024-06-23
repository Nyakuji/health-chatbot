const express = require('express')
const { verifyToken } = require('../middleware/authMiddleware')
const { uploadProfilePicture } = require('../controllers/profileController')
const {
  updateProfile,
  getAppointmentHistory,
} = require('../controllers/profileController')
const router = express.Router()

router.post('/uploadProfilePicture', verifyToken, uploadProfilePicture)
router.post('/update', updateProfile)
router.get('/appointments', getAppointmentHistory)

module.exports = router
