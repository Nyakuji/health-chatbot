import axios from 'axios'

const API_URL = 'http://localhost:5000/api/profile/'

const updateProfile = async (profileData) => {
  const response = await axios.post(`${API_URL}update`, profileData)
  return response.data
}

const getAppointmentHistory = async (userId) => {
  const response = await axios.get(`${API_URL}appointments`, {
    params: { userId },
  })
  return response.data
}

const getUser = async (userId) => {
  const response = await axios.get(`${API_URL}${userId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
  return response.data
}

const uploadProfilePicture = async (formData) => {
  const response = await axios.post(
    `${API_URL}uploadProfilePicture`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  )
  return response.data
}

const profileService = {
  updateProfile,
  getAppointmentHistory,
  getUser,
  uploadProfilePicture,
}

export default profileService
