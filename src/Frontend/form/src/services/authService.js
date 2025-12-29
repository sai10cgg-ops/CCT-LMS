const API_URL = "http://localhost:8081/api/auth/login";

export async function login(username, password) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error("Invalid username or password");

  return await res.json();
}
