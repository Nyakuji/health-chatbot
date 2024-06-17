const express = require('express')
const { sendReminder } = require('../controllers/notificationController')
const router = express.Router()

// Route to send appointment reminder
router.post('/send-reminder', sendReminder)

module.exports = router
