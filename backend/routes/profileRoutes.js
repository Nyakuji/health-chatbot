const { verifyToken } = require('../middleware/authMiddleware')
const {
  getProfile,
  updateProfile,
  uploadProfilePicture,
} = require('../controllers/profileController')

const profileRoutes = (app) => {
  app.get('/api/:userId', verifyToken, getProfile)
  app.post('/api/uploadProfilePicture', verifyToken, uploadProfilePicture)
  app.post('/api/update', verifyToken, updateProfile)
}

module.exports = profileRoutes
