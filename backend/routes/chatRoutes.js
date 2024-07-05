const { verifyToken } = require('../middleware/authMiddleware')
const { sendMessage, getMessages } = require('../controllers/chatController')

const chatRoutes = (app) => {
  app.post('/api/chat/send', verifyToken, sendMessage)
  app.get('/api/chat/messages/:userId1/:userId2', verifyToken, getMessages)
}

module.exports = chatRoutes
