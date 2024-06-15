const express = require('express');
const { updateProfile, getAppointmentHistory } = require('../controllers/profileController');
const router = express.Router();

router.post('/update', updateProfile);
router.get('/appointments', getAppointmentHistory);

module.exports = router;
