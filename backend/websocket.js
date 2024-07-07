const { WebSocketServer } = require('ws')
const ChatMessage = require('./models/chatModel') // Assuming you have a ChatMessage model

const wss = new WebSocketServer({ noServer: true })

const clients = new Map()

wss.on('connection', (ws, req) => {
  const userId = req.url.split('?userId=')[1]
  clients.set(userId, ws)

  ws.on('message', async (message) => {
    console.log(`Received message => ${message}`)
    const parsedMessage = JSON.parse(message)

    // Save the message to the database
    try {
      const newMessage = new ChatMessage({
        sender: parsedMessage.sender,
        receiver: parsedMessage.receiver,
        message: parsedMessage.message,
        timestamp: new Date(parsedMessage.timestamp),
      })

      await newMessage.save()

      // Broadcast the message to the receiver if they are connected
      const receiverSocket = clients.get(parsedMessage.receiver)
      if (receiverSocket && receiverSocket.readyState === WebSocket.OPEN) {
        receiverSocket.send(JSON.stringify(newMessage))
      }
    } catch (error) {
      console.error('Error saving message:', error)
    }
  })

  ws.on('close', () => {
    clients.delete(userId)
  })
})

const broadcastAvailabilityUpdate = (update) => {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(update))
    }
  })
}

module.exports = { wss, broadcastAvailabilityUpdate }
