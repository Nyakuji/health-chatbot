const process = require('process')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const authRoutes = require('./routes/authRoutes')
const symptomRoutes = require('./routes/symptomRoutes')
const appointmentRoutes = require('./routes/appointmentRoutes')
const profileRoutes = require('./routes/profileRoutes')
const doctorRoutes = require('./routes/doctorRoutes')
const feedbackRoutes = require('./routes/feedbackRoutes')
const adminRoutes = require('./routes/adminRoutes')
const notificationRoutes = require('./routes/notificationRoutes')
const activityLogRoutes = require('./routes/activityLogRoutes')
const PORT = process.env.PORT || 5000
require('dotenv').config()
const { wss } = require('./websocket')
const http = require('http')

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/symptom', symptomRoutes)
app.use('/api/appointment', appointmentRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/doctor', doctorRoutes)
app.use('/api/feedback', feedbackRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/notification', notificationRoutes)
app.use('/api/activity-log', activityLogRoutes)

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI ?? 'mongodb://localhost/mydatabase')
  .then(() => {
    console.info('Connected to MongoDB')
  })
  .catch((err) => {
    console.error('Database connection error:', err)
  })

const server = http.createServer((req, res) => {
  app(req, res)
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
