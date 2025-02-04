const API_BASE = "http://localhost:5000/api";

export async function getPlaces() {
  const response = await fetch(`${API_BASE}/places`);
  return response.json();
}

export async function createUser(user) {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return response.json();
}
