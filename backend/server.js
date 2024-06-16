const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/authRoutes');
const symptomRoutes = require('./routes/symptomRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const profileRoutes = require('./routes/profileRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const PORT = process.env.PORT || 5000;
require('dotenv').config();
const { wss } = require('./websocket');
const http = require('http');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/symptom', symptomRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/notification', notificationRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI ?? 'mongodb://localhost/mydatabase')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

const server = http.createServer((req, res) => {
  app(req, res);
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = server;