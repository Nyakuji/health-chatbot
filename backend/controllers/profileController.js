const User = require('../models/userModel')
const Appointment = require('../models/appointmentModel')
const multer = require('multer')

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage })

exports.uploadProfilePicture = [
  upload.single('profilePicture'),
  async (req, res) => {
    try {
      const user = await User.findById(req.userId)
      if (!user) {
        return res.status(404).send('User not found')
      }

      user.profilePicture = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
      await user.save()

      res.send(user)
    } catch (error) {
      res.status(400).send(error.message)
    }
  },
]

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
    res.status(500).json({ message: 'Internal server error', error })
  }
}

exports.getAppointmentHistory = async (req, res) => {
  const { userId } = req.query

  try {
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    let appointments
    if (user.role === 'doctor') {
      appointments = await Appointment.find({ doctorId: userId })
        .populate('doctorId')
        .populate('patientId')
    } else {
      appointments = await Appointment.find({ patientId: userId })
        .populate('doctorId')
        .populate('patientId')
    }

    res.status(200).json({ appointments })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}
