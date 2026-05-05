import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react'

const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/api$/, '') || 'https://slyderind.in'

const categories = ['General', 'Products', 'Distributor', 'Technical', 'Installation', 'Support']

function AdminFAQ() {
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'General',
    order: 0,
    isActive: true,
  })

  useEffect(() => {
    fetchFAQs()
  }, [])

  const fetchFAQs = async () => {
    try {
      const token = localStorage.getItem('slyder_admin_token')
      const res = await fetch(`${BASE_URL}/api/faq/admin`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (!res.ok) {
        console.error('Failed to fetch FAQs:', res.status)
        setFaqs([])
        return
      }
      
      const data = await res.json()
      if (Array.isArray(data)) {
        setFaqs(data)
      } else {
        setFaqs([])
      }
    } catch (err) {
      console.error('Error fetching FAQs:', err)
      setFaqs([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('slyder_admin_token')
      const url = editingId
        ? `${BASE_URL}/api/faq/${editingId}`
        : `${BASE_URL}/api/faq`
      
      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        fetchFAQs()
        resetForm()
        alert(editingId ? 'FAQ updated!' : 'FAQ created!')
      }
    } catch (err) {
      console.error('Error saving FAQ:', err)
      alert('Error saving FAQ')
    }
  }

  const handleEdit = (faq) => {
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      order: faq.order,
      isActive: faq.isActive,
    })
    setEditingId(faq._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this FAQ?')) return
    try {
      const token = localStorage.getItem('slyder_admin_token')
      const res = await fetch(`${BASE_URL}/api/faq/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        fetchFAQs()
        alert('FAQ deleted!')
      }
    } catch (err) {
      console.error('Error deleting FAQ:', err)
      alert('Error deleting FAQ')
    }
  }

  const resetForm = () => {
    setFormData({
      question: '',
      answer: '',
      category: 'General',
      order: 0,
      isActive: true,
    })
    setEditingId(null)
    setShowForm(false)
  }

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>FAQ Management</h1>
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
          {showForm ? 'Cancel' : 'Add FAQ'}
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
            {editingId ? 'Edit FAQ' : 'Add New FAQ'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gap: 16 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>
                  Question
                </label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  required
                  placeholder="What is Slyder hotel lock system?"
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
                  Answer
                </label>
                <textarea
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  required
                  rows={5}
                  placeholder="Slyder is a 100% Made in India hotel lock system..."
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
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

      {/* FAQ List */}
      <div style={{ display: 'grid', gap: 16 }}>
        {Array.isArray(faqs) && faqs.length > 0 ? (
          faqs.map((faq) => (
          <div
            key={faq._id}
            style={{
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'start', gap: 20 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <span style={{
                    padding: '4px 12px',
                    background: '#f1f5f9',
                    color: '#64748b',
                    fontSize: 11,
                    fontWeight: 700,
                    borderRadius: 4,
                    textTransform: 'uppercase',
                  }}>
                    {faq.category}
                  </span>
                  {!faq.isActive && (
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
                  <span style={{
                    padding: '4px 12px',
                    background: '#f1f5f9',
                    color: '#64748b',
                    fontSize: 11,
                    fontWeight: 600,
                    borderRadius: 4,
                  }}>
                    Order: {faq.order}
                  </span>
                </div>

                <h3 style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 700, color: '#0f172a' }}>
                  {faq.question}
                </h3>
                <p style={{ margin: 0, fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>
                  {faq.answer}
                </p>
              </div>

              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button
                  onClick={() => handleEdit(faq)}
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
                  onClick={() => handleDelete(faq._id)}
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
          </div>
        ))
        ) : null}

        {(!Array.isArray(faqs) || faqs.length === 0) && (
          <div style={{
            padding: 60,
            textAlign: 'center',
            background: '#f8fafc',
            borderRadius: 12,
            color: '#64748b',
          }}>
            No FAQs yet. Click "Add FAQ" to create one.
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminFAQ
