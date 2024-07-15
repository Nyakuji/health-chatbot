import React, { useState } from 'react'
import { getDoctorAvailability } from '../../services/api'
import {
  Container,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Paper,
} from '@mui/material'

const DoctorAvailability = () => {
  const [doctorId, setDoctorId] = useState('')
  const [date, setDate] = useState('')
  const [availability, setAvailability] = useState({ slots: [{}] })
  const [loading, setLoading] = useState(false)

  const handleCheckAvailability = () => {
    setLoading(true)
    getDoctorAvailability(doctorId, date)
      .then((response) => {
        setAvailability(response.data.availability)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
        alert('Failed to fetch availability')
      })
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Check Doctor Availability
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleCheckAvailability()
        }}
      >
        <TextField
          label="Doctor ID"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          type="date"
          label="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <Button type="submit" variant="contained" color="primary">
          {loading ? <CircularProgress size={24} /> : 'Check Availability'}
        </Button>
      </form>
      {availability && (
        <Paper style={{ marginTop: '20px', padding: '10px' }}>
          <Typography variant="h6" gutterBottom>
            Available Slots
          </Typography>
          <List>
            {availability.slots.map((slot) => (
              <ListItem key={slot.time}>
                <ListItemText
                  primary={`Time: ${slot.time} - ${slot.available ? 'Available' : 'Booked'}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  )
}

export default DoctorAvailability
