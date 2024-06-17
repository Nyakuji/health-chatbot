const express = require('express')
const { getAnalyticsData } = require('../controllers/analyticsController')
const { verifyToken, isAdmin } = require('../middleware/authMiddleware')
const router = express.Router()

router.use(verifyToken)
router.use(isAdmin)

router.get('/data', getAnalyticsData)

module.exports = router
