const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middleware/authMiddleware')
const { sendMessage, getMessages } = require('../controllers/chatController')

router.post('/send', verifyToken, sendMessage)
router.get('/messages/:userId1/:userId2', verifyToken, getMessages)

module.exports = router
