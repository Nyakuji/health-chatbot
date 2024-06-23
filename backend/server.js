const path = require('path')
const process = require('process')
const express = require('express')
const mongoose = require('mongoose')
const http = require('http')
const cors = require('cors')
const { wss } = require('./websocket')
const authRoutes = require('./routes/authRoutes')
const symptomRoutes = require('./routes/symptomRoutes')
const appointmentRoutes = require('./routes/appointmentRoutes')
const profileRoutes = require('./routes/profileRoutes')
const doctorRoutes = require('./routes/doctorRoutes')
const feedbackRoutes = require('./routes/feedbackRoutes')
const adminRoutes = require('./routes/adminRoutes')
const notificationRoutes = require('./routes/notificationRoutes')
const activityLogRoutes = require('./routes/activityLogRoutes')
const chatRoutes = require('./routes/chatRoutes')
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

// Disable ESLint no-undef rule for the next line
// eslint-disable-next-line no-undef
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Define Routes
app.use('/api/auth', authRoutes)
app.use('/api/symptom', symptomRoutes)
app.use('/api/appointment', appointmentRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/doctor', doctorRoutes)
app.use('/api/feedback', feedbackRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/notification', notificationRoutes)
app.use('/api/activity-log', activityLogRoutes)
app.use('/api/chat', chatRoutes)

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
