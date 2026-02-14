import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

console.log('🔌 API URL:', API_URL);  // ✅ Add this for debugging

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('📤 Request:', config.method.toUpperCase(), config.url);  // ✅ Debug log
  return config;
});

// Handle errors
client.interceptors.response.use(
  (response) => {
    console.log('📥 Response:', response.status, response.data);  // ✅ Debug log
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.message);  // ✅ Debug log
    console.error('Error details:', error.response?.data);  // ✅ Debug log
    return Promise.reject(error);
  }
);

export default client;