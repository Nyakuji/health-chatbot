const express = require('express');
const { getAllUsers, getAllDoctors, getAllAppointments, updateUser, deleteUser, updateAppointment, deleteAppointment } = require('../controllers/adminController');
const router = express.Router();

router.get('/users', getAllUsers);
router.get('/doctors', getAllDoctors);
router.get('/appointments', getAllAppointments);
router.put('/user', updateUser);
router.delete('/user/:userId', deleteUser);
router.put('/appointment', updateAppointment);
router.delete('/appointment/:appointmentId', deleteAppointment);

module.exports = router;
