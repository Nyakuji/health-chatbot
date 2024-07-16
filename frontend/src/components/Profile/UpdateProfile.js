import React, { useState, useEffect } from 'react'
import { fetchProfile } from './profileUtils'
import { useAuth } from '../../contexts/AuthContext'
import { updateProfile } from '../../services/api'
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from '@mui/material'

const API_URL = 'http://localhost:5000/api'

const UpdateProfile = () => {
  const { userData } = useAuth()
  const userId = userData?.id

  const [formData, setFormData] = useState({
    userId,
    username: '',
    email: '',
    phoneNumber: '',
    medicalId: '',
  })
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    medicalId: '',
    profilePicture: '',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProfile(userData, setLoading, setProfile, API_URL)
  }, [userData])

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
            value={profile.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Medical ID"
            name="medicalId"
            value={profile.medicalId}
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

export default UpdateProfile
