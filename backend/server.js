const process = require('process')
const http = require('http')
const { wss } = require('./websocket')
const { initSocket } = require('./socket')
const app = require('./app')
require('dotenv').config();


const PORT = process.env.PORT || 5000

const server = http.createServer((req, res) => {
  app(req, res);
});
initSocket(server)

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request)
  })
})

server.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`)
})

module.exports = server
