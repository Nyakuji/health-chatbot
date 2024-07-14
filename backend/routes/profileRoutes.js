const { verifyToken } = require('../middleware/authMiddleware')
const {
  getProfile,
  updateProfile,
  uploadProfilePicture,
} = require('../controllers/profileController')

const profileRoutes = (app) => {
  app.get('/api/profile/:userId', verifyToken, getProfile)
  app.post('/api/profile/uploadProfilePicture', verifyToken, uploadProfilePicture)
  app.post('/api/profile/update', verifyToken, updateProfile)
}

module.exports = profileRoutes
