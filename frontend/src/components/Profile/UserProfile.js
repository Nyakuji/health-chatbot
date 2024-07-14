import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getProfile } from '../../services/api'
import { Container, Typography, Avatar, CircularProgress } from '@mui/material'

const UserProfile = ({ userId }) => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    medicalId: '',
    profilePicture: '',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProfile(userId)
      .then((response) => {
        setProfile(response.data.user)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }, [userId])

  if (loading) {
    return <CircularProgress />
  }

  if (!profile) {
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

UserProfile.propTypes = {
  userId: PropTypes.string.isRequired,
}

export default UserProfile
