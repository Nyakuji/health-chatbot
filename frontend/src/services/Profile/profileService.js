import axios from 'axios'
import authService from '../Auth/authService'

const API_URL = 'http://localhost:5000/api/profile/'

const getProfile = async (userId) => {
  const token = authService.getToken()
  const response = await axios.get(`${API_URL}${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const updateProfile = async (profileData) => {
  const token = authService.getToken()
  const response = await axios.post(`${API_URL}update`, profileData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const uploadProfilePicture = async (formData) => {
  const token = authService.getToken()
  const response = await axios.post(
    `${API_URL}uploadProfilePicture`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    }
  )
  return response.data
}

const profileService = {
  getProfile,
  updateProfile,
  uploadProfilePicture,
}

export default profileService
