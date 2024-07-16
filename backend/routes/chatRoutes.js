const { sendMessage, getMessages } = require('../controllers/chatController')

const chatRoutes = (app) => {
  app.post('/api/chat/send', sendMessage)
  app.get('/api/chat/messages/:userId1/:userId2', getMessages)
}

module.exports = chatRoutes
