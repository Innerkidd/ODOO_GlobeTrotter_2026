const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api';
const API_BASE_URL = rawBaseUrl.endsWith('/api') ? rawBaseUrl : `${rawBaseUrl.replace(/\/$/, '')}/api`;

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('globetrotter_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok || data.success === false) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}
