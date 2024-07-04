const express = require('express');
const { checkSymptoms } = require('../controllers/symptomController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/check', verifyToken, checkSymptoms);

module.exports = router;
