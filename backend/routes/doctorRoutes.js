const express = require('express');
const { updateAvailability, searchDoctors } = require('../controllers/doctorController');
const router = express.Router();

router.post('/update-availability', updateAvailability);
router.get('/search', searchDoctors);

module.exports = router;
