import axios from 'axios';

const API_URL = 'http://localhost:5000/api/doctor/';

const searchDoctors = async (filters) => {
  const response = await axios.get(`${API_URL}search`, { params: filters });
  return response.data;
};

const searchService = {
  searchDoctors
};

export default searchService;
