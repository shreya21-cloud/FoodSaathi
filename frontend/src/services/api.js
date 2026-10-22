import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 12000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor: attach token from localStorage or sessionStorage
api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem('foodsaathi_token') ||
      sessionStorage.getItem('foodsaathi_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK' || !error.response) {
      console.info(
        '[FoodSaathi] Network note: Backend API temporarily unreachable, operating in resilient offline state.'
      );
    }
    return Promise.reject(error);
  }
);

export default api;
