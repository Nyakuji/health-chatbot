import axios from 'axios'

const API_URL = 'http://localhost:5000/api/symptom/'

const checkSymptoms = async (symptoms) => {
  const response = await axios.post(`${API_URL}check`, { symptoms })
  return response.data
}

const symptomService = { checkSymptoms }

export default symptomService
