const ADMIN_PASSWORD = 'slyder@admin123'
const AUTH_KEY = 'slyder_admin_auth'

export const login = (password) => {
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem(AUTH_KEY, 'true')
    return true
  }
  return false
}

export const logout = () => localStorage.removeItem(AUTH_KEY)

export const isAuthenticated = () => localStorage.getItem(AUTH_KEY) === 'true'
