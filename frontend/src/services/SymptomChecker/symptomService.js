import axios from 'axios'

const API_URL = 'http://localhost:5000/api/symptoms/'

const checkSymptoms = async (symptoms) => {
  try {
    const response = await axios.post(`${API_URL}check`, { symptoms })
    return response.data
  } catch (error) {
    console.error(
      'Error checking symptoms:',
      error.response ? error.response.data : error.message
    )
    throw error.response ? error.response.data : error.message
  }
}

const symptomService = {
  checkSymptoms,
}

export default symptomService
