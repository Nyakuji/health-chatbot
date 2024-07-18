import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { updateAvailability } from '../../services/api'
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Box,
} from '@mui/material'

const UpdateAvailability = () => {
  const { userData } = useAuth()
  const doctorId = userData?.id
  
  const [date, setDate] = useState('')
  const [slots, setSlots] = useState([''])

  const handleSlotChange = (index, value) => {
    const newSlots = [...slots]
    newSlots[index] = value
    setSlots(newSlots)
  }

  const addSlot = () => {
    setSlots([...slots, ''])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = { doctorId, date, slots }
    updateAvailability(data)
      .then((response) => {
        console.log(response.data) // eslint-disable-line no-console
        alert('Availability updated successfully')
      })
      .catch((error) => {
        console.error(error) // eslint-disable-line no-console
        alert('Failed to update availability')
      })
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Update Availability
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type="date"
            label="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
          <Grid container spacing={2}>
            {slots.map((slot, index) => (
              <Grid item xs={12} key={index}>
                <TextField
                  label={`Slot ${index + 1}`}
                  value={slot}
                  onChange={(e) => handleSlotChange(index, e.target.value)}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
            ))}
          </Grid>
          <Box mt={2} display="flex" justifyContent="center">
            <Button
              onClick={addSlot}
              variant="contained"
              color="secondary"
              sx={{ mr: 2 }}
            >
              Add Slot
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Update Availability
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

export default UpdateAvailability
