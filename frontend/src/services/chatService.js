import axios from 'axios'

const API_URL = 'http://localhost:5000/api/chat/'

const sendMessage = async (messageData) => {
  const response = await axios.post(`${API_URL}send`, messageData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
  return response.data
}

const getMessages = async (userId1, userId2) => {
  const response = await axios.get(`${API_URL}messages/${userId1}/${userId2}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
  return response.data
}

const chatService = {
  sendMessage,
  getMessages,
}

export default chatService
