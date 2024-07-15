import React, { useState } from 'react'
import { getAppointmentHistory } from '../../services/api'
import {
  Container,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
} from '@mui/material'

const AppointmentHistory = () => {
  const [userId, setUserId] = useState('')
  const [appointments, setAppointments] = useState([
    {
      _id: '',
      doctorId: { name: '' },
      patientId: { name: '' },
      date: '',
      symptoms: '',
    },
  ])

  const handleFetchHistory = () => {
    getAppointmentHistory(userId)
      .then((response) => {
        setAppointments(response.data.appointments)
      })
      .catch((error) => {
        console.error(error) // eslint-disable-line no-console
        alert('Failed to fetch appointment history')
      })
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Appointment History
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleFetchHistory()
          }}
        >
          <TextField
            label="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Box mt={2} display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Fetch History
            </Button>
          </Box>
        </form>
        {appointments.length > 0 && (
          <List sx={{ mt: 4 }}>
            {appointments.map((appointment) => (
              <ListItem key={appointment._id} sx={{ mb: 2 }}>
                <ListItemText
                  primary={`Doctor: ${appointment.doctorId.name} - Patient: ${appointment.patientId.name}`}
                  secondary={`Date: ${new Date(appointment.date).toLocaleString()} - Symptoms: ${appointment.symptoms}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  )
}

export default AppointmentHistory
