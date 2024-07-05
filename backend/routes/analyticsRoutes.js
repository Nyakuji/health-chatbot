const { getAnalyticsData } = require('../controllers/analyticsController')
const { verifyToken, isAdmin } = require('../middleware/authMiddleware')

const analyticsRoutes = (app) => {
  app.get('/api/analytics/data', verifyToken, isAdmin, getAnalyticsData)
}

module.exports = analyticsRoutes
