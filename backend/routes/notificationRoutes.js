const { sendReminder } = require('../controllers/notificationController')

const notificationRoutes = (app) => {
  app.post('/api/notifications/send-reminder', sendReminder)
}

module.exports = notificationRoutes
