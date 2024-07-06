import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

const getAllAppointments = async () => {
  const response = await axios.get(`${API_URL}/appointments`)
  return response.data
}

const updateAppointment = async (appointmentId, data) => {
  const response = await axios.put(`${API_URL}/appointment`, {
    appointmentId,
    ...data,
  })
  return response.data
}

const deleteAppointment = async (appointmentId) => {
  const response = await axios.delete(`${API_URL}/appointment/${appointmentId}`)
  return response.data
}

const appointmentService = {
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
}

export default appointmentService
