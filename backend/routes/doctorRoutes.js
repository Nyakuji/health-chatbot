const {
  searchDoctors,
  updateAvailability,
} = require('../controllers/doctorController')

const doctorRoutes = (app) => {
  app.get('/api/doctors/search', searchDoctors)
  app.post('/api/doctors/update-availability', updateAvailability)
}

module.exports = doctorRoutes
