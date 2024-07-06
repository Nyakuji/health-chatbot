import React, { useState, useEffect } from 'react'
import { Button, Avatar, Typography } from '@mui/material'
import profileService from '../../services/Profile/profileService'
import authService from '../../services/Auth/authService'
import './UploadProfilePicture.module.css'

const UploadProfilePicture = () => {
  const [profilePicture, setProfilePicture] = useState(null)
  const [user, setUser] = useState({ profilePicture: '', username: '' })

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = authService.getCurrentUser()
      if (currentUser) {
        const userData = await profileService.getProfile(currentUser.id)
        setUser(userData)
      }
    }

    fetchUser()
  }, [])

  const handlePictureChange = (event) => {
    setProfilePicture(event.target.files[0])
  }

  const handlePictureUpload = async () => {
    if (!profilePicture) {
      console.error('No profile picture selected')
      return
    }

    const formData = new FormData()
    formData.append('profilePicture', profilePicture)

    try {
      const updatedUser = await profileService.uploadProfilePicture(formData)
      setUser(updatedUser)
    } catch (error) {
      console.error('Error uploading profile picture:', error) //eslint-disable-line no-console
    }
  }

  return (
    <div className="upload-profile-picture">
      <Avatar
        src={user.profilePicture}
        alt="Profile"
        className="profile-avatar"
      />
      <Typography variant="h6">{user.username}</Typography>
      <input
        type="file"
        onChange={handlePictureChange}
        className="upload-input"
      />
      <Button
        onClick={handlePictureUpload}
        variant="contained"
        color="primary"
        className="upload-button"
      >
        Upload Profile Picture
      </Button>
    </div>
  )
}

export default UploadProfilePicture
