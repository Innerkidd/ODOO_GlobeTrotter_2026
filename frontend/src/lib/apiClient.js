const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api';
const API_BASE_URL = rawBaseUrl.endsWith('/api') ? rawBaseUrl : `${rawBaseUrl.replace(/\/$/, '')}/api`;

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('globetrotter_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const formattedPath = path.startsWith('/') ? path : `/${path}`;

  const res = await fetch(`${API_BASE_URL}${formattedPath}`, { ...options, headers });
  
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { message: text || `Server error (${res.status})` };
  }

  if (!res.ok || data.success === false) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }

  return data;
}
