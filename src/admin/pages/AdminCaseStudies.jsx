import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Save, X, ImageIcon, Eye } from 'lucide-react'

const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/api$/, '') || 'https://slyderind.in'

const categories = ['Hospitality', 'Commercial', 'Residential', 'Healthcare', 'Retail', 'General']

const emptyForm = {
  title: '',
  slug: '',
  client: '',
  shortDescription: '',
  content: '',
  category: 'General',
  result: '',
  isActive: true,
  isFeatured: false,
}

function AdminCaseStudies() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [formData, setFormData] = useState(emptyForm)

  useEffect(() => { fetchItems() }, [])

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem('slyder_admin_token')
      const res = await fetch(`${BASE_URL}/api/case-studies/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error(err)
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const handleTitleChange = (title) => {
    setFormData(prev => ({ ...prev, title, slug: generateSlug(title) }))
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
        ? `${BASE_URL}/api/case-studies/${editingId}`
        : `${BASE_URL}/api/case-studies`

      const fd = new FormData()
      Object.entries(formData).forEach(([k, v]) => fd.append(k, v))
      if (imageFile) fd.append('image', imageFile)

      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      })

      if (res.ok) {
        fetchItems()
        resetForm()
        alert(editingId ? 'Case study updated!' : 'Case study created!')
      } else {
        const err = await res.json()
        alert(err.message || 'Error saving')
      }
    } catch (err) {
      console.error(err)
      alert('Error saving case study')
    }
  }

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      slug: item.slug,
      client: item.client,
      shortDescription: item.shortDescription,
      content: item.content,
      category: item.category,
      result: item.result || '',
      isActive: item.isActive,
      isFeatured: item.isFeatured,
    })
    setImagePreview(`${BASE_URL}/uploads/case-studies/${item.image}`)
    setEditingId(item._id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this case study?')) return
    try {
      const token = localStorage.getItem('slyder_admin_token')
      const res = await fetch(`${BASE_URL}/api/case-studies/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) { fetchItems(); alert('Deleted!') }
    } catch (err) {
      console.error(err)
      alert('Error deleting')
    }
  }

  const resetForm = () => {
    setFormData(emptyForm)
    setImageFile(null)
    setImagePreview(null)
    setEditingId(null)
    setShowForm(false)
  }

  const inputStyle = {
    width: '100%', padding: '10px 12px',
    border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14,
    boxSizing: 'border-box',
  }
  const labelStyle = { display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>

  return (
    <div style={{ padding: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>Case Studies</h1>
        <button
          onClick={() => { setShowForm(!showForm); if (showForm) resetForm() }}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 20px', background: '#159c48', color: '#fff',
            border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600,
          }}
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? 'Cancel' : 'Add Case Study'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 700 }}>
            {editingId ? 'Edit Case Study' : 'Add New Case Study'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gap: 16 }}>

              {/* Image */}
              <div>
                <label style={labelStyle}>Cover Image *</label>
                <label
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 16px', border: '2px dashed #e2e8f0',
                    borderRadius: 8, cursor: 'pointer', transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#159c48'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}
                >
                  <ImageIcon size={20} color="#64748b" />
                  <span style={{ fontSize: 14, color: '#64748b' }}>
                    {imageFile ? imageFile.name : 'Click to upload image (JPG, PNG, WebP)'}
                  </span>
                  <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                </label>
                {imagePreview && (
                  <img src={imagePreview} alt="Preview"
                    style={{ marginTop: 12, width: '100%', maxWidth: 400, height: 200, objectFit: 'cover', borderRadius: 8, border: '1px solid #e2e8f0' }}
                  />
                )}
              </div>

              {/* Title */}
              <div>
                <label style={labelStyle}>Title *</label>
                <input type="text" value={formData.title} onChange={e => handleTitleChange(e.target.value)}
                  required placeholder="Grand Luxury Hotel — Mumbai" style={inputStyle} />
              </div>

              {/* Slug */}
              <div>
                <label style={labelStyle}>Slug (URL) *</label>
                <input type="text" value={formData.slug} onChange={e => setFormData(p => ({ ...p, slug: e.target.value }))}
                  required placeholder="grand-luxury-hotel-mumbai" style={inputStyle} />
              </div>

              {/* Client */}
              <div>
                <label style={labelStyle}>Client Name *</label>
                <input type="text" value={formData.client} onChange={e => setFormData(p => ({ ...p, client: e.target.value }))}
                  required placeholder="Grand Luxury Hotel" style={inputStyle} />
              </div>

              {/* Short Description */}
              <div>
                <label style={labelStyle}>Short Description * (shown on listing card)</label>
                <textarea value={formData.shortDescription} onChange={e => setFormData(p => ({ ...p, shortDescription: e.target.value }))}
                  required rows={2} placeholder="Brief summary shown on the case studies listing page..."
                  style={{ ...inputStyle, resize: 'vertical' }} />
              </div>

              {/* Full Content */}
              <div>
                <label style={labelStyle}>Full Content *</label>
                <textarea value={formData.content} onChange={e => setFormData(p => ({ ...p, content: e.target.value }))}
                  required rows={12} placeholder="Write the full case study here. Use line breaks for paragraphs."
                  style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace' }} />
              </div>

              {/* Result */}
              <div>
                <label style={labelStyle}>Key Result (e.g. "98% reduction in security incidents")</label>
                <input type="text" value={formData.result} onChange={e => setFormData(p => ({ ...p, result: e.target.value }))}
                  placeholder="98% reduction in security incidents" style={inputStyle} />
              </div>

              {/* Category */}
              <div>
                <label style={labelStyle}>Category</label>
                <select value={formData.category} onChange={e => setFormData(p => ({ ...p, category: e.target.value }))} style={inputStyle}>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Toggles */}
              <div style={{ display: 'flex', gap: 24 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="checkbox" checked={formData.isActive} onChange={e => setFormData(p => ({ ...p, isActive: e.target.checked }))} />
                  <span style={{ fontWeight: 600, fontSize: 14 }}>Active</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="checkbox" checked={formData.isFeatured} onChange={e => setFormData(p => ({ ...p, isFeatured: e.target.checked }))} />
                  <span style={{ fontWeight: 600, fontSize: 14 }}>Featured</span>
                </label>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 12 }}>
                <button type="submit" style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '10px 24px', background: '#159c48', color: '#fff',
                  border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600,
                }}>
                  <Save size={18} />
                  {editingId ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={resetForm} style={{
                  padding: '10px 24px', background: '#f1f5f9', color: '#475569',
                  border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600,
                }}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div style={{ display: 'grid', gap: 16 }}>
        {items.length > 0 ? items.map(item => (
          <div key={item._id} style={{
            background: '#fff', border: '1px solid #e2e8f0',
            borderRadius: 12, padding: 20,
            display: 'flex', gap: 20,
          }}>
            <img
              src={`${BASE_URL}/uploads/case-studies/${item.image}`}
              alt={item.title}
              style={{ width: 120, height: 90, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                <span style={{ padding: '3px 10px', background: '#f1f5f9', color: '#64748b', fontSize: 11, fontWeight: 700, borderRadius: 4, textTransform: 'uppercase' }}>
                  {item.category}
                </span>
                {!item.isActive && (
                  <span style={{ padding: '3px 10px', background: '#fef3c7', color: '#92400e', fontSize: 11, fontWeight: 700, borderRadius: 4 }}>Inactive</span>
                )}
                {item.isFeatured && (
                  <span style={{ padding: '3px 10px', background: 'rgba(21,156,72,0.1)', color: '#159c48', fontSize: 11, fontWeight: 700, borderRadius: 4 }}>Featured</span>
                )}
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#94a3b8' }}>
                  <Eye size={12} /> {item.views}
                </span>
              </div>
              <h3 style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 700, color: '#0f172a' }}>{item.title}</h3>
              <p style={{ margin: '0 0 4px', fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>{item.client}</p>
              <p style={{ margin: 0, fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>{item.shortDescription}</p>
              {item.result && (
                <p style={{ margin: '6px 0 0', fontSize: 12, color: '#159c48', fontWeight: 700 }}>&#10003; {item.result}</p>
              )}
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0, alignSelf: 'flex-start' }}>
              <button onClick={() => handleEdit(item)} style={{ padding: '8px 12px', background: '#f1f5f9', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
                <Edit2 size={16} color="#475569" />
              </button>
              <button onClick={() => handleDelete(item._id)} style={{ padding: '8px 12px', background: '#fef2f2', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
                <Trash2 size={16} color="#dc2626" />
              </button>
            </div>
          </div>
        )) : (
          <div style={{ padding: 60, textAlign: 'center', background: '#f8fafc', borderRadius: 12, color: '#64748b' }}>
            No case studies yet. Click "Add Case Study" to create one.
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminCaseStudies
