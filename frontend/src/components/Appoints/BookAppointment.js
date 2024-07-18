import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { bookAppointment } from '../../services/api'
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  Box,
} from '@mui/material'

const BookAppointment = () => {
  const { userData } = useAuth() // Get userData from AuthContext
  const [formData, setFormData] = useState({
    doctorId: '',
    date: '',
    time: '',
    symptoms: '',
    contactInfo: '',
    notificationType: 'email',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = { ...formData, userData } // Add patientId to formData with null check
    bookAppointment(data)
      .then((response) => {
        console.log(response.data) // eslint-disable-line no-console
        alert('Appointment booked successfully')
      })
      .catch((error) => {
        console.error(error) // eslint-disable-line no-console
        alert('Failed to book appointment')
      })
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Book Appointment
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Doctor ID"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            type="date"
            label="Date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
          <TextField
            type="time"
            label="Time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
          <TextField
            label="Symptoms"
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Contact Info"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Notification Type</InputLabel>
            <Select
              name="notificationType"
              value={formData.notificationType}
              onChange={handleChange}
              label="Notification Type"
            >
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="sms">SMS</MenuItem>
            </Select>
          </FormControl>
          <Box mt={2} display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Book Appointment
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

export default BookAppointment
