const {
  createFeedback,
  getFeedbackForDoctor,
} = require('../controllers/feedbackController')

const feedbackRoutes = (app) => {
  app.post('/api/feedback', createFeedback)
  app.get('/api/feedback/:doctorId', getFeedbackForDoctor)
}

module.exports = feedbackRoutes
