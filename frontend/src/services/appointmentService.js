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

const appointmentService = {
  bookAppointment,
  getDoctorAvailability,
  cancelAppointment,
}
export default appointmentService
