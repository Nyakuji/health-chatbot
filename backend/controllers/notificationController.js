const Appointment = require('../models/appointmentModel')
const { sendNotification } = require('../services/notificationService')

exports.sendReminder = async (req, res) => {
  const { appointmentId, contactInfo, notificationType } = req.body

  try {
    const appointment =
      await Appointment.findById(appointmentId).populate('doctorId')

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' })
    }

    const doctor = appointment.doctorId

    const reminderMessage = `Reminder: Your appointment with Dr. ${doctor} is scheduled for ${appointment.date} at ${appointment.time}.`

    // Send reminder notification
    sendNotification(
      notificationType,
      contactInfo,
      'Appointment Reminder',
      reminderMessage,
    )

    res.status(200).json({ message: 'Reminder sent successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}
