import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Save, X, ImageIcon, Eye } from 'lucide-react'

const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/api$/, '') || 'https://slyderind.in'

const categories = ['General', 'Security', 'Technology', 'Industry News', 'Product Updates', 'Tips & Guides']

function AdminBlog() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    content: '',
    category: 'General',
    author: 'Slyder Team',
    tags: '',
    isActive: true,
    isFeatured: false,
  })

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem('slyder_admin_token')
      const res = await fetch(`${BASE_URL}/api/blog/admin/all`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (!res.ok) {
        console.error('Failed to fetch blogs:', res.status)
        setBlogs([])
        return
      }
      
      const data = await res.json()
      if (Array.isArray(data)) {
        setBlogs(data)
      } else {
        setBlogs([])
      }
    } catch (err) {
      console.error('Error fetching blogs:', err)
      setBlogs([])
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (title) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title)
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('slyder_admin_token')
      const url = editingId
        ? `${BASE_URL}/api/blog/${editingId}`
        : `${BASE_URL}/api/blog`
      
      const formDataToSend = new FormData()
      formDataToSend.append('title', formData.title)
      formDataToSend.append('slug', formData.slug)
      formDataToSend.append('shortDescription', formData.shortDescription)
      formDataToSend.append('content', formData.content)
      formDataToSend.append('category', formData.category)
      formDataToSend.append('author', formData.author)
      formDataToSend.append('tags', formData.tags)
      formDataToSend.append('isActive', formData.isActive)
      formDataToSend.append('isFeatured', formData.isFeatured)
      
      if (imageFile) {
        formDataToSend.append('image', imageFile)
      }

      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formDataToSend
      })

      if (res.ok) {
        fetchBlogs()
        resetForm()
        alert(editingId ? 'Blog updated!' : 'Blog created!')
      } else {
        const error = await res.json()
        alert(error.message || 'Error saving blog')
      }
    } catch (err) {
      console.error('Error saving blog:', err)
      alert('Error saving blog')
    }
  }

  const handleEdit = async (blog) => {
    setFormData({
      title: blog.title,
      slug: blog.slug,
      shortDescription: blog.shortDescription,
      content: blog.content,
      category: blog.category,
      author: blog.author,
      tags: blog.tags.join(', '),
      isActive: blog.isActive,
      isFeatured: blog.isFeatured,
    })
    setImagePreview(`${BASE_URL}/uploads/blogs/${blog.image}`)
    setEditingId(blog._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog post?')) return
    try {
      const token = localStorage.getItem('slyder_admin_token')
      const res = await fetch(`${BASE_URL}/api/blog/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        fetchBlogs()
        alert('Blog deleted!')
      }
    } catch (err) {
      console.error('Error deleting blog:', err)
      alert('Error deleting blog')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      shortDescription: '',
      content: '',
      category: 'General',
      author: 'Slyder Team',
      tags: '',
      isActive: true,
      isFeatured: false,
    })
    setImageFile(null)
    setImagePreview(null)
    setEditingId(null)
    setShowForm(false)
  }

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>Blog Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 20px',
            background: '#159c48',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? 'Cancel' : 'Add Blog Post'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{
          background: '#fff',
          border: '1px solid #e2e8f0',
          borderRadius: 12,
          padding: 24,
          marginBottom: 24,
        }}>
          <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 700 }}>
            {editingId ? 'Edit Blog Post' : 'Add New Blog Post'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gap: 16 }}>
              {/* Image Upload */}
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>
                  Featured Image *
                </label>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 16px',
                    border: '2px dashed #e2e8f0',
                    borderRadius: 8,
                    cursor: 'pointer',
                    transition: 'border-color 0.2s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#159c48'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}
                >
                  <ImageIcon size={20} color="#64748b" />
                  <span style={{ fontSize: 14, color: '#64748b' }}>
                    {imageFile ? imageFile.name : 'Click to upload image (JPG, PNG, WebP)'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </label>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      marginTop: 12,
                      width: '100%',
                      maxWidth: 400,
                      height: 200,
                      objectFit: 'cover',
                      borderRadius: 8,
                      border: '1px solid #e2e8f0',
                    }}
                  />
                )}
              </div>

              {/* Title */}
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                  placeholder="10 Benefits of Smart Hotel Locks"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: 8,
                    fontSize: 14,
                  }}
                />
              </div>

              {/* Slug */}
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>
                  Slug (URL) *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                  placeholder="10-benefits-of-smart-hotel-locks"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: 8,
                    fontSize: 14,
                  }}
                />
              </div>

              {/* Short Description */}
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>
                  Short Description *
                </label>
                <textarea
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  required
                  rows={2}
                  placeholder="A brief summary that appears on the blog listing page..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: 8,
                    fontSize: 14,
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Content */}
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>
                  Content *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows={12}
                  placeholder="Write your blog content here..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: 8,
                    fontSize: 14,
                    resize: 'vertical',
                    fontFamily: 'monospace',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {/* Category */}
                <div>
                  <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: 8,
                      fontSize: 14,
                    }}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Author */}
                <div>
                  <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Slyder Team"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: 8,
                      fontSize: 14,
                    }}
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="smart locks, RFID, hotel security"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: 8,
                    fontSize: 14,
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: 24 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                  <span style={{ fontWeight: 600, fontSize: 14 }}>Active</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  />
                  <span style={{ fontWeight: 600, fontSize: 14 }}>Featured</span>
                </label>
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  type="submit"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '10px 24px',
                    background: '#159c48',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  <Save size={18} />
                  {editingId ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    padding: '10px 24px',
                    background: '#f1f5f9',
                    color: '#475569',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Blog List */}
      <div style={{ display: 'grid', gap: 16 }}>
        {Array.isArray(blogs) && blogs.length > 0 ? (
          blogs.map((blog) => (
          <div
            key={blog._id}
            style={{
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: 20,
              display: 'flex',
              gap: 20,
            }}
          >
            <img
              src={`${BASE_URL}/uploads/blogs/${blog.image}`}
              alt={blog.title}
              style={{
                width: 120,
                height: 120,
                objectFit: 'cover',
                borderRadius: 8,
                flexShrink: 0,
              }}
            />

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                <span style={{
                  padding: '4px 12px',
                  background: '#f1f5f9',
                  color: '#64748b',
                  fontSize: 11,
                  fontWeight: 700,
                  borderRadius: 4,
                  textTransform: 'uppercase',
                }}>
                  {blog.category}
                </span>
                {!blog.isActive && (
                  <span style={{
                    padding: '4px 12px',
                    background: '#fef3c7',
                    color: '#92400e',
                    fontSize: 11,
                    fontWeight: 700,
                    borderRadius: 4,
                  }}>
                    Inactive
                  </span>
                )}
                {blog.isFeatured && (
                  <span style={{
                    padding: '4px 12px',
                    background: 'rgba(21,156,72,0.1)',
                    color: '#159c48',
                    fontSize: 11,
                    fontWeight: 700,
                    borderRadius: 4,
                  }}>
                    Featured
                  </span>
                )}
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '4px 12px',
                  background: '#f1f5f9',
                  color: '#64748b',
                  fontSize: 11,
                  fontWeight: 600,
                  borderRadius: 4,
                }}>
                  <Eye size={12} />
                  {blog.views}
                </span>
              </div>

              <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 700, color: '#0f172a' }}>
                {blog.title}
              </h3>
              <p style={{ margin: '0 0 8px', fontSize: 14, color: '#64748b', lineHeight: 1.5 }}>
                {blog.shortDescription}
              </p>
              <p style={{ margin: 0, fontSize: 12, color: '#94a3b8' }}>
                By {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 8, flexShrink: 0, alignSelf: 'flex-start' }}>
              <button
                onClick={() => handleEdit(blog)}
                style={{
                  padding: '8px 12px',
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Edit2 size={16} color="#475569" />
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                style={{
                  padding: '8px 12px',
                  background: '#fef2f2',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Trash2 size={16} color="#dc2626" />
              </button>
            </div>
          </div>
        ))
        ) : null}

        {(!Array.isArray(blogs) || blogs.length === 0) && (
          <div style={{
            padding: 60,
            textAlign: 'center',
            background: '#f8fafc',
            borderRadius: 12,
            color: '#64748b',
          }}>
            No blog posts yet. Click "Add Blog Post" to create one.
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminBlog
