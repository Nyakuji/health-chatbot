const { verifyToken } = require('../middleware/authMiddleware')
const {
  updateProfile,
  uploadProfilePicture,
} = require('../controllers/profileController')

const profileRoutes = (app) => {
  app.post('/api/uploadProfilePicture', verifyToken, uploadProfilePicture)
  app.post('/api/update', verifyToken, updateProfile)
}

module.exports = profileRoutes
