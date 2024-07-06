import React, { useState } from 'react'
import { TextField, Button, Typography } from '@mui/material'
import appointmentService from '../../../services/Appointments/appointmentService'
import './CancelAppointment.module.css'

const CancelAppointment = () => {
  const [appointmentId, setAppointmentId] = useState('')
  const [contactInfo, setContactInfo] = useState('')
  const [notificationType, setNotificationType] = useState('email')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await appointmentService.cancelAppointment(
        appointmentId,
        contactInfo,
        notificationType
      )
      setMessage(result.message)
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Error cancelling appointment'
      )
    }
  }

  return (
    <div className="cancel-appointment">
      <Typography variant="h4">Cancel an Appointment</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Appointment ID"
          value={appointmentId}
          onChange={(e) => setAppointmentId(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Contact Info"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Notification Type"
          value={notificationType}
          onChange={(e) => setNotificationType(e.target.value)}
          required
          select
          SelectProps={{
            native: true,
          }}
        >
          <option value="email">Email</option>
          <option value="sms">SMS</option>
        </TextField>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="cancel-button"
        >
          Cancel Appointment
        </Button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  )
}

export default CancelAppointment
