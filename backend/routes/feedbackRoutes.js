const {
  createFeedback,
  getFeedbackForDoctor,
} = require('../controllers/feedbackController')
const { verifyToken, isPatient } = require('../middleware/authMiddleware')

const feedbackRoutes = (app) => {
  app.post('/api/feedback', verifyToken, isPatient, createFeedback)
  app.get('/api/feedback/:doctorId', verifyToken, getFeedbackForDoctor)
}

module.exports = feedbackRoutes
