import React, { useState, useEffect } from 'react';
import appointmentService from '../services/appointmentService';

const BookAppointment = () => {
  const [doctorId, setDoctorId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [availability, setAvailability] = useState([{ available: false, time: '' }]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (doctorId && date) {
      appointmentService.getDoctorAvailability(doctorId, date)
        .then(data => setAvailability(data.availability.slots))
        .catch(err => setMessage(err.message));
    }
  }, [doctorId, date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const appointmentData = { doctorId, patientName, date, time, symptoms };
      const result = await appointmentService.bookAppointment(appointmentData);
      setMessage(result.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Doctor ID</label>
          <input type="text" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required />
        </div>
        <div>
          <label>Patient Name</label>
          <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />
        </div>
        <div>
          <label>Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          <label>Time</label>
          <select value={time} onChange={(e) => setTime(e.target.value)} required>
            {availability.map((slot, index) => (
              slot.available && <option key={index} value={slot.time}>{slot.time}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Symptoms</label>
          <textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} required></textarea>
        </div>
        <button type="submit">Book Appointment</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookAppointment;
