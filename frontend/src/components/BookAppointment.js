import React, { useState, useEffect } from 'react'
import appointmentService from '../services/appointmentService'
import notificationService from '../services/notificationService'

const BookAppointment = () => {
  const [doctorId, setDoctorId] = useState('')
  const [patientName, setPatientName] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [symptoms, setSymptoms] = useState('')
  const [contactInfo, setContactInfo] = useState('')
  const [notificationType, setNotificationType] = useState('email')
  const [availability, setAvailability] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (doctorId && date) {
      setLoading(true)
      appointmentService
        .getDoctorAvailability(doctorId, date)
        .then((data) => setAvailability(data.availability?.slots || []))
        .catch((err) => setMessage(err.message))
        .finally(() => setLoading(false))
    }
  }, [doctorId, date])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const appointmentData = {
        doctorId,
        patientName,
        date,
        time,
        symptoms,
        contactInfo,
        notificationType,
      }
      const result = await appointmentService.bookAppointment(appointmentData)
      setMessage(result.message)
      setDoctorId('')
      setPatientName('')
      setDate('')
      setTime('')
      setSymptoms('')
      setContactInfo('')
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error booking appointment')
    }
  }

  const handleCancel = async () => {
    try {
      const appointmentId = prompt('Enter Appointment ID to cancel:')
      if (appointmentId) {
        const result = await appointmentService.cancelAppointment(
          appointmentId,
          contactInfo,
          notificationType
        )
        setMessage(result.message)
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Error cancelling appointment'
      )
    }
  }

  const handleSendReminder = async () => {
    try {
      const appointmentId = prompt('Enter Appointment ID to send reminder:')
      if (appointmentId) {
        const result = await notificationService.sendReminder(
          appointmentId,
          contactInfo,
          notificationType
        )
        setMessage(result.message)
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error sending reminder')
    }
  }

  return (
    <div>
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Doctor ID</label>
          <input
            type="text"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Patient Name</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contact Info</label>
          <input
            type="text"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Notification Type</label>
          <select
            value={notificationType}
            onChange={(e) => setNotificationType(e.target.value)}
            required
          >
            <option value="email">Email</option>
            <option value="sms">SMS</option>
          </select>
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Time</label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          >
            {availability.map(
              (slot, index) =>
                slot.available && (
                  <option key={index} value={slot.time}>
                    {slot.time}
                  </option>
                )
            )}
          </select>
        </div>
        <div>
          <label>Symptoms</label>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" disabled={!doctorId || !date || loading}>
          {loading ? 'Loading...' : 'Book Appointment'}
        </button>
      </form>
      <button onClick={handleCancel} disabled={!contactInfo}>
        Cancel Appointment
      </button>
      <button onClick={handleSendReminder} disabled={!contactInfo}>
        Send Reminder
      </button>
      {message && <p>{message}</p>}
    </div>
  )
}

export default BookAppointment
