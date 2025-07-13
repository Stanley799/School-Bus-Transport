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

//redirect to login if session expires 
api.interceptors.response.use(
  res => res,
  error => {
    if (error.response?.status === 401) {
      sessionStorage.clear();
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
