import { useState, useEffect, useRef } from 'react'
import { Plus, Trash2, X, Upload, ImageIcon } from 'lucide-react'
import { getProjects, createProject, deleteProject } from '../api'

const BASE_URL = (import.meta.env.VITE_API_URL || 'https://slyderind.onrender.com/api').replace(/\/api$/, '')

function AdminProjects() {
  const [items, setItems] = useState([])
  const [uploading, setUploading] = useState(false)
  const [modal, setModal] = useState(false)
  const [previews, setPreviews] = useState([])
  const [files, setFiles] = useState([])
  const [error, setError] = useState('')
  const inputRef = useRef()

  const load = async () => {
    try { setItems(await getProjects()) } catch {}
  }
  useEffect(() => { load() }, [])

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files)
    if (!selected.length) return
    setFiles(selected)
    setPreviews(selected.map(f => URL.createObjectURL(f)))
    setError('')
  }

  const removePreview = (i) => {
    setFiles(f => f.filter((_, idx) => idx !== i))
    setPreviews(p => p.filter((_, idx) => idx !== i))
  }

  const handleUpload = async () => {
    if (!files.length) return setError('Select at least one image')
    setUploading(true)
    setError('')
    try {
      for (const file of files) {
        const fd = new FormData()
        fd.append('image', file)
        await createProject(fd)
      }
      setModal(false)
      setFiles([])
      setPreviews([])
      load()
    } catch (e) {
      setError(e.response?.data?.error || 'Upload failed')
    } finally { setUploading(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this image?')) return
    try { await deleteProject(id); load() } catch {}
  }

  const closeModal = () => { setModal(false); setFiles([]); setPreviews([]); setError('') }

  return (
    <div className="p-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Projects</h1>
          <p className="text-sm text-gray-500 mt-1">Manage project gallery images</p>
        </div>
        <button onClick={() => setModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#159c48] hover:bg-[#117a38] text-white text-sm font-bold rounded-xl transition-colors">
          <Plus size={16} /> Add Images
        </button>
      </div>

      {/* Upload Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
              <h2 className="text-xl font-extrabold text-gray-900">Add Project Images</h2>
              <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={20} className="text-gray-500" /></button>
            </div>
            <div className="px-8 py-6 flex flex-col gap-5">
              {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-3 py-2">{error}</div>}

              {/* Drop zone */}
              <label
                className="flex flex-col items-center justify-center gap-3 py-10 border-2 border-dashed border-gray-200 hover:border-[#159c48] rounded-xl cursor-pointer transition-colors bg-gray-50"
                onClick={() => inputRef.current?.click()}
              >
                <Upload size={32} className="text-gray-300" />
                <p className="text-sm font-semibold text-gray-500">Click to select images</p>
                <p className="text-xs text-gray-400">JPG, PNG, WEBP — multiple allowed</p>
              </label>
              <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />

              {/* Previews */}
              {previews.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {previews.map((src, i) => (
                    <div key={i} className="relative rounded-xl overflow-hidden border border-gray-200 aspect-square">
                      <img src={src} alt="" className="w-full h-full object-cover" />
                      <button onClick={() => removePreview(i)}
                        className="absolute top-1.5 right-1.5 bg-white rounded-full p-0.5 shadow hover:bg-red-50 transition-colors">
                        <X size={14} className="text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3 px-8 py-5 border-t border-gray-100">
              <button onClick={closeModal} className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">Cancel</button>
              <button onClick={handleUpload} disabled={uploading || !files.length}
                className="flex items-center gap-1.5 px-6 py-2.5 bg-[#159c48] hover:bg-[#117a38] disabled:opacity-50 text-white text-sm font-bold rounded-lg transition-colors">
                <Upload size={14} /> {uploading ? 'Uploading...' : `Upload ${files.length > 0 ? `(${files.length})` : ''}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gallery grid */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 rounded-2xl">
          <ImageIcon size={40} className="text-gray-200 mb-3" />
          <p className="text-gray-400 text-sm">No images yet. Click "Add Images" to upload.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map(item => (
            <div key={item._id} className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-square shadow-sm">
              <img src={`${BASE_URL}/uploads/projects/${item.image}`} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button onClick={() => handleDelete(item._id)}
                  className="p-2 bg-white rounded-full shadow hover:bg-red-50 transition-colors">
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminProjects
