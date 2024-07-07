import React, { useState, useEffect } from 'react'
import { TextField, Button, Grid, Typography } from '@mui/material'
import appointmentService from '../../../services/Appointments/appointmentService'
import websocketService from '../../../services/websocketService'
import './DoctorAvailability.module.css'

const DoctorAvailability = () => {
  const [doctorId, setDoctorId] = useState('')
  const [date, setDate] = useState('')
  const [availability, setAvailability] = useState([{ time: '' }])
  const [message, setMessage] = useState('')

  useEffect(() => {
    websocketService.connect('doctorAvailabilityUser') // Replace with actual user ID or role if needed

    websocketService.socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'AVAILABILITY_UPDATE') {
        setAvailability(data.availability)
      }
    }

    return () => {
      websocketService.disconnect()
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await appointmentService.getDoctorAvailability(
        doctorId,
        date
      )
      setAvailability(result.availability || [])
      setMessage('')
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error fetching availability')
    }
  }

  return (
    <div className="doctor-availability">
      <Typography variant="h4">Check Doctor Availability</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Doctor ID"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="check-button"
        >
          Check Availability
        </Button>
      </form>
      {availability.length > 0 && (
        <div className="availability-list">
          <Typography variant="h6">Available Slots:</Typography>
          <ul>
            {availability.map((slot, index) => (
              <li key={index}>{slot.time}</li>
            ))}
          </ul>
        </div>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  )
}

export default DoctorAvailability
