import axios from 'axios';

const API_URL = 'http://localhost:5000/api/analytics/';

const getAnalyticsData = async () => {
  const response = await axios.get(`${API_URL}data`, {
    headers: { Authorization: localStorage.getItem('token') }
  });
  return response.data;
};

export default { getAnalyticsData };
