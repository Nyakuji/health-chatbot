import React, { useState, useEffect } from 'react'
import { fetchProfile } from './profileUtils'
import { useAuth } from '../../contexts/AuthContext'
import { Container, Typography, Avatar, CircularProgress } from '@mui/material'

const API_URL = 'http://localhost:5000/api'

const UserProfile = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    medicalId: '',
    profilePicture: '',
  })
  const [loading, setLoading] = useState(true)

  const { userRole, userData } = useAuth()

  useEffect(() => {
    fetchProfile(userData, setLoading, setProfile, API_URL)
  }, [userData, userRole])

  if (loading) {
    return <CircularProgress />
  }

  if (!profile.username) {
    return <Typography variant="h6">User not found</Typography>
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Avatar
        src={profile.profilePicture}
        alt={profile.username}
        style={{ width: 100, height: 100 }}
      />
      <Typography variant="h6">Username: {profile.username}</Typography>
      <Typography variant="h6">Email: {profile.email}</Typography>
      <Typography variant="h6">Phone Number: {profile.phoneNumber}</Typography>
      <Typography variant="h6">Medical ID: {profile.medicalId}</Typography>
    </Container>
  )
}

export default UserProfile
