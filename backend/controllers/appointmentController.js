const Doctor = require('../models/doctorModel');
const Appointment = require('../models/appointmentModel');
const { sendNotification } = require('../services/notificationService');

exports.bookAppointment = async (req, res) => {
  const { doctorId, patientName, date, time, symptoms, contactInfo, notificationType } = req.body;

  try {
    const doctor = await Doctor.findById(doctorId);
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    // Add null check for doctor
    if (!doctor.name) {
      return res.status(404).json({ message: 'Doctor name not found' });
    }

    const availability = doctor.availability.find(a => a.date.toISOString().split('T')[0] === date);
    if (!availability) {
      return res.status(404).json({ message: 'No availability on this date' });
    }

    const slot = availability.slots.find(s => s.time === time && s.available);
    if (!slot) {
      return res.status(404).json({ message: 'Time slot not available' });
    }

    // Mark the slot as booked
    slot.available = false;
    await doctor.save();

    const appointment = new Appointment({
      doctorId,
      patientName,
      date,
      time,
      symptoms,
    });

    await appointment.save();

    // Send confirmation notification to patient
    sendNotification(notificationType, contactInfo, 'Appointment Confirmation', `Your appointment with Dr. ${doctor.name} on ${date} at ${time} has been confirmed.`);

    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

exports.getDoctorAvailability = async (req, res) => {
  const { doctorId, date } = req.query;

  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const availability = doctor.availability.find(a => a.date.toISOString().split('T')[0] === date);
    if (!availability) {
      return res.status(404).json({ message: 'No availability on this date' });
    }

    res.status(200).json({ availability });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

exports.cancelAppointment = async (req, res) => {
  const { appointmentId, contactInfo, notificationType } = req.body;

  try {
    const appointment = await Appointment.findByIdAndDelete(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const doctor = await Doctor.findById(appointment.doctorId);
    if (doctor) {
      const availability = doctor.availability.find(a => a.date.toISOString().split('T')[0] === appointment.date.toISOString().split('T')[0]);
      if (availability) {
        const slot = availability.slots.find(s => s.time === appointment.time);
        if (slot) {
          slot.available = true;
          await doctor.save();
        }
      }
    }

    // Send cancellation notification to patient
    sendNotification(notificationType, contactInfo, 'Appointment Cancellation', `Your appointment with Dr. ${doctor.name} on ${appointment.date} at ${appointment.time} has been cancelled.`);

    res.status(200).json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};
