import React from 'react'
import { Container, Paper, Typography } from '@mui/material'
import ProfileForm from './ProfileForm'
import UploadProfilePicture from './UploadProfilePicture'
import './Profile.module.css'

const Profile = () => {
  return (
    <Container maxWidth="md" className="profile-container">
      <Paper className="profile-paper">
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <UploadProfilePicture />
        <ProfileForm />
      </Paper>
    </Container>
  )
}

export default Profile
