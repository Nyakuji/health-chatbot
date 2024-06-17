const ActivityLog = require('../models/activityLogModel')

exports.getActivityLogs = async () => {
  try {
    const logs = await ActivityLog.find()
      .populate('userId', 'username email')
      .sort({ date: -1 })
    return logs
  } catch (error) {
    console.error('Error retrieving activity logs:', error)
    throw error
  }
}
