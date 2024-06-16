import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin/';

const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}users`);
  return response.data;
};

const getAllDoctors = async () => {
  const response = await axios.get(`${API_URL}doctors`);
  return response.data;
};

const getAllAppointments = async () => {
  const response = await axios.get(`${API_URL}appointments`);
  return response.data;
};

const updateUser = async (userId, updates) => {
  const response = await axios.put(`${API_URL}user`, { userId, updates });
  return response.data;
};

const deleteUser = async (userId) => {
  const response = await axios.delete(`${API_URL}user/${userId}`);
  return response.data;
};

const updateAppointment = async (appointmentId, updates) => {
  const response = await axios.put(`${API_URL}appointment`, { appointmentId, updates });
  return response.data;
};

const deleteAppointment = async (appointmentId) => {
  const response = await axios.delete(`${API_URL}appointment/${appointmentId}`);
  return response.data;
};

const adminService = { getAllUsers, getAllDoctors, getAllAppointments, updateUser, deleteUser, updateAppointment, deleteAppointment };
export default adminService;
