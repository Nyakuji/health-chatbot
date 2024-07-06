import axios from 'axios'

const API_URL = 'http://localhost:5000/api/profile/'

const getProfile = async (userId) => {
  const response = await axios.get(`${API_URL}${userId}`)
  return response.data
}

const updateProfile = async (profileData) => {
  const response = await axios.post(`${API_URL}update`, profileData)
  return response.data
}

const uploadProfilePicture = async (formData) => {
  const response = await axios.post(
    `${API_URL}uploadProfilePicture`,
    formData,
    {
      headers: {
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
