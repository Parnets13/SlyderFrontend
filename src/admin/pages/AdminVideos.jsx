import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Check, Video } from 'lucide-react'
import { getVideos, createVideo, updateVideo, deleteVideo } from '../api'

const BLANK = { title: '' }
const inp = 'w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500'
const BASE_URL = (import.meta.env.VITE_API_URL || 'https://slyderind.onrender.com/api').replace(/\/api$/, '')
const videoSrc = (filename) => `${BASE_URL}/uploads/videos/${filename}`

function Modal({ title, form, setForm, file, setFile, onSubmit, onClose, error }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
          <h2 className="text-xl font-extrabold text-gray-900">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-6 flex flex-col gap-5">
          {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-3 py-2">{error}</div>}

          <div>
            <label className="block text-sm font-extrabold text-gray-900 mb-2">Title *</label>
            <input className={inp} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Manufacturing Process" />
          </div>

          <div>
            <label className="block text-sm font-extrabold text-gray-900 mb-2">Video File (MP4, WebM — max 200MB)</label>
            <label className="flex items-center gap-3 px-4 py-3 border border-gray-200 hover:border-[#159c48] rounded-xl cursor-pointer transition-colors bg-gray-50">
              <Video size={17} className="text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-500 truncate">{file ? file.name : 'Click to upload video'}</span>
              <input type="file" accept="video/*" className="hidden" onChange={e => setFile(e.target.files[0] || null)} />
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-gray-100">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            Cancel
          </button>
          <button onClick={onSubmit} className="flex items-center gap-1.5 px-6 py-2.5 bg-[#159c48] hover:bg-[#117a38] text-white text-sm font-bold rounded-lg transition-colors">
            <Check size={14} /> Save
          </button>
        </div>
      </div>
    </div>
  )
}

function AdminVideos() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(BLANK)
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')

  const load = async () => {
    try { setItems(await getVideos()) }
    catch { setItems([]) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const buildFD = () => {
    const fd = new FormData()
    fd.append('title', form.title)
    if (file) fd.append('video', file)
    return fd
  }

  const reset = () => { setForm(BLANK); setFile(null); setError('') }

  const openAdd = () => { reset(); setModal('add') }

  const openEdit = (item) => {
    setEditingId(item._id)
    setForm({ title: item.title })
    setFile(null)
    setError('')
    setModal('edit')
  }

  const closeModal = () => { setModal(null); reset() }

  const handleAdd = async () => {
    if (!form.title.trim()) return setError('Title is required')
    try { await createVideo(buildFD()); closeModal(); load() }
    catch { setError('Failed to upload video') }
  }

  const handleUpdate = async () => {
    if (!form.title.trim()) return setError('Title is required')
    try { await updateVideo(editingId, buildFD()); closeModal(); load() }
    catch { setError('Failed to update video') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this video?')) return
    try { await deleteVideo(id); load() }
    catch { setError('Failed to delete video') }
  }

  return (
    <div className="p-10">

      {modal && (
        <Modal
          title={modal === 'add' ? 'Add Video' : 'Edit Video'}
          form={form} setForm={setForm}
          file={file} setFile={setFile}
          onSubmit={modal === 'add' ? handleAdd : handleUpdate}
          onClose={closeModal}
          error={error}
        />
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Videos</h1>
          <p className="text-sm text-gray-500 mt-1">Manage the homepage video section</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#159c48] hover:bg-[#117a38] text-white text-sm font-bold rounded-xl transition-colors">
          <Plus size={16} /> Add Video
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">Loading...</p>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map(item => (
            <div key={item._id} className="bg-white border border-gray-200 rounded-xl px-6 py-4 flex items-center gap-4 shadow-sm">
              {/* Video thumbnail */}
              <div className="w-24 h-14 bg-gray-900 rounded-lg flex-shrink-0 overflow-hidden">
                {item.filename
                  ? <video src={videoSrc(item.filename)} className="w-full h-full object-cover" muted />
                  : <div className="w-full h-full flex items-center justify-center"><Video size={20} className="text-gray-500" /></div>
                }
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">{item.title}</p>
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
                <Video size={28} className="text-[#159c48]" />
              </div>
              <h3 className="text-base font-bold text-gray-800 mb-1">No videos yet</h3>
              <p className="text-sm text-gray-400 mb-5">Add your first video to display on the homepage</p>
              <button onClick={openAdd}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#159c48] hover:bg-[#117a38] text-white text-sm font-bold rounded-xl transition-colors">
                <Plus size={15} /> Add Your First Video
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminVideos
