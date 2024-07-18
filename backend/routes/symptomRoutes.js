const { checkSymptoms } = require('../controllers/symptomController')

const symptomRoutes = (app) => {
  app.post('/api/symptoms/check', checkSymptoms)
}

module.exports = symptomRoutes
