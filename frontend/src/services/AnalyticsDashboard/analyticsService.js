import axios from 'axios'

const API_URL = 'http://localhost:5000/api/analytics/data'

const getAnalyticsData = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    return response.data
  } catch (error) {
    console.error(
      'Error fetching analytics data:',
      error.response ? error.response.data : error.message
    )
    throw error.response ? error.response.data : error.message
  }
}

const analyticsService = {
  getAnalyticsData,
}

export default analyticsService
