import React, { useState } from 'react'
import { cancelAppointment } from '../../services/api'
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'

const CancelAppointment = () => {
  const [formData, setFormData] = useState({
    appointmentId: '',
    contactInfo: '',
    notificationType: 'email',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    cancelAppointment(formData)
      .then((response) => {
        console.log(response.data) // eslint-disable-line no-console
        alert('Appointment cancelled successfully')
      })
      .catch((error) => {
        console.error(error) // eslint-disable-line no-console
        alert('Failed to cancel appointment')
      })
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Cancel Appointment
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Appointment ID"
            name="appointmentId"
            value={formData.appointmentId}
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
              Cancel Appointment
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

export default CancelAppointment
