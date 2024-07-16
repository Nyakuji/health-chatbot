import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { uploadProfilePicture } from '../../services/api'
import {
  Container,
  Button,
  Typography,
  TextField,
  Paper,
  Box,
} from '@mui/material'

const UploadProfilePicture = () => {
  const [file, setFile] = useState(null)
  const { userData } = useAuth()

  const handleChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    if (file) {
      formData.append('profilePicture', file)
    }
    uploadProfilePicture(userData?.id, formData)
      .then((response) => {
        console.log(response.data) // eslint-disable-line no-console
        alert('Profile picture uploaded successfully')
      })
      .catch((error) => {
        console.error(error) // eslint-disable-line no-console
        alert('Failed to upload profile picture')
      })
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Upload Profile Picture
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type="file"
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          <Box mt={2} display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Upload Picture
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

export default UploadProfilePicture
