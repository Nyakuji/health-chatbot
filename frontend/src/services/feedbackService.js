import axios from 'axios';

const API_URL = 'http://localhost:5000/api/feedback/';

const submitFeedback = async (feedbackData) => {
  const response = await axios.post(API_URL, feedbackData);
  return response.data;
};

const getFeedbackForDoctor = async (doctorId) => {
  const response = await axios.get(`${API_URL}${doctorId}`);
  return response.data;
};

const feedbackService = { submitFeedback, getFeedbackForDoctor };
export default feedbackService;
