import React, { useState } from 'react'
import { TextField, Button, Grid, Typography } from '@mui/material'
import appointmentService from '../../../services/Appointments/appointmentService'
import './BookAppointment.module.css'

const BookAppointment = () => {
  const [form, setForm] = useState({
    doctorId: '',
    patientName: '',
    date: '',
    time: '',
    symptoms: '',
    contactInfo: '',
    notificationType: 'email',
  })
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await appointmentService.bookAppointment(form)
      setMessage(result.message)
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error booking appointment')
    }
  }

  return (
    <div className="book-appointment">
      <Typography variant="h4">Book an Appointment</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Doctor ID"
              name="doctorId"
              value={form.doctorId}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Patient Name"
              name="patientName"
              value={form.patientName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Contact Info"
              name="contactInfo"
              value={form.contactInfo}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Notification Type"
              name="notificationType"
              value={form.notificationType}
              onChange={handleChange}
              required
              select
              SelectProps={{
                native: true,
              }}
            >
              <option value="email">Email</option>
              <option value="sms">SMS</option>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Time"
              name="time"
              type="time"
              value={form.time}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Symptoms"
              name="symptoms"
              value={form.symptoms}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="book-button"
        >
          Book Appointment
        </Button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  )
}

export default BookAppointment
