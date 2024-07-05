const { getActivityLogs } = require('../controllers/activityLogController')
const { verifyToken, isAdmin } = require('../middleware/authMiddleware')

const activityLogRoutes = (app) => {
  app.get('/api/activityLogs', verifyToken, isAdmin, getActivityLogs)
}

module.exports = activityLogRoutes
