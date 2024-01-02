export function stockToken(token: string) {
  localStorage.setItem("token", token)
}

export function getToken(): string | null {
  return localStorage.getItem("token")
}

export function fetchWithToken(url: string, options: RequestInit = {}) {
  const token = getToken()
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    }
  }
  return fetch(url, options)
}
