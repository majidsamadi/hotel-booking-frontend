const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function login(email, password, rememberMe) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, remember_me: rememberMe })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Login failed');
  }

  const data = await response.json();
  console.log(data);

  // ✅ Save token only if login succeeds
  if (data.access_token) {
    console.log("I have access token here " + data.access_token)
    localStorage.setItem('token', data.access_token);
  }

  return data;
}


export async function register(data) {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Registration failed');
  }

  return await response.json();
}


export function logout() {
  localStorage.removeItem('token');
}