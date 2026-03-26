import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://slyderind.onrender.com/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('slyder_admin_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  // Let axios set Content-Type automatically (multipart for FormData, json for objects)
  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json'
  }
  return config
})

// ─── Auth ────────────────────────────────────────────────
export const apiLogin = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password })
  localStorage.setItem('slyder_admin_token', data.token)
  return data
}
export const apiLogout       = ()     => localStorage.removeItem('slyder_admin_token')
export const isAuthenticated = ()     => !!localStorage.getItem('slyder_admin_token')

// ─── Banners ──────────────────────────────────────────────
export const getBanners   = ()             => api.get('/banners').then(r => r.data)
export const createBanner = (formData)     => api.post('/banners', formData).then(r => r.data)
export const updateBanner = (id, formData) => api.put(`/banners/${id}`, formData).then(r => r.data)
export const deleteBanner = (id)           => api.delete(`/banners/${id}`).then(r => r.data)

// ─── Products ────────────────────────────────────────────
export const getProducts   = ()           => api.get('/products').then(r => r.data)
export const getProduct    = (slug)       => api.get(`/products/${slug}`).then(r => r.data)
export const createProduct = (body)       => api.post('/products', body).then(r => r.data)
export const updateProduct = (slug, body) => api.put(`/products/${slug}`, body).then(r => r.data)
export const deleteProduct = (slug)       => api.delete(`/products/${slug}`).then(r => r.data)

// ─── Testimonials ─────────────────────────────────────────
export const getTestimonials   = ()         => api.get('/testimonials').then(r => r.data)
export const createTestimonial = (fd)       => api.post('/testimonials', fd).then(r => r.data)
export const updateTestimonial = (id, fd)   => api.put(`/testimonials/${id}`, fd).then(r => r.data)
export const deleteTestimonial = (id)       => api.delete(`/testimonials/${id}`).then(r => r.data)

// ─── Announcements ────────────────────────────────────────
export const getAnnouncements   = ()        => api.get('/announcements').then(r => r.data)
export const createAnnouncement = (text)    => api.post('/announcements', { text }).then(r => r.data)
export const updateAnnouncement = (i, text) => api.put(`/announcements/${i}`, { text }).then(r => r.data)
export const deleteAnnouncement = (i)       => api.delete(`/announcements/${i}`).then(r => r.data)

// ─── Contact ──────────────────────────────────────────────
export const getContact            = ()     => api.get('/contact').then(r => r.data)
export const updateContact         = (body) => api.put('/contact', body).then(r => r.data)
export const sendContactMessage    = (body) => api.post('/contact/message', body).then(r => r.data)
export const getContactMessages    = ()     => api.get('/contact/messages').then(r => r.data)
export const markMessageRead       = (id)   => api.put(`/contact/messages/${id}/read`).then(r => r.data)
export const deleteContactMessage  = (id)   => api.delete(`/contact/messages/${id}`).then(r => r.data)

// ─── Featured Products (Locks & Accessories carousel) ─────
export const getFeaturedProducts      = ()             => api.get('/featured-products').then(r => r.data)
export const getFeaturedProductBySlug = (slug)         => api.get(`/featured-products/${slug}`).then(r => r.data)
export const createFeaturedProduct    = (formData)     => api.post('/featured-products', formData).then(r => r.data)
export const updateFeaturedProduct    = (id, formData) => api.put(`/featured-products/${id}`, formData).then(r => r.data)
export const deleteFeaturedProduct    = (id)           => api.delete(`/featured-products/${id}`).then(r => r.data)

// ─── Become Distributor ───────────────────────────────────
export const getBecomeDistributorContent    = ()     => api.get('/become-distributor/content').then(r => r.data)
export const updateBecomeDistributorContent = (body) => api.put('/become-distributor/content', body).then(r => r.data)
export const submitDistributorApplication   = (body) => api.post('/become-distributor/apply', body).then(r => r.data)
export const getDistributorApplications     = ()     => api.get('/become-distributor/applications').then(r => r.data)
export const markDistributorAppRead         = (id)   => api.put(`/become-distributor/applications/${id}/read`).then(r => r.data)
export const deleteDistributorApp           = (id)   => api.delete(`/become-distributor/applications/${id}`).then(r => r.data)

// ─── Projects ─────────────────────────────────────────────
export const getProjects   = ()   => api.get('/projects').then(r => r.data)
export const createProject = (fd) => {
  const token = localStorage.getItem('slyder_admin_token')
  return axios.post(`${import.meta.env.VITE_API_URL || 'https://slyderind.onrender.com/api'}/projects`, fd, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.data)
}
export const deleteProject = (id) => api.delete(`/projects/${id}`).then(r => r.data)

// ─── Distributor Network ──────────────────────────────────
export const getDistributor    = ()   => api.get('/distributor').then(r => r.data)
export const updateDistributor = (fd) => {
  const token = localStorage.getItem('slyder_admin_token')
  return axios.put(`${import.meta.env.VITE_API_URL || 'https://slyderind.onrender.com/api'}/distributor`, fd, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.data)
}
export const getAboutSections   = ()         => api.get('/about/sections').then(r => r.data)
export const createAboutSection = (body)     => api.post('/about/sections', body).then(r => r.data)
export const updateAboutSection = (id, body) => api.put(`/about/sections/${id}`, body).then(r => r.data)
export const deleteAboutSection = (id)       => api.delete(`/about/sections/${id}`).then(r => r.data)

export const getAboutFounder   = ()   => api.get('/about/founder').then(r => r.data)
export const updateAboutFounder= (fd) => {
  const token = localStorage.getItem('slyder_admin_token')
  return axios.put(`${import.meta.env.VITE_API_URL || 'https://slyderind.onrender.com/api'}/about/founder`, fd, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.data)
}

export const getOrgItems    = ()         => api.get('/about/org').then(r => r.data)
export const createOrgItem  = (body)     => api.post('/about/org', body).then(r => r.data)
export const updateOrgItem  = (id, body) => api.put(`/about/org/${id}`, body).then(r => r.data)
export const deleteOrgItem  = (id)       => api.delete(`/about/org/${id}`).then(r => r.data)
export const getHotels   = ()             => api.get('/hotels').then(r => r.data)
export const createHotel = (formData)     => api.post('/hotels', formData).then(r => r.data)
export const updateHotel = (id, formData) => api.put(`/hotels/${id}`, formData).then(r => r.data)
export const deleteHotel = (id)           => api.delete(`/hotels/${id}`).then(r => r.data)

// ─── Videos ───────────────────────────────────────────────
// ─── About Slyder Section ─────────────────────────────────
export const getAboutSlyderContent    = ()     => api.get('/about-slyder').then(r => r.data)
export const updateAboutSlyderContent = (body) => api.put('/about-slyder', body).then(r => r.data)

export const getVideos   = ()             => api.get('/videos').then(r => r.data)
export const createVideo = (formData)     => api.post('/videos', formData).then(r => r.data)
export const updateVideo = (id, formData) => api.put(`/videos/${id}`, formData).then(r => r.data)
export const deleteVideo = (id)           => api.delete(`/videos/${id}`).then(r => r.data)
