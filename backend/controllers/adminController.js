const User = require('../models/userModel')
const Appointment = require('../models/appointmentModel')

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' })
    res.status(200).json(doctors)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('doctorId')
      .populate('patientId')
    res.status(200).json(appointments)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}

exports.updateUser = async (req, res) => {
  const { userId, updates } = req.body
  try {
    const user = await User.findByIdAndUpdate(userId, updates, { new: true })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}

exports.deleteUser = async (req, res) => {
  const { userId } = req.params
  try {
    await User.findByIdAndDelete(userId)
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}

exports.updateAppointment = async (req, res) => {
  const { appointmentId, updates } = req.body
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      updates,
      { new: true },
    )
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' })
    }
    res.status(200).json(appointment)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}

exports.deleteAppointment = async (req, res) => {
  const { appointmentId } = req.params
  try {
    await Appointment.findByIdAndDelete(appointmentId)
    res.status(200).json({ message: 'Appointment deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}
