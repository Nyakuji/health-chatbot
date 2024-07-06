import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}/users`)
  return response.data
}

const updateUser = async (userId, data) => {
  const response = await axios.put(`${API_URL}/user`, { userId, ...data })
  return response.data
}

const deleteUser = async (userId) => {
  const response = await axios.delete(`${API_URL}/user/${userId}`)
  return response.data
}

const userService = {
  getAllUsers,
  updateUser,
  deleteUser,
}

export default userService
