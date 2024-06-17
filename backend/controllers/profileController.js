const User = require('../models/userModel')
const Appointment = require('../models/appointmentModel')

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
