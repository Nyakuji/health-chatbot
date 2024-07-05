const { signup, login } = require('../controllers/authController')

const authRoutes = (app) => {
  app.post('/api/signup', signup)
  app.post('/api/login', login)
}

module.exports = authRoutes
