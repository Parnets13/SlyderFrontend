import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react'
import * as Icons from 'lucide-react'

const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/api$/, '') || 'https://slyderind.in'

// Available icons from lucide-react
const availableIcons = [
  'Shield', 'Award', 'Headphones', 'Zap', 'Globe', 'TrendingUp',
  'Lock', 'Star', 'Heart', 'CheckCircle', 'Users', 'Smartphone',
  'Wifi', 'Clock', 'DollarSign', 'Settings', 'Package', 'Truck',
  'ThumbsUp', 'Target', 'Lightbulb', 'Rocket', 'Crown', 'Gift'
]

const colorOptions = [
  { name: 'Green', value: '#159c48' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Indigo', value: '#6366f1' },
]

function AdminWhyChooseUs() {
  const [features, setFeatures] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Shield',
    color: '#159c48',
    order: 0,
    isActive: true,
  })

  useEffect(() => {
    fetchFeatures()
  }, [])

  const fetchFeatures = async () => {
    try {
      const token = localStorage.getItem('slyder_admin_token')
      const res = await fetch(`${BASE_URL}/api/why-choose-us/admin`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (!res.ok) {
        console.error('Failed to fetch features:', res.status)
        setFeatures([])
        return
      }
      
      const data = await res.json()
      if (Array.isArray(data)) {
        setFeatures(data)
      } else {
        setFeatures([])
      }
    } catch (err) {
      console.error('Error fetching features:', err)
      setFeatures([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('slyder_admin_token')
      const url = editingId
        ? `${BASE_URL}/api/why-choose-us/${editingId}`
        : `${BASE_URL}/api/why-choose-us`
      
      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        fetchFeatures()
        resetForm()
        alert(editingId ? 'Feature updated!' : 'Feature created!')
      }
    } catch (err) {
      console.error('Error saving feature:', err)
      alert('Error saving feature')
    }
  }

  const handleEdit = (feature) => {
    setFormData({
      title: feature.title,
      description: feature.description,
      icon: feature.icon,
      color: feature.color,
      order: feature.order,
      isActive: feature.isActive,
    })
    setEditingId(feature._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this feature?')) return
    try {
      const token = localStorage.getItem('slyder_admin_token')
      const res = await fetch(`${BASE_URL}/api/why-choose-us/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        fetchFeatures()
        alert('Feature deleted!')
      }
    } catch (err) {
      console.error('Error deleting feature:', err)
      alert('Error deleting feature')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: 'Shield',
      color: '#159c48',
      order: 0,
      isActive: true,
    })
    setEditingId(null)
    setShowForm(false)
  }

  const renderIcon = (iconName, size = 24, color = '#159c48') => {
    const IconComponent = Icons[iconName]
    return IconComponent ? <IconComponent size={size} color={color} /> : null
  }

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>Why Choose Us</h1>
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
          {showForm ? 'Cancel' : 'Add Feature'}
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
            {editingId ? 'Edit Feature' : 'Add New Feature'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gap: 16 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: 8,
                    fontSize: 14,
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={3}
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>
                    Icon
                  </label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: 8,
                      fontSize: 14,
                    }}
                  >
                    {availableIcons.map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                  <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 12, color: '#64748b' }}>Preview:</span>
                    {renderIcon(formData.icon, 24, formData.color)}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>
                    Color
                  </label>
                  <select
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: 8,
                      fontSize: 14,
                    }}
                  >
                    {colorOptions.map(color => (
                      <option key={color.value} value={color.value}>{color.name}</option>
                    ))}
                  </select>
                  <div style={{ marginTop: 8, width: 24, height: 24, borderRadius: 4, background: formData.color }} />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>
                    Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
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

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                  <span style={{ fontWeight: 600, fontSize: 14 }}>Active</span>
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

      {/* Features List */}
      <div style={{ display: 'grid', gap: 16 }}>
        {Array.isArray(features) && features.length > 0 ? (
          features.map((feature) => (
          <div
            key={feature._id}
            style={{
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 12,
                background: `${feature.color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {renderIcon(feature.icon, 32, feature.color)}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{feature.title}</h3>
                {!feature.isActive && (
                  <span style={{
                    padding: '2px 8px',
                    background: '#fef3c7',
                    color: '#92400e',
                    fontSize: 11,
                    fontWeight: 700,
                    borderRadius: 4,
                  }}>
                    Inactive
                  </span>
                )}
                <span style={{
                  padding: '2px 8px',
                  background: '#f1f5f9',
                  color: '#64748b',
                  fontSize: 11,
                  fontWeight: 600,
                  borderRadius: 4,
                }}>
                  Order: {feature.order}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: 14, color: '#64748b', lineHeight: 1.5 }}>
                {feature.description}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <button
                onClick={() => handleEdit(feature)}
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
                onClick={() => handleDelete(feature._id)}
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

        {(!Array.isArray(features) || features.length === 0) && (
          <div style={{
            padding: 60,
            textAlign: 'center',
            background: '#f8fafc',
            borderRadius: 12,
            color: '#64748b',
          }}>
            No features yet. Click "Add Feature" to create one.
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminWhyChooseUs
