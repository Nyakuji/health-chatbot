const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/authRoutes');
const symptomRoutes = require('./routes/symptomRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const PORT = process.env.PORT || 5000;
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/symptom', symptomRoutes);
app.use('/api/appointment', appointmentRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI ?? 'mongodb://localhost/mydatabase')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
