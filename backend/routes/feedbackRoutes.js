const express = require('express');
const { createFeedback, getFeedbackForDoctor } = require('../controllers/feedbackController');
const router = express.Router();

router.post('/', createFeedback);
router.get('/:doctorId', getFeedbackForDoctor);

module.exports = router;
