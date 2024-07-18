const { getActivityLogs } = require('../controllers/activityLogController')
const { isAdmin } = require('../middleware/authMiddleware')

const activityLogRoutes = (app) => {
  app.get('/api/activityLogs', isAdmin, getActivityLogs)
}

module.exports = activityLogRoutes
