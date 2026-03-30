import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Check, ImageIcon } from 'lucide-react'
import { getDistributor, updateDistributor } from '../api'

const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api$/, '')
const inp = 'w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500'
const ta  = `${inp} resize-y`

function Modal({ onClose, initial, onSaved }) {
  const [form, setForm] = useState({ title: initial?.title || '', description: initial?.description || '' })
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(initial?.image ? `${BASE_URL}/uploads/distributor/${initial.image}` : null)
  const [error, setError] = useState('')

  const handleFile = (e) => {
    const f = e.target.files[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const handleSave = async () => {
    if (!form.title.trim()) return setError('Title is required')
    try {
      setError('')
      const fd = new FormData()
      fd.append('title', form.title)
      fd.append('description', form.description)
      if (file) fd.append('image', file)
      await updateDistributor(fd)
      onSaved()
      onClose()
    } catch (e) {
      setError(e.response?.data?.error || 'Failed to save')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
          <h2 className="text-xl font-extrabold text-gray-900">{initial?._id ? 'Edit Content' : 'Add Content'}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={20} className="text-gray-500" /></button>
        </div>
        <div className="px-8 py-6 flex flex-col gap-5">
          {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-3 py-2">{error}</div>}
          <div>
            <label className="block text-sm font-extrabold text-gray-900 mb-2">Title *</label>
            <input className={inp} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Nationwide Training Programs" />
          </div>
          <div>
            <label className="block text-sm font-extrabold text-gray-900 mb-2">Description</label>
            <textarea className={ta} rows={7} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Section description..." />
          </div>
          <div>
            <label className="block text-sm font-extrabold text-gray-900 mb-2">Map / Image</label>
            <label className="flex items-center gap-3 px-4 py-3 border border-gray-200 hover:border-[#159c48] rounded-xl cursor-pointer transition-colors bg-gray-50">
              <ImageIcon size={17} className="text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-500 truncate">{file ? file.name : 'Click to upload image'}</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
            </label>
            {preview && <img src={preview} alt="Preview" className="mt-3 h-48 object-contain rounded-xl border border-gray-200" />}
          </div>
        </div>
        <div className="flex justify-end gap-3 px-8 py-5 border-t border-gray-100">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">Cancel</button>
          <button onClick={handleSave} className="flex items-center gap-1.5 px-6 py-2.5 bg-[#159c48] hover:bg-[#117a38] text-white text-sm font-bold rounded-lg transition-colors">
            <Check size={14} /> Save
          </button>
        </div>
      </div>
    </div>
  )
}

function AdminDistributor() {
  const [data, setData] = useState(null)
  const [modal, setModal] = useState(false)

  const load = () => {
    getDistributor().then(d => { if (d?.title) setData(d) }).catch(() => {})
  }

  useEffect(() => { load() }, [])

  const handleDelete = async () => {
    if (!confirm('Clear this content?')) return
    try {
      await updateDistributor((() => { const fd = new FormData(); fd.append('title', ''); fd.append('description', ''); return fd })())
      setData(null)
    } catch {}
  }

  return (
    <div className="p-10">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Distributor Network</h1>
        <p className="text-sm text-gray-500 mt-1">Manage the Distributor Network page content</p>
      </div>

      {modal && <Modal onClose={() => setModal(false)} initial={data} onSaved={load} />}

      {!data ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 rounded-2xl">
          <p className="text-gray-400 text-sm mb-4">No content yet</p>
          <button onClick={() => setModal(true)} className="flex items-center gap-2 px-5 py-2.5 bg-[#159c48] hover:bg-[#117a38] text-white text-sm font-bold rounded-xl transition-colors">
            <Plus size={16} /> Add Content
          </button>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-start gap-6 p-6">
            {data.image && (
              <img src={`${BASE_URL}/uploads/distributor/${data.image}`} alt="Map" className="w-32 h-32 object-contain rounded-xl border border-gray-100 flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-base font-extrabold text-gray-900 mb-1">{data.title}</p>
              {data.description && <p className="text-sm text-gray-500 line-clamp-3">{data.description}</p>}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => setModal(true)} className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-colors">
                <Pencil size={13} /> Edit
              </button>
              <button onClick={handleDelete} className="flex items-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-500 text-xs font-semibold rounded-lg transition-colors">
                <Trash2 size={13} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDistributor
