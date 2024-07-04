import axios from 'axios'

const API_URL = 'http://localhost:5000/api/symptom'

const checkSymptoms = async (symptomsData, token) => {
  try {
    const response = await axios.post(`${API_URL}/check`, symptomsData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(
      'Error checking symptoms:',
      error.response ? error.response.data : error.message
    )
    throw error
  }
}

export default {
  checkSymptoms,
}
