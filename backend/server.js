const path = require('path')
const process = require('process')
const express = require('express')
const mongoose = require('mongoose')
const http = require('http')
const cors = require('cors')
const { wss } = require('./websocket')
const routes = require('./routes')
const { initSocket } = require('./socket')

const PORT = process.env.PORT || 5000

require('dotenv').config()

const app = express()
const server = http.createServer((req, res) => {
  app(req, res)
})
initSocket(server)

// Middleware
app.use(cors())
app.use(express.json())

// Use the consolidated routes
app.use('/api', routes)

// Disable ESLint no-undef rule for the next line
// eslint-disable-next-line no-undef
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI ?? 'mongodb://localhost/mydatabase')
  .then(() => {
    console.info('Connected to MongoDB')
  })
  .catch((err) => {
    console.error('Database connection error:', err)
  })

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request)
  })
})

server.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`)
})

module.exports = server
