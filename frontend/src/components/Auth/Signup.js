import React, { useState } from 'react'
import { signup } from '../../services/api'
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  Box,
} from '@mui/material'

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    medicalId: '',
    role: 'patient',
    phoneNumber: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(formData)
      .then((response) => {
        console.log(response.data) // eslint-disable-line no-console
        alert('Signup successful')
      })
      .catch((error) => {
        console.error(error) // eslint-disable-line no-console
        alert('Signup failed')
      })
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Signup
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
            type="password"
            label="Password"
            name="password"
            value={formData.password}
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
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              label="Role"
            >
              <MenuItem value="patient">Patient</MenuItem>
              <MenuItem value="doctor">Doctor</MenuItem>
            </Select>
          </FormControl>
          <Box mt={2} display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Signup
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

export default Signup
