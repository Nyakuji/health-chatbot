import React, { useState } from 'react'
import { searchDoctors } from '../../services/api'

import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Box,
} from '@mui/material'

const SearchDoctors = () => {
  const [specialty, setSpecialty] = useState('')
  const [location, setLocation] = useState('')
  const [doctors, setDoctors] = useState([
    { _id: '', username: '', specialty: '', location: '' },
  ])

  const handleSearch = () => {
    const params = { specialty, location }
    searchDoctors(params)
      .then((response) => {
        setDoctors(response.data)
      })
      .catch((error) => {
        console.error(error) // eslint-disable-line no-console
        alert('Failed to search doctors')
      })
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Search Doctors
        </Typography>
        <form>
          <TextField
            label="Specialty"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Box mt={2} display="flex" justifyContent="center">
            <Button
              onClick={handleSearch}
              variant="contained"
              color="primary"
              size="large"
            >
              Search
            </Button>
          </Box>
        </form>
        {doctors.length > 0 && (
          <Grid container spacing={2} sx={{ mt: 4 }}>
            {doctors.map((doctor) => (
              <Grid item xs={12} sm={6} md={4} key={doctor._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">{doctor.username}</Typography>
                    <Typography variant="body1">{doctor.specialty}</Typography>
                    <Typography variant="body1">{doctor.location}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Container>
  )
}

export default SearchDoctors
