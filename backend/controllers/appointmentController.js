const Doctor = require('../models/doctorModel');
const Appointment = require('../models/appointmentModel');

exports.bookAppointment = async (req, res) => {
  const { doctorId, patientName, date, time, symptoms } = req.body;
  
  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
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
