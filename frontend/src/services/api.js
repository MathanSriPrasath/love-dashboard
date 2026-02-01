import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Authentication
export const login = async (anniversaryDate, herDateOfBirth, hisDateOfBirth) => {
  const response = await api.post('/auth/login', {
    anniversaryDate,
    herDateOfBirth,
    hisDateOfBirth,
  });
  return response.data;
};

// Couple
export const getCoupleById = async (coupleId) => {
  const response = await api.get(`/couple/${coupleId}`);
  return response.data;
};

// Love Letters
export const getLoveLetters = async (coupleId) => {
  const response = await api.get(`/love-letters/couple/${coupleId}`);
  return response.data;
};

// Memories
export const getMemories = async (coupleId) => {
  const response = await api.get(`/memories/couple/${coupleId}`);
  return response.data;
};

// Important Dates
export const getImportantDates = async (coupleId) => {
  const response = await api.get(`/important-dates/couple/${coupleId}`);
  return response.data;
};

export default api;

