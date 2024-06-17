const mongoose = require('mongoose')

const activityLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  activity: { type: String, required: true },
  date: { type: Date, default: Date.now },
})

module.exports = mongoose.model('ActivityLog', activityLogSchema)
