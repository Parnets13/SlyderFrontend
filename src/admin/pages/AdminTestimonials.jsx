import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Check, ImageIcon } from 'lucide-react'
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../api'

const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api$/, '')
const inp = 'w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500'
const ta  = `${inp} resize-y`
const BLANK = { role: '', hotel: '', text: '', rating: 5 }

function Modal({ title, form, setForm, file, setFile, preview, setPreview, onSave, onClose, error }) {
  const handleFile = (e) => {
    const f = e.target.files[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
          <h2 className="text-xl font-extrabold text-gray-900">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={20} className="text-gray-500" /></button>
        </div>
        <div className="px-8 py-6 flex flex-col gap-4">
          {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-3 py-2">{error}</div>}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-1.5">Role</label>
            <input className={inp} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="e.g. General Manager" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-1.5">Hotel / Company</label>
            <input className={inp} value={form.hotel} onChange={e => setForm({ ...form, hotel: e.target.value })} placeholder="e.g. Grand Palace Hotel" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-1.5">Rating</label>
            <div className="flex gap-1">
              {[1,2,3,4,5].map(star => (
                <button key={star} type="button" onClick={() => setForm({ ...form, rating: star })}
                  className="text-2xl leading-none transition-transform hover:scale-110 focus:outline-none"
                  style={{ color: star <= form.rating ? '#f59e0b' : '#d1d5db' }}>
                  ★
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-1.5">Testimonial Text *</label>
            <textarea className={ta} rows={4} value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} placeholder="What did they say..." />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-1.5">Profile Picture</label>
            <label className="flex items-center gap-3 px-4 py-3 border border-gray-200 hover:border-[#159c48] rounded-xl cursor-pointer transition-colors bg-gray-50">
              <ImageIcon size={17} className="text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-500 truncate">{file ? file.name : 'Click to upload photo'}</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
            </label>
            {preview && (
              <img src={preview} alt="Preview" className="mt-3 w-16 h-16 rounded-full object-cover border-2 border-gray-200" />
            )}
          </div>
        </div>
        <div className="flex justify-end gap-3 px-8 py-5 border-t border-gray-100">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">Cancel</button>
          <button onClick={onSave} className="flex items-center gap-1.5 px-6 py-2.5 bg-[#159c48] hover:bg-[#117a38] text-white text-sm font-bold rounded-lg transition-colors">
            <Check size={14} /> Save
          </button>
        </div>
      </div>
    </div>
  )
}

function AdminTestimonials() {
  const [items, setItems]     = useState([])
  const [modal, setModal]     = useState(null)
  const [editId, setEditId]   = useState(null)
  const [form, setForm]       = useState(BLANK)
  const [file, setFile]       = useState(null)
  const [preview, setPreview] = useState(null)
  const [error, setError]     = useState('')

  const load = async () => { try { setItems(await getTestimonials()) } catch {} }
  useEffect(() => { load() }, [])

  const reset = () => { setForm(BLANK); setError(''); setFile(null); setPreview(null) }

  const openAdd = () => { reset(); setModal('add') }
  const openEdit = (item) => {
    setEditId(item._id)
    setForm({ role: item.role || '', hotel: item.hotel || '', text: item.text, rating: item.rating ?? 5 })
    setFile(null)
    setPreview(item.image ? `${BASE_URL}/uploads/testimonials/${item.image}` : null)
    setError('')
    setModal('edit')
  }
  const closeModal = () => { setModal(null); reset() }

  const handleSave = async () => {
    if (!form.text.trim()) return setError('Testimonial text is required')
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      if (file) fd.append('image', file)
      modal === 'add' ? await createTestimonial(fd) : await updateTestimonial(editId, fd)
      closeModal()
      load()
    } catch { setError('Failed to save') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return
    try { await deleteTestimonial(id); load() } catch {}
  }

  return (
    <div className="p-10">
      {modal && (
        <Modal
          title={modal === 'add' ? 'Add Testimonial' : 'Edit Testimonial'}
          form={form} setForm={setForm}
          file={file} setFile={setFile}
          preview={preview} setPreview={setPreview}
          onSave={handleSave} onClose={closeModal} error={error}
        />
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Testimonials</h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} testimonial{items.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-[#159c48] hover:bg-[#117a38] text-white text-sm font-bold rounded-xl transition-colors">
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {items.map(item => (
          <div key={item._id} className="bg-white border border-gray-200 rounded-xl px-6 py-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1 min-w-0">
                {item.image
                  ? <img src={`${BASE_URL}/uploads/testimonials/${item.image}`} alt={item.name} className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 flex-shrink-0" />
                  : <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 text-sm font-bold text-gray-500">{item.name?.slice(0,2).toUpperCase()}</div>
                }
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-bold text-gray-900">{item.name}</p>
                    {(item.role || item.hotel) && (
                      <span className="text-xs font-semibold text-[#159c48]">
                        {[item.role, item.hotel].filter(Boolean).join(' · ')}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-0.5 mb-1.5">
                    {[1,2,3,4,5].map(s => (
                      <span key={s} style={{ color: s <= (item.rating ?? 5) ? '#f59e0b' : '#d1d5db', fontSize: 14 }}>★</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">"{item.text}"</p>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => openEdit(item)} className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-colors">
                  <Pencil size={13} /> Edit
                </button>
                <button onClick={() => handleDelete(item._id)} className="flex items-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-500 text-xs font-semibold rounded-lg transition-colors">
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-16">No testimonials yet. Click "Add Testimonial" to create one.</p>
        )}
      </div>
    </div>
  )
}

export default AdminTestimonials
