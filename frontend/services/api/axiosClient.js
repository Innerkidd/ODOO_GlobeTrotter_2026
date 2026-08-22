import axios from 'axios';

const TOKEN_KEY = 'globetrotter_token';

export const getStoredToken = () => localStorage.getItem(TOKEN_KEY);
export const setStoredToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearStoredToken = () => localStorage.removeItem(TOKEN_KEY);

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api';
const baseURL = rawBaseUrl.endsWith('/api') ? rawBaseUrl : `${rawBaseUrl.replace(/\/$/, '')}/api`;

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach Authorization header only when a real token exists
apiClient.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token && token !== 'undefined' && token !== 'null') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Invalid/expired token: clear it so guards send the user to login
    if (error.response?.status === 401 && window.location.pathname !== '/login') {
      clearStoredToken();
    }
    return Promise.reject(error);
  }
);

export default apiClient;