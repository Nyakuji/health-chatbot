const Feedback = require('../models/feedbackModel')

exports.createFeedback = async (req, res) => {
  const { doctorId, patientId, rating, comment } = req.body

  try {
    const feedback = new Feedback({ doctorId, patientId, rating, comment })
    await feedback.save()
    res
      .status(201)
      .json({ message: 'Feedback submitted successfully', feedback })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}

exports.getFeedbackForDoctor = async (req, res) => {
  const { doctorId } = req.params

  try {
    const feedbacks = await Feedback.find({ doctorId }).populate(
      'patientId',
      'username',
    )
    res.status(200).json(feedbacks)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}
