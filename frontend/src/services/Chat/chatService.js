import axios from 'axios'

const API_URL = 'http://localhost:5000/api/chat'

const sendMessage = async (messageData) => {
  try {
    const response = await axios.post(`${API_URL}/send`, messageData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    return response.data
  } catch (error) {
    console.error(
      'Error sending message:',
      error.response ? error.response.data : error.message
    )
    throw error.response ? error.response.data : error.message
  }
}

const getMessages = async (userId1, userId2) => {
  try {
    const response = await axios.get(
      `${API_URL}/messages/${userId1}/${userId2}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    )
    return response.data
  } catch (error) {
    console.error(
      'Error fetching messages:',
      error.response ? error.response.data : error.message
    )
    throw error.response ? error.response.data : error.message
  }
}

const chatService = {
  sendMessage,
  getMessages,
}

export default chatService
