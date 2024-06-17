const { queryNLPService } = require('../services/nlpService')

exports.checkSymptoms = async (req, res) => {
  const { symptoms } = req.body
  try {
    const response = await queryNLPService(symptoms)
    res.status(200).json({ message: response })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
