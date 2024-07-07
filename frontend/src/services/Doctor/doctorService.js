import axios from 'axios'

const API_URL = 'http://localhost:5000/api/doctors/'

const searchDoctors = async (filters) => {
  try {
    const response = await axios.get(`${API_URL}search`, { params: filters })
    return response.data
  } catch (error) {
    console.error(
      'Error searching doctors:',
      error.response?.data || error.message
    )
    throw error.response?.data || error.message
  }
}

const updateAvailability = async (doctorId, availability) => {
  try {
    const response = await axios.post(`${API_URL}update-availability`, {
      doctorId,
      availability,
    })
    return response.data
  } catch (error) {
    console.error(
      'Error updating availability:',
      error.response?.data || error.message
    )
    throw error.response?.data || error.message
  }
}

const doctorService = {
  searchDoctors,
  updateAvailability,
}

export default doctorService
