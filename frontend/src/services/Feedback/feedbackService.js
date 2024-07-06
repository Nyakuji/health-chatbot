import axios from 'axios'

const API_URL = 'http://localhost:5000/api/feedback'

const createFeedback = async (feedbackData) => {
  try {
    const response = await axios.post(API_URL, feedbackData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    return response.data
  } catch (error) {
    console.error(
      'Error creating feedback:',
      error.response ? error.response.data : error.message
    )
    throw error.response ? error.response.data : error.message
  }
}

const getFeedbackForDoctor = async (doctorId) => {
  try {
    const response = await axios.get(`${API_URL}/${doctorId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    return response.data
  } catch (error) {
    console.error(
      'Error fetching feedback for doctor:',
      error.response ? error.response.data : error.message
    )
    throw error.response ? error.response.data : error.message
  }
}

const feedbackService = {
  createFeedback,
  getFeedbackForDoctor,
}

export default feedbackService
