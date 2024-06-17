const ActivityLog = require('../models/activityLogModel')

exports.logActivity = (activity) => {
  return async (req, res, next) => {
    try {
      const log = new ActivityLog({
        userId: req.userId,
        activity,
      })
      await log.save()
    } catch (error) {
      console.error('Error logging activity:', error)
    }
    next()
  }
}
