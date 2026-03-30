import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Check, ImageIcon, Star } from 'lucide-react'
import { getStarClients, createStarClient, updateStarClient, deleteStarClient } from '../api'

const BASE_URL = (import.meta.env.VITE_API_URL || 'https://slyderind.onrender.com/api').replace(/\/api$/, '')
const imgSrc = (filename) => `${BASE_URL}/uploads/star-clients/${filename}`

function Modal({ title, file, setFile, preview, setPreview, onSubmit, onClose, error, submitting }) {
  const handleFile = (e) => {
    const f = e.target.files[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">

        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
          <h2 className="text-xl font-extrabold text-gray-900">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="px-8 py-6 flex flex-col gap-5">
          {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-3 py-2">{error}</div>}

          <div>
            <label className="block text-sm font-extrabold text-gray-900 mb-2">Logo / Image</label>
            <label className="flex items-center gap-3 px-4 py-3 border border-gray-200 hover:border-[#159c48] rounded-xl cursor-pointer transition-colors bg-gray-50">
              <ImageIcon size={17} className="text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-500 truncate">{file ? file.name : 'Click to upload (JPG, PNG, WebP — max 5MB)'}</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
            </label>
            {preview && <img src={preview} alt="Preview" className="mt-3 h-40 w-full object-contain rounded-xl border border-gray-200 bg-gray-50" />}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-gray-100">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            Cancel
          </button>
          <button onClick={onSubmit} disabled={submitting}
            className="flex items-center gap-1.5 px-6 py-2.5 bg-[#159c48] hover:bg-[#117a38] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold rounded-lg transition-colors">
            <Check size={14} /> {submitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}

function AdminStarClients() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const load = async () => {
    try { setItems(await getStarClients()) }
    catch { setItems([]) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const buildFD = () => {
    const fd = new FormData()
    if (file) fd.append('image', file)
    return fd
  }

  const reset = () => { setFile(null); setPreview(null); setError(''); setSubmitting(false) }

  const openAdd = () => { reset(); setModal('add') }

  const openEdit = (item) => {
    setEditingId(item._id)
    setFile(null)
    setPreview(item.image ? imgSrc(item.image) : null)
    setError('')
    setModal('edit')
  }

  const closeModal = () => { setModal(null); reset() }

  const handleAdd = async () => {
    if (submitting) return
    setSubmitting(true)
    try { await createStarClient(buildFD()); closeModal(); load() }
    catch { setError('Failed to create client'); setSubmitting(false) }
  }

  const handleUpdate = async () => {
    if (submitting) return
    setSubmitting(true)
    try { await updateStarClient(editingId, buildFD()); closeModal(); load() }
    catch { setError('Failed to update client'); setSubmitting(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this client?')) return
    try { await deleteStarClient(id); load() }
    catch { alert('Failed to delete') }
  }

  return (
    <div className="p-10">

      {modal && (
        <Modal
          title={modal === 'add' ? 'Add Star Client' : 'Edit Star Client'}
          file={file} setFile={setFile}
          preview={preview} setPreview={setPreview}
          onSubmit={modal === 'add' ? handleAdd : handleUpdate}
          onClose={closeModal}
          error={error}
          submitting={submitting}
        />
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Star Clients</h1>
          <p className="text-sm text-gray-500 mt-1">Manage the "Our Star Clients" marquee on the homepage</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#159c48] hover:bg-[#117a38] text-white text-sm font-bold rounded-xl transition-colors">
          <Plus size={16} /> Add Client
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">Loading...</p>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map(item => (
            <div key={item._id} className="bg-white border border-gray-200 rounded-xl px-6 py-4 flex items-center gap-4 shadow-sm">
              {item.image
                ? <img src={imgSrc(item.image)} alt={item.name} className="w-24 h-14 object-contain rounded-lg border border-gray-200 flex-shrink-0 bg-gray-50" />
                : <div className="w-24 h-14 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0"><Star size={20} className="text-gray-400" /></div>
              }
              <div className="flex-1 min-w-0">
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => openEdit(item)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-colors">
                  <Pencil size={13} /> Edit
                </button>
                <button onClick={() => handleDelete(item._id)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-500 text-xs font-semibold rounded-lg transition-colors">
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
              <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-2xl flex items-center justify-center mb-4">
                <Star size={28} className="text-[#159c48]" />
              </div>
              <h3 className="text-base font-bold text-gray-800 mb-1">No star clients yet</h3>
              <p className="text-sm text-gray-400 mb-5">Add clients to display in the marquee on the homepage</p>
              <button onClick={openAdd}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#159c48] hover:bg-[#117a38] text-white text-sm font-bold rounded-xl transition-colors">
                <Plus size={15} /> Add Your First Client
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminStarClients
