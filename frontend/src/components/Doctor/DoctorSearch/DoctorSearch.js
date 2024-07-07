import React, { useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import doctorService from '../../../services/Doctor/doctorService'
import './DoctorSearch.module.css'

const DoctorSearch = () => {
  const [specialty, setSpecialty] = useState('')
  const [location, setLocation] = useState('')
  const [doctors, setDoctors] = useState([
    { _id: '', username: '', specialty: '', location: '' },
  ])
  const [message, setMessage] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault()
    try {
      const results = await doctorService.searchDoctors({ specialty, location })
      setDoctors(results)
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error searching doctors')
    }
  }

  return (
    <div className="doctor-search">
      <Typography variant="h4">Search Doctors</Typography>
      <form onSubmit={handleSearch}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Specialty"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="search-button"
        >
          Search
        </Button>
      </form>
      {message && <p className="message">{message}</p>}
      {doctors.length > 0 && (
        <List>
          {doctors.map((doctor) => (
            <ListItem key={doctor._id}>
              <ListItemText
                primary={`Dr. ${doctor.username}, ${doctor.specialty}`}
                secondary={doctor.location}
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  )
}

export default DoctorSearch
