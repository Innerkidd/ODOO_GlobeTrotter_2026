import apiClient from './api/axiosClient';

export async function register({ name, email, password }) {
  const response = await apiClient.post('/auth/register', { name, email, password });
  return response;
}

export async function login({ email, password }) {
  const response = await apiClient.post('/auth/login', { email, password });
  return response;
}

export async function logout() {
  const response = await apiClient.post('/auth/logout');
  return response;
}

export async function getCurrentUser() {
  const response = await apiClient.get('/auth/me');
  return response;
}

export async function forgotPassword({ email }) {
  const response = await apiClient.post('/auth/forgot-password', { email });
  return response;
}

export async function resetPassword({ token, password }) {
  const response = await apiClient.post('/auth/reset-password', { token, password });
  return response;
}