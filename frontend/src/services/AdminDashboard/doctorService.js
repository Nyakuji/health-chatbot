import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

const getAllDoctors = async () => {
  const response = await axios.get(`${API_URL}/doctors`)
  return response.data
}

const updateDoctor = async (doctorId, data) => {
  const response = await axios.put(`${API_URL}/doctor`, { doctorId, ...data })
  return response.data
}

const deleteDoctor = async (doctorId) => {
  const response = await axios.delete(`${API_URL}/doctor/${doctorId}`)
  return response.data
}

const doctorService = {
  getAllDoctors,
  updateDoctor,
  deleteDoctor,
}

export default doctorService
