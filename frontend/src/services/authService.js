import axios from 'axios'

const API_URL = 'http://localhost:5000/api/auth/'

const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}signup`, userData)
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
  } catch (error) {
    console.error(
      'Signup error:',
      error.response ? error.response : error.message
    )
    throw error
  }
}

const login = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData)
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

const getCurrentUser = () => {
  const userStr = localStorage.getItem('user')
  if (userStr) {
    try {
      return JSON.parse(userStr)
    } catch (error) {
      console.error('Error parsing user data:', error)
      return null
    }
  }
  return null
}

const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  signup,
  login,
  getCurrentUser,
  logout,
}

export default authService
