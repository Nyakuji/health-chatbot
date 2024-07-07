import React, { useState } from 'react'
import { TextField, Button, Typography, Grid } from '@mui/material'
import doctorService from '../../../services/Doctor/doctorService'
import './UpdateAvailability.module.css'

const UpdateAvailability = () => {
  const [doctorId, setDoctorId] = useState('')
  const [date, setDate] = useState('')
  const [slots, setSlots] = useState([{ time: '', available: true }])
  const [message, setMessage] = useState('')

  const handleSlotChange = (index, field, value) => {
    const newSlots = [...slots]
    newSlots[index][field] = value
    setSlots(newSlots)
  }

  const addSlot = () => {
    setSlots([...slots, { time: '', available: true }])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const availability = { date, slots }
      const result = await doctorService.updateAvailability(
        doctorId,
        availability
      )
      setMessage(result.message)
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error updating availability')
    }
  }

  return (
    <div className="update-availability">
      <Typography variant="h4">Update Doctor Availability</Typography>
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
          {slots.map((slot, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label={`Slot Time ${index + 1}`}
                  value={slot.time}
                  onChange={(e) =>
                    handleSlotChange(index, 'time', e.target.value)
                  }
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label={`Slot Available ${index + 1}`}
                  value={slot.available}
                  onChange={(e) =>
                    handleSlotChange(
                      index,
                      'available',
                      e.target.value === 'true'
                    )
                  }
                  required
                  select
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </TextField>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Button
          type="button"
          onClick={addSlot}
          variant="contained"
          color="secondary"
          className="add-slot-button"
        >
          Add Slot
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="update-button"
        >
          Update Availability
        </Button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  )
}

export default UpdateAvailability
