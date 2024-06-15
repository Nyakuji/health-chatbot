const express = require('express');
const { updateAvailability } = require('../controllers/doctorController');
const router = express.Router();

router.post('/update-availability', updateAvailability);

module.exports = router;
