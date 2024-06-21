import axios from 'axios'

const API_URL = 'http://localhost:5000/api/notification/'

const sendReminder = async (appointmentId, contactInfo, notificationType) => {
  const response = await axios.post(`${API_URL}send-reminder`, {
    appointmentId,
    contactInfo,
    notificationType,
  })
  return response.data
}

const notificationService = { sendReminder }

export default notificationService
