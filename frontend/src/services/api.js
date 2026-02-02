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

export const signup = async (signupData) => {
  const response = await api.post('/auth/signup', signupData);
  return response.data;
};

export const checkCoupleExists = async (anniversaryDate, herDateOfBirth, hisDateOfBirth) => {
  const response = await api.post('/auth/check-exists', {
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

export const updateCouplePhoto = async (coupleId, photoUrl) => {
  const response = await api.put(`/couple/${coupleId}/photo`, { photoUrl });
  return response.data;
};

// File Upload
export const uploadCouplePhoto = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post('/upload/couple-photo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const uploadMemoryPhoto = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post('/upload/memory-photo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Declarations of Love
export const getLoveLetters = async (coupleId) => {
  const response = await api.get(`/love-letters/couple/${coupleId}`);
  return response.data;
};

export const createLoveLetter = async (letterData) => {
  const response = await api.post('/love-letters', letterData);
  return response.data;
};

export const deleteLoveLetter = async (letterId) => {
  const response = await api.delete(`/love-letters/${letterId}`);
  return response.data;
};

// Memories
export const getMemories = async (coupleId) => {
  const response = await api.get(`/memories/couple/${coupleId}`);
  return response.data;
};

export const createMemory = async (memoryData) => {
  const response = await api.post('/memories', memoryData);
  return response.data;
};

export const deleteMemory = async (memoryId) => {
  const response = await api.delete(`/memories/${memoryId}`);
  return response.data;
};

// Important Dates
export const getImportantDates = async (coupleId) => {
  const response = await api.get(`/important-dates/couple/${coupleId}`);
  return response.data;
};

export const createImportantDate = async (dateData) => {
  const response = await api.post('/important-dates', dateData);
  return response.data;
};

export const deleteImportantDate = async (dateId) => {
  const response = await api.delete(`/important-dates/${dateId}`);
  return response.data;
};

export default api;

