import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Check, ImageIcon } from 'lucide-react'
import { getBanners, createBanner, updateBanner, deleteBanner } from '../api'

const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'
const imgSrc = (filename) => `${API_URL}/uploads/banners/${filename}`

const BLANK = { title: '', subtitle: '' }

function BannerForm({ form, setForm, file, setFile, preview, setPreview, onSubmit, onCancel }) {
  const handleFile = (e) => {
    const f = e.target.files[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-5">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1.5">Title *</label>
          <input className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="Smart Hotel Lock Solutions" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1.5">Subtitle</label>
          <input className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })}
            placeholder="Secure. Reliable. Made in India." />
        </div>
      </div>

      {/* Image upload */}
      <div className="mb-5 w-1/2">
        <label className="block text-xs font-bold text-gray-500 mb-1.5">Banner Image</label>
        <label className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-300 hover:border-green-500 rounded-xl cursor-pointer transition-colors bg-white">
          <ImageIcon size={18} className="text-gray-400" />
          <span className="text-sm text-gray-500">{file ? file.name : 'Click to upload image (JPG, PNG, WebP — max 5MB)'}</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </label>
        {preview && (
          <img src={preview} alt="Preview" className="mt-3 h-36 w-full object-cover rounded-lg border border-gray-200" />
        )}
      </div>

      <div className="flex gap-3">
        <button onClick={onSubmit} className="flex items-center gap-1.5 px-5 py-2 bg-[#159c48] hover:bg-[#117a38] text-white text-sm font-bold rounded-lg transition-colors">
          <Check size={14} /> Save
        </button>
        <button onClick={onCancel} className="flex items-center gap-1.5 px-5 py-2 bg-white hover:bg-gray-100 text-gray-700 text-sm font-bold border border-gray-200 rounded-lg transition-colors">
          <X size={14} /> Cancel
        </button>
      </div>
    </div>
  )
}

function AdminBanners() {
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(BLANK)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    try { setBanners(await getBanners()) }
    catch { setBanners([]) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const buildFormData = () => {
    const fd = new FormData()
    fd.append('title', form.title)
    fd.append('subtitle', form.subtitle)
    if (file) fd.append('image', file)
    return fd
  }

  const resetForm = () => { setForm(BLANK); setFile(null); setPreview(null) }

  const handleAdd = async () => {
    try { await createBanner(buildFormData()); setAdding(false); resetForm(); load() }
    catch { setError('Failed to create banner') }
  }

  const handleUpdate = async () => {
    try { await updateBanner(editing, buildFormData()); setEditing(null); resetForm(); load() }
    catch { setError('Failed to update banner') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this banner?')) return
    try { await deleteBanner(id); load() }
    catch { setError('Failed to delete banner') }
  }

  const startEdit = (b) => {
    setEditing(b._id)
    setForm({ title: b.title, subtitle: b.subtitle || '' })
    setFile(null)
    setPreview(b.image ? imgSrc(b.image) : null)
    setAdding(false)
  }

  return (
    <div className="p-10">

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Banner Slides</h1>
          <p className="text-sm text-gray-500 mt-1">Manage homepage carousel slides</p>
        </div>
        <button onClick={() => { setAdding(true); setEditing(null); resetForm() }}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#159c48] hover:bg-[#117a38] text-white text-sm font-bold rounded-xl transition-colors">
          <Plus size={16} /> Add Slide
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-medium rounded-xl px-4 py-3 mb-5">{error}</div>}

      {adding && (
        <BannerForm form={form} setForm={setForm} file={file} setFile={setFile}
          preview={preview} setPreview={setPreview}
          onSubmit={handleAdd} onCancel={() => { setAdding(false); resetForm() }} />
      )}

      {loading ? (
        <p className="text-gray-400 text-sm">Loading...</p>
      ) : (
        <div className="flex flex-col gap-3">
          {banners.map(b => (
            <div key={b._id}>
              {editing === b._id ? (
                <BannerForm form={form} setForm={setForm} file={file} setFile={setFile}
                  preview={preview} setPreview={setPreview}
                  onSubmit={handleUpdate} onCancel={() => { setEditing(null); resetForm() }} />
              ) : (
                <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 flex items-center gap-4 shadow-sm">
                  {b.image
                    ? <img src={imgSrc(b.image)} alt={b.title} className="w-16 h-12 object-cover rounded-lg border border-gray-200 flex-shrink-0" />
                    : <div className="w-16 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0"><ImageIcon size={18} className="text-gray-400" /></div>
                  }
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{b.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{b.subtitle || '—'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => startEdit(b)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-colors">
                      <Pencil size={13} /> Edit
                    </button>
                    <button onClick={() => handleDelete(b._id)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-500 text-xs font-semibold rounded-lg transition-colors">
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {banners.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
              <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-2xl flex items-center justify-center mb-4">
                <ImageIcon size={28} className="text-[#159c48]" />
              </div>
              <h3 className="text-base font-bold text-gray-800 mb-1">No banner slides yet</h3>
              <p className="text-sm text-gray-400 mb-5">Add your first banner to display on the homepage carousel</p>
              <button onClick={() => { setAdding(true); setEditing(null); resetForm() }}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#159c48] hover:bg-[#117a38] text-white text-sm font-bold rounded-xl transition-colors">
                <Plus size={15} /> Add Your First Banner
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminBanners
