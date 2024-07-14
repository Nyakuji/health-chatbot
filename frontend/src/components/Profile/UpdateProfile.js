import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { updateProfile } from '../../services/api'
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from '@mui/material'

const UpdateProfile = ({ userId }) => {
  const [formData, setFormData] = useState({
    userId,
    username: '',
    email: '',
    phoneNumber: '',
    medicalId: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateProfile(formData)
      .then((response) => {
        console.log(response.data) // eslint-disable-line no-console
        alert('Profile updated successfully')
      })
      .catch((error) => {
        console.error(error) // eslint-disable-line no-console
        alert('Failed to update profile')
      })
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Update Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Medical ID"
            name="medicalId"
            value={formData.medicalId}
            onChange={handleChange}
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
              Update Profile
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

UpdateProfile.propTypes = {
  userId: PropTypes.string.isRequired,
}

export default UpdateProfile
