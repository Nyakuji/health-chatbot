import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

// Admin
export const getUsers = () => axios.get(`${API_URL}/users`)
export const getDoctors = () => axios.get(`${API_URL}/doctors`)
export const getAppointments = () => axios.get(`${API_URL}/appointments`)
export const updateUser = (user) => axios.put(`${API_URL}/user`, user)
export const deleteUser = (userId) => axios.delete(`${API_URL}/user/${userId}`)
export const updateAppointment = (appointment) =>
  axios.put(`${API_URL}/appointment`, appointment)
export const deleteAppointment = (appointmentId) =>
  axios.delete(`${API_URL}/appointment/${appointmentId}`)

export const getAnalyticsData = () => axios.get(`${API_URL}/analytics/data`)
export const getActivityLogs = () => axios.get(`${API_URL}/activityLogs`)

//Appointments
export const bookAppointment = (data) => axios.post(`${API_URL}/book`, data)
export const getDoctorAvailability = (doctorId, date) =>
  axios.get(`${API_URL}/availability`, { params: { doctorId, date } })
export const cancelAppointment = (data) => axios.post(`${API_URL}/cancel`, data)
export const getAppointmentHistory = (userId) =>
  axios.get(`${API_URL}/history`, { params: { userId } })

//profile
export const getProfile = (userId) => axios.get(`${API_URL}/profile/${userId}`)
export const updateProfile = (data) =>
  axios.post(`${API_URL}/profile/update`, data)
export const uploadProfilePicture = (userId, formData) =>
  axios.post(`${API_URL}/profile/uploadProfilePicture/${userId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

// Auth
export const signup = (data) => axios.post(`${API_URL}/signup`, data)
export const login = (data) => axios.post(`${API_URL}/login`, data)

// Chat
export const sendMessage = (data) => axios.post(`${API_URL}/chat/send`, data)
export const getMessages = (userId1, userId2) =>
  axios.get(`${API_URL}/chat/messages/${userId1}/${userId2}`)

//Feedback
export const createFeedback = (data) => axios.post(`${API_URL}/feedback`, data)
export const getFeedbackForDoctor = (doctorId) =>
  axios.get(`${API_URL}/feedback/${doctorId}`)

// Notifications
export const sendReminder = (data) =>
  axios.post(`${API_URL}/notifications/send-reminder`, data)

// Doctor
export const searchDoctors = (params) =>
  axios.get(`${API_URL}/doctors/search`, { params })
export const updateAvailability = (data) =>
  axios.post(`${API_URL}/doctors/update-availability`, data)

// Symptoms
export const checkSymptoms = (data) =>
  axios.post(`${API_URL}/symptoms/check`, data)
