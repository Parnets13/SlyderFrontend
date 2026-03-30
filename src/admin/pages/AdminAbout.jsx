import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Check, ImageIcon, ChevronDown, ChevronUp } from 'lucide-react'
import {
  getAboutSections, createAboutSection, updateAboutSection, deleteAboutSection,
  getAboutFounder, updateAboutFounder,
  getOrgItems, createOrgItem, updateOrgItem, deleteOrgItem,
} from '../api'

const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api$/, '')
const inp = 'w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500'
const ta  = `${inp} resize-y`

// ── Sections Tab ─────────────────────────────────────────────
function SectionsTab() {
  const [items, setItems] = useState([])
  const [modal, setModal] = useState(null)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState({ heading: '', description: '', points: [] })
  const [error, setError] = useState('')

  const load = async () => { try { setItems(await getAboutSections()) } catch {} }
  useEffect(() => { load() }, [])

  const BLANK = { heading: '', description: '', points: [] }
  const reset = () => { setForm(BLANK); setError('') }

  const openAdd = () => { reset(); setModal('add') }
  const openEdit = (item) => {
    setEditId(item._id)
    setForm({ heading: item.heading, description: item.description || '', points: item.points || [] })
    setError('')
    setModal('edit')
  }
  const closeModal = () => { setModal(null); reset() }

  const addPoint = () => setForm(f => ({ ...f, points: [...f.points, ''] }))
  const updatePoint = (i, val) => setForm(f => { const pts = [...f.points]; pts[i] = val; return { ...f, points: pts } })
  const removePoint = (i) => setForm(f => ({ ...f, points: f.points.filter((_, idx) => idx !== i) }))

  const buildBody = () => ({ heading: form.heading, description: form.description, points: form.points.filter(p => p.trim()) })

  const handleAdd = async () => {
    if (!form.heading.trim()) return setError('Title is required')
    try { await createAboutSection(buildBody()); closeModal(); load() }
    catch (e) { setError(e.response?.data?.error || 'Failed') }
  }
  const handleUpdate = async () => {
    if (!form.heading.trim()) return setError('Title is required')
    try { await updateAboutSection(editId, buildBody()); closeModal(); load() }
    catch { setError('Failed to update') }
  }
  const handleDelete = async (id) => {
    if (!confirm('Delete this section?')) return
    try { await deleteAboutSection(id); load() } catch {}
  }

  return (
    <div>
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
              <h2 className="text-xl font-extrabold text-gray-900">{modal === 'add' ? 'Add Section' : 'Edit Section'}</h2>
              <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={20} className="text-gray-500" /></button>
            </div>
            <div className="px-8 py-6 flex flex-col gap-5">
              {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-3 py-2">{error}</div>}
              <div>
                <label className="block text-sm font-extrabold text-gray-900 mb-2">Title *</label>
                <input className={inp} value={form.heading} onChange={e => setForm({ ...form, heading: e.target.value })} placeholder="Section title" />
              </div>
              {/* Points */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-extrabold text-gray-900">Bullet Points</label>
                  <button onClick={addPoint} className="flex items-center gap-1 px-3 py-1.5 bg-[#159c48] hover:bg-[#117a38] text-white text-xs font-bold rounded-lg transition-colors">
                    <Plus size={13} /> Add Point
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  {form.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm font-bold w-5 text-right flex-shrink-0">{i + 1}.</span>
                      <input
                        className={inp}
                        value={pt}
                        onChange={e => updatePoint(i, e.target.value)}
                        placeholder={`Point ${i + 1}`}
                      />
                      <button onClick={() => removePoint(i)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 flex-shrink-0 transition-colors">
                        <X size={15} />
                      </button>
                    </div>
                  ))}
                  {form.points.length === 0 && (
                    <p className="text-xs text-gray-400 py-2">No points yet. Click "Add Point" to add bullet points.</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 px-8 py-5 border-t border-gray-100">
              <button onClick={closeModal} className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">Cancel</button>
              <button onClick={modal === 'add' ? handleAdd : handleUpdate} className="flex items-center gap-1.5 px-6 py-2.5 bg-[#159c48] hover:bg-[#117a38] text-white text-sm font-bold rounded-lg transition-colors"><Check size={14} /> Save</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end mb-5">
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-[#159c48] hover:bg-[#117a38] text-white text-sm font-bold rounded-xl transition-colors">
          <Plus size={16} /> Add Section
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {items.map(item => (
          <div key={item._id} className="bg-white border border-gray-200 rounded-xl px-6 py-4 flex items-center gap-4 shadow-sm">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{item.heading}</p>
              {item.points?.length > 0 && <p className="text-xs text-gray-400 mt-0.5">{item.points.length} point{item.points.length > 1 ? 's' : ''}</p>}
              {item.description && !item.points?.length && <p className="text-xs text-gray-400 mt-0.5 truncate">{item.description}</p>}
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(item)} className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-colors"><Pencil size={13} /> Edit</button>
              <button onClick={() => handleDelete(item._id)} className="flex items-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-500 text-xs font-semibold rounded-lg transition-colors"><Trash2 size={13} /> Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-gray-400 text-sm text-center py-12">No sections yet. Click "Add Section" to create one.</p>}
      </div>
    </div>
  )
}

// ── Founder Tab ──────────────────────────────────────────────
function FounderTab() {
  const [form, setForm] = useState({ heading: '', subheading: '', bio: '', name: '', role: '' })
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getAboutFounder().then(data => {
      if (data?._id) {
        setForm({ heading: data.heading || '', subheading: data.subheading || '', bio: data.bio || '', name: data.name || '', role: data.role || '' })
        if (data.image) setPreview(`${BASE_URL}/uploads/founder/${data.image}`)
      }
    }).catch(() => {})
  }, [])

  const handleFile = (e) => {
    const f = e.target.files[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const handleSave = async () => {
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      if (file) fd.append('image', file)
      await updateAboutFounder(fd)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch { setError('Failed to save') }
  }

  return (
    <div className="flex flex-col gap-5 max-w-2xl">
      {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-3 py-2">{error}</div>}
      {saved && <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-3 py-2">Saved successfully</div>}

      <div>
        <label className="block text-sm font-extrabold text-gray-900 mb-2">Section Heading</label>
        <input className={inp} value={form.heading} onChange={e => setForm({ ...form, heading: e.target.value })} placeholder="Visionary Founder of Slyder Electronics" />
      </div>
      <div>
        <label className="block text-sm font-extrabold text-gray-900 mb-2">Sub-heading</label>
        <input className={inp} value={form.subheading} onChange={e => setForm({ ...form, subheading: e.target.value })} placeholder="Early Education and Academic Background" />
      </div>
      <div>
        <label className="block text-sm font-extrabold text-gray-900 mb-2">Bio Text</label>
        <textarea className={ta} rows={6} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} placeholder="Founder biography..." />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-extrabold text-gray-900 mb-2">Founder Name</label>
          <input className={inp} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Mr. S. Venkatesh" />
        </div>
        <div>
          <label className="block text-sm font-extrabold text-gray-900 mb-2">Role / Title</label>
          <input className={inp} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="Founder & CEO" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-extrabold text-gray-900 mb-2">Founder Photo</label>
        <label className="flex items-center gap-3 px-4 py-3 border border-gray-200 hover:border-[#159c48] rounded-xl cursor-pointer transition-colors bg-gray-50">
          <ImageIcon size={17} className="text-gray-400 flex-shrink-0" />
          <span className="text-sm text-gray-500 truncate">{file ? file.name : 'Click to upload photo'}</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </label>
        {preview && <img src={preview} alt="Founder" className="mt-3 h-48 w-48 object-cover rounded-xl border border-gray-200" />}
      </div>
      <button onClick={handleSave} className="flex items-center gap-1.5 px-6 py-2.5 bg-[#159c48] hover:bg-[#117a38] text-white text-sm font-bold rounded-lg transition-colors w-fit">
        <Check size={14} /> Save Changes
      </button>
    </div>
  )
}

// ── Org Structure Tab ────────────────────────────────────────
function OrgTab() {
  const [items, setItems] = useState([])
  const [modal, setModal] = useState(null)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState({ heading: '', content: '' })
  const [error, setError] = useState('')

  const load = async () => { try { setItems(await getOrgItems()) } catch {} }
  useEffect(() => { load() }, [])

  const BLANK = { heading: '', content: '' }
  const reset = () => { setForm(BLANK); setError('') }
  const openAdd = () => { reset(); setModal('add') }
  const openEdit = (item) => { setEditId(item._id); setForm({ heading: item.heading, content: item.content || '' }); setError(''); setModal('edit') }
  const closeModal = () => { setModal(null); reset() }

  const handleAdd = async () => {
    if (!form.heading.trim()) return setError('Heading is required')
    try { await createOrgItem({ heading: form.heading, content: form.content, order: 0 }); closeModal(); load() }
    catch { setError('Failed to create') }
  }
  const handleUpdate = async () => {
    if (!form.heading.trim()) return setError('Heading is required')
    try { await updateOrgItem(editId, { heading: form.heading, content: form.content }); closeModal(); load() }
    catch { setError('Failed to update') }
  }
  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return
    try { await deleteOrgItem(id); load() } catch {}
  }

  return (
    <div>
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
            <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
              <h2 className="text-xl font-extrabold text-gray-900">{modal === 'add' ? 'Add Org Item' : 'Edit Org Item'}</h2>
              <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={20} className="text-gray-500" /></button>
            </div>
            <div className="px-8 py-6 flex flex-col gap-4">
              {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-3 py-2">{error}</div>}
              <div>
                <label className="block text-sm font-extrabold text-gray-900 mb-2">Heading *</label>
                <input className={inp} value={form.heading} onChange={e => setForm({ ...form, heading: e.target.value })} placeholder="e.g. Founder and CEO" />
              </div>
              <div>
                <label className="block text-sm font-extrabold text-gray-900 mb-2">Description</label>
                <textarea className={ta} rows={4} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Role description..." />
              </div>
            </div>
            <div className="flex justify-end gap-3 px-8 py-5 border-t border-gray-100">
              <button onClick={closeModal} className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">Cancel</button>
              <button onClick={modal === 'add' ? handleAdd : handleUpdate} className="flex items-center gap-1.5 px-6 py-2.5 bg-[#159c48] hover:bg-[#117a38] text-white text-sm font-bold rounded-lg transition-colors"><Check size={14} /> Save</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end mb-5">
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-[#159c48] hover:bg-[#117a38] text-white text-sm font-bold rounded-xl transition-colors">
          <Plus size={16} /> Add Item
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {items.map(item => (
          <div key={item._id} className="bg-white border border-gray-200 rounded-xl px-6 py-4 flex items-center gap-4 shadow-sm">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{item.heading}</p>
              {item.content && <p className="text-xs text-gray-400 mt-0.5 truncate">{item.content}</p>}
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(item)} className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-colors"><Pencil size={13} /> Edit</button>
              <button onClick={() => handleDelete(item._id)} className="flex items-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-500 text-xs font-semibold rounded-lg transition-colors"><Trash2 size={13} /> Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-gray-400 text-sm text-center py-12">No org items yet.</p>}
      </div>
    </div>
  )
}

// ── Main Page ────────────────────────────────────────────────
const TABS = ['Sections', 'Founder', 'Org Structure']

function AdminAbout() {
  const [tab, setTab] = useState(0)

  return (
    <div className="p-10">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">About Page</h1>
        <p className="text-sm text-gray-500 mt-1">Manage all content on the About page</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-8">
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)}
            className={`px-5 py-2 text-sm font-bold rounded-lg transition-colors ${tab === i ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 0 && <SectionsTab />}
      {tab === 1 && <FounderTab />}
      {tab === 2 && <OrgTab />}
    </div>
  )
}

export default AdminAbout
