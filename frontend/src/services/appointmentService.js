import axios from 'axios'

const API_URL = 'http://localhost:5000/api/appointment/'

const bookAppointment = async (appointmentData) => {
  const response = await axios.post(`${API_URL}book`, appointmentData)
  return response.data
}

const getDoctorAvailability = async (doctorId, date) => {
  const response = await axios.get(`${API_URL}availability`, {
    params: { doctorId, date },
  })
  return response.data
}

const cancelAppointment = async (
  appointmentId,
  contactInfo,
  notificationType
) => {
  const response = await axios.post(`${API_URL}cancel`, {
    appointmentId,
    contactInfo,
    notificationType,
  })
  return response.data
}

const getAppointmentHistory = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}history`, {
      params: { userId },
    })
    return response.data
  } catch (error) {
    console.error(
      'Error fetching appointment history:',
      error.response ? error.response.data : error.message
    ) //eslint-disable-line
    throw error.response ? error.response.data : error.message
  }
}

const appointmentService = {
  bookAppointment,
  getDoctorAvailability,
  cancelAppointment,
  getAppointmentHistory,
}
export default appointmentService
