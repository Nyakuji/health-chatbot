const process = require('process')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

require('dotenv').config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Static file serving
//eslint-disable-next-line
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
const routes = require('./routes')
app.use('/api', routes)

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI ?? 'mongodb://localhost/mydatabase')
  .then(() => {
    console.info('Connected to MongoDB')
  })
  .catch((err) => {
    console.error('Database connection error:', err)
  })

module.exports = app
