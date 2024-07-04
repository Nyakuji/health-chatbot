const express = require('express');
const {
  createFeedback,
  getFeedbackForDoctor,
} = require('../controllers/feedbackController');
const { verifyToken, isPatient } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', verifyToken, isPatient, createFeedback);
router.get('/:doctorId', verifyToken, getFeedbackForDoctor);

module.exports = router;
