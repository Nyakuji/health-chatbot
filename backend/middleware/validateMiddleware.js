exports.validateAppointmentId = (req, res, next) => {
  const { appointmentId } = req.body
  if (!appointmentId || typeof appointmentId !== 'string') {
    return res.status(400).json({ message: 'Invalid appointment ID' })
  }
  next()
}

exports.validateUserId = (req, res, next) => {
  const { userId } = req.query
  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ message: 'Invalid user ID' })
  }
  next()
}
