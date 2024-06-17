const User = require('../models/userModel')
const Appointment = require('../models/appointmentModel')
const Feedback = require('../models/feedbackModel')

exports.getAnalyticsData = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()
    const totalAppointments = await Appointment.countDocuments()
    const totalFeedbacks = await Feedback.countDocuments()

    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } },
    ])

    const appointmentsByStatus = await Appointment.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ])

    res.status(200).json({
      totalUsers,
      totalAppointments,
      totalFeedbacks,
      usersByRole,
      appointmentsByStatus,
    })
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving analytics data', error })
  }
}
