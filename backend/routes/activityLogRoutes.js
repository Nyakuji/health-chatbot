const express = require('express')
const { getActivityLogs } = require('../controllers/activityLogController')
const { verifyToken, isAdmin } = require('../middleware/authMiddleware')
const router = express.Router()

router.use(verifyToken)
router.use(isAdmin)

router.get('/', getActivityLogs)

module.exports = router
