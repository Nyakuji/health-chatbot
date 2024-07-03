const express = require('express')
const { verifyToken } = require('../middleware/authMiddleware')
const {
  updateProfile,
  uploadProfilePicture,
} = require('../controllers/profileController')

const router = express.Router()

router.post('/uploadProfilePicture', verifyToken, uploadProfilePicture)
router.post('/update', verifyToken, updateProfile)

module.exports = router
