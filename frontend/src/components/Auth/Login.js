import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
} from '@mui/material'
import { login as loginService } from '../../services/api'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await loginService({ username, password })
      console.log('Login response:', response.data.user) // eslint-disable-line no-console
      const { role, ...user } = response.data.user
      login(role, user) // Update auth state with user role and user data
      navigate('/') // Redirect to the home page or any other page
    } catch (error) {
      console.error('Login failed:', error) // eslint-disable-line no-console
      alert('Login failed')
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
              Login
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

export default Login
