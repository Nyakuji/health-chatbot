const express = require('express')
const {
  searchDoctors,
  updateAvailability,
} = require('../controllers/doctorController')
const router = express.Router()

router.get('/search', searchDoctors)
router.post('/update-availability', updateAvailability)

module.exports = router
