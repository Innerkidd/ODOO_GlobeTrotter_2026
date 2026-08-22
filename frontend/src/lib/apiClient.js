const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
