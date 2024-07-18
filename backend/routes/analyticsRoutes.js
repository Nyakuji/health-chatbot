const { getAnalyticsData } = require('../controllers/analyticsController')
const { isAdmin } = require('../middleware/authMiddleware')

const analyticsRoutes = (app) => {
  app.get('/api/analytics/data', isAdmin, getAnalyticsData)
}

module.exports = analyticsRoutes
