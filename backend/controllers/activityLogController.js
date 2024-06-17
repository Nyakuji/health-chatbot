const ActivityLog = require('../models/activityLogModel')

exports.getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .populate('userId', 'username email')
      .sort({ date: -1 })
    res.status(200).json(logs)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}
