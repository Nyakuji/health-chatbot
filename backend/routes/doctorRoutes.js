const express = require('express')
const { searchDoctors } = require('../controllers/doctorController')
const { updateAvailability } = require('../controllers/appointmentController')
const router = express.Router()

router.get('/search', searchDoctors)
router.post('/availability', updateAvailability)

module.exports = router
