import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// tokens attached to sessionstorage or localstorage
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token') || localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("No token found in sessionStorage or localStorage");
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
