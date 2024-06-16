import axios from 'axios';

const API_URL = 'http://localhost:5000/api/activity-log/';

const getActivityLogs = async () => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: localStorage.getItem('token') }
  });
  return response.data;
};

const activityLogService = { getActivityLogs };
export default activityLogService;
