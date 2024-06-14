const express = require('express');
const { checkSymptoms } = require('../controllers/symptomController');
const router = express.Router();

router.post('/check', checkSymptoms);

module.exports = router;
