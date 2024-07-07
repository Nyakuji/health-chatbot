import axios from 'axios'

const API_URL = 'http://localhost:5000/api/notifications/'

const sendReminder = async (reminderData) => {
  try {
    const response = await axios.post(`${API_URL}send-reminder`, reminderData)
    return response.data
  } catch (error) {
    console.error(
      'Error sending reminder:',
      error.response?.data || error.message
    )
    throw error.response?.data || error.message
  }
}

const notificationService = {
  sendReminder,
}

export default notificationService
