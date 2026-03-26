// Keys for localStorage
export const KEYS = {
  products: 'slyder_products',
  testimonials: 'slyder_testimonials',
  announcements: 'slyder_announcements',
  contactInfo: 'slyder_contact_info',
}

export const getStore = (key, fallback) => {
  try {
    const val = localStorage.getItem(key)
    return val ? JSON.parse(val) : fallback
  } catch {
    return fallback
  }
}

export const setStore = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}
