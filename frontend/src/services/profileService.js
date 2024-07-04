import axios from 'axios'

const API_URL = 'http://localhost:5000/api/profile'

// Fetch user data by user ID
const getUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`)
    return response.data
  } catch (error) {
    console.error(
      'Error fetching user data:',
      error.response ? error.response.data : error.message
    )
    throw error
  }
}

// Update user profile
const updateProfile = async (profileData) => {
  try {
    const response = await axios.post(`${API_URL}/update`, profileData)
    return response.data
  } catch (error) {
    console.error(
      'Error updating profile:',
      error.response ? error.response.data : error.message
    )
    throw error
  }
}

// Upload profile picture
const uploadProfilePicture = async (formData) => {
  try {
    const response = await axios.post(
      `${API_URL}/uploadProfilePicture`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data
  } catch (error) {
    console.error(
      'Error uploading profile picture:',
      error.response ? error.response.data : error.message
    )
    throw error
  }
}

export default {
  getUser,
  updateProfile,
  uploadProfilePicture,
}
