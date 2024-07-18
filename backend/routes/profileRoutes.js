const {
  getProfile,
  updateProfile,
  uploadProfilePicture,
} = require('../controllers/profileController')

const profileRoutes = (app) => {
  app.post('/api/profile/uploadProfilePicture/:userId', uploadProfilePicture)
  app.post('/api/profile/update', updateProfile)
  app.get('/api/profile/:userId', getProfile)
}

module.exports = profileRoutes
