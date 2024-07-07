import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../../services/Auth/authService'
import './Auth.module.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('') // Clear previous errors
    setMessage('') // Clear previous messages
    try {
      const response = await authService.login({ username, password })
      localStorage.setItem('token', response.token) // Save token to localStorage
      localStorage.setItem('user', JSON.stringify(response.user)) // Save user info to localStorage
      setMessage('Login successful!')
      // Redirect to profile or dashboard based on user role
      setTimeout(() => {
        navigate('/profile')
      }, 1500) // Redirect after 1.5 seconds
    } catch (err) {
      setError(err.response?.data?.error || 'Error logging in')
    }
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        <button type="submit" className="btn-primary">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
