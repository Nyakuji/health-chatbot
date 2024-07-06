import React, { useState, useEffect } from 'react'
import { TextField, Button, Grid } from '@mui/material'
import profileService from '../../services/Profile/profileService'
import authService from '../../services/Auth/authService'
import './ProfileForm.module.css'

const ProfileForm = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    medicalId: '',
  })
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      const user = authService.getCurrentUser()
      if (user) {
        const profileData = await profileService.getProfile(user.id)
        setProfile({
          username: profileData.username || '',
          email: profileData.email || '',
          phoneNumber: profileData.phoneNumber || '',
          medicalId: profileData.medicalId || '',
        })
      }
    }

    fetchProfile()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = authService.getCurrentUser()
      const result = await profileService.updateProfile({
        ...profile,
        userId: user.id,
      })
      setMessage(result.message)
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error updating profile')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={profile.username}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Medical ID"
            name="medicalId"
            value={profile.medicalId}
            onChange={handleChange}
            required
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="profile-submit-button"
      >
        Update Profile
      </Button>
      {message && <p className="profile-message">{message}</p>}
    </form>
  )
}

export default ProfileForm
