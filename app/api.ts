const API_BASE = "http://localhost:8080/api"

export async function apiLogin(username: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
  return res.json()
}

export async function apiGoogleLogin(credential: string) {
  const res = await fetch(`${API_BASE}/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ credential }),
  })
  return res.json()
}

export async function apiSignup(data: {
  username: string
  password: string
  securityQuestion1: string
  securityAnswer1: string
  securityQuestion2: string
  securityAnswer2: string
}) {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return res.json()
}
