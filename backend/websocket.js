const { WebSocketServer } = require('ws')

const wss = new WebSocketServer({ noServer: true })

const clients = new Map()

wss.on('connection', (ws, req) => {
  const userId = req.url.split('?userId=')[1]
  clients.set(userId, ws)

  ws.on('message', (message) => {
    console.log(`Received message => ${message}`)
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
