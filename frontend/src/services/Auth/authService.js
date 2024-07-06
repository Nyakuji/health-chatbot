import axios from 'axios'

const API_URL = 'http://localhost:5000/api/'

const signup = async (userData) => {
  const response = await axios.post(`${API_URL}signup`, userData)
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

const login = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData)
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

const logout = () => {
  localStorage.removeItem('user')
}

const getCurrentUser = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
}

export default authService
