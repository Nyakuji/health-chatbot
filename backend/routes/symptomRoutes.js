const { checkSymptoms } = require('../controllers/symptomController')
const { verifyToken } = require('../middleware/authMiddleware')

const symptomRoutes = (app) => {
  app.post('/api/symptoms/check', verifyToken, checkSymptoms)
}

module.exports = symptomRoutes
