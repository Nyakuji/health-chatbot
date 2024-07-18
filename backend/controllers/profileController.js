const User = require('../models/userModel')
const multer = require('multer')
const path = require('path')

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/')) //eslint-disable-line
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage })

// Middleware to handle file upload and profile picture update
exports.uploadProfilePicture = [
  upload.single('profilePicture'),
  async (req, res) => {
    const { userId } = req.params
    try {
      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      if (!req.file) {
        return res
          .status(400)
          .json({ message: 'Profile picture file is required' })
      }

      user.profilePicture = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
      await user.save()

      res
        .status(200)
        .json({ message: 'Profile picture updated successfully', user })
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Internal server error', error: error.message })
    }
  },
]

// Controller to update user profile
exports.updateProfile = async (req, res) => {
  const { userId, username, email, phoneNumber, medicalId } = req.body

  try {
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.username = username || user.username
    user.email = email || user.email
    user.phoneNumber = phoneNumber || user.phoneNumber
    user.medicalId = medicalId || user.medicalId

    await user.save()

    res.status(200).json({ message: 'Profile updated successfully', user })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  }
}

// Controller to get user profile by ID
exports.getProfile = async (req, res) => {
  const { userId } = req.params

  try {
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({ user })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  }
}
