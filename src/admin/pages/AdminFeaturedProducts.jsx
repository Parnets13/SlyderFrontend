import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Check, ImageIcon, PlusCircle, MinusCircle } from 'lucide-react'
import { getFeaturedProducts, createFeaturedProduct, updateFeaturedProduct, deleteFeaturedProduct } from '../api'

const API_URL = (import.meta.env.VITE_API_URL || 'https://slyderind.onrender.com/api').replace('/api', '')
const imgSrc = (filename) => `${API_URL}/uploads/featured/${filename}`

const BLANK = { name: '', descType: 'bullets', description: [''], specs: [{ spec: '', desc: '' }] }
const inp = 'w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500'

function Modal({ title, form, setForm, file, setFile, preview, setPreview, onSubmit, onClose, error }) {
  const handleFile = (e) => {
    const f = e.target.files[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const setDesc = (i, val) => {
    const d = [...form.description]; d[i] = val; setForm({ ...form, description: d })
  }
  const addDesc = () => setForm({ ...form, description: [...form.description, ''] })
  const removeDesc = (i) => setForm({ ...form, description: form.description.filter((_, idx) => idx !== i) })

  const setSpec = (i, key, val) => {
    const s = form.specs.map((r, idx) => idx === i ? { ...r, [key]: val } : r)
    setForm({ ...form, specs: s })
  }
  const addSpec = () => setForm({ ...form, specs: [...form.specs, { spec: '', desc: '' }] })
  const removeSpec = (i) => setForm({ ...form, specs: form.specs.filter((_, idx) => idx !== i) })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-xl font-extrabold text-gray-900">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-6 flex flex-col gap-5 overflow-y-auto">
          {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-3 py-2">{error}</div>}

          <div>
              <label className="block text-sm font-extrabold text-gray-900 mb-2">Product Name *</label>
              <input className={inp} value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Slyder Hotel Lock" />
            </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-extrabold text-gray-900 mb-2">Product Image</label>
            <label className="flex items-center gap-3 px-4 py-3 border border-gray-200 hover:border-[#159c48] rounded-xl cursor-pointer transition-colors bg-gray-50">
              <ImageIcon size={17} className="text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-500 truncate">{file ? file.name : 'Click to upload (JPG, PNG, WebP — max 5MB)'}</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
            </label>
            {preview && <img src={preview} alt="Preview" className="mt-3 h-40 w-full object-cover rounded-xl border border-gray-200" />}
          </div>

          {/* Description type */}
          <div>
            <label className="block text-sm font-extrabold text-gray-900 mb-2">Description Type</label>
            <div className="flex gap-4">
              {['bullets', 'table'].map(t => (
                <label key={t} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="descType" value={t} checked={form.descType === t}
                    onChange={() => setForm({ ...form, descType: t })} className="accent-[#159c48]" />
                  <span className="text-sm font-semibold text-gray-700 capitalize">{t === 'bullets' ? 'Bullet Points' : 'Spec Table'}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Bullets */}
          {form.descType === 'bullets' && (
            <div>
              <label className="block text-sm font-extrabold text-gray-900 mb-2">Features / Description</label>
              <div className="flex flex-col gap-2">
                {form.description.map((d, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input className={inp} value={d} onChange={e => setDesc(i, e.target.value)} placeholder={`Feature ${i + 1}`} />
                    <button onClick={() => removeDesc(i)} className="text-red-400 hover:text-red-600 flex-shrink-0"><MinusCircle size={18} /></button>
                  </div>
                ))}
                <button onClick={addDesc} className="flex items-center gap-1.5 text-sm text-[#159c48] font-semibold mt-1 w-fit">
                  <PlusCircle size={16} /> Add Feature
                </button>
              </div>
            </div>
          )}

          {/* Specs table */}
          {form.descType === 'table' && (
            <div>
              <label className="block text-sm font-extrabold text-gray-900 mb-2">Specifications</label>
              <div className="flex flex-col gap-2">
                {form.specs.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input className={inp} value={s.spec} onChange={e => setSpec(i, 'spec', e.target.value)} placeholder="Spec name" />
                    <input className={inp} value={s.desc} onChange={e => setSpec(i, 'desc', e.target.value)} placeholder="Value" />
                    <button onClick={() => removeSpec(i)} className="text-red-400 hover:text-red-600 flex-shrink-0"><MinusCircle size={18} /></button>
                  </div>
                ))}
                <button onClick={addSpec} className="flex items-center gap-1.5 text-sm text-[#159c48] font-semibold mt-1 w-fit">
                  <PlusCircle size={16} /> Add Row
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-gray-100 flex-shrink-0">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">Cancel</button>
          <button onClick={onSubmit} className="flex items-center gap-1.5 px-6 py-2.5 bg-[#159c48] hover:bg-[#117a38] text-white text-sm font-bold rounded-lg transition-colors">
            <Check size={14} /> Save
          </button>
        </div>
      </div>
    </div>
  )
}

function AdminFeaturedProducts() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(BLANK)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState('')

  const load = async () => {
    try { setItems(await getFeaturedProducts()) }
    catch { setItems([]) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const buildFD = () => {
    const fd = new FormData()
    fd.append('name', form.name)
    fd.append('descType', form.descType)
    fd.append('description', JSON.stringify(form.description.filter(Boolean)))
    fd.append('specs', JSON.stringify(form.specs.filter(s => s.spec)))
    if (file) fd.append('image', file)
    return fd
  }

  const reset = () => { setForm(BLANK); setFile(null); setPreview(null); setError('') }
  const openAdd = () => { reset(); setModal('add') }

  const openEdit = (item) => {
    setEditingId(item._id)
    setForm({
      name: item.name,
      descType: item.descType || 'bullets',
      description: item.description?.length ? item.description : [''],
      specs: item.specs?.length ? item.specs : [{ spec: '', desc: '' }],
    })
    setFile(null)
    setPreview(item.image ? imgSrc(item.image) : null)
    setError('')
    setModal('edit')
  }

  const closeModal = () => { setModal(null); reset() }

  const handleAdd = async () => {
    if (!form.name.trim()) return setError('Product name is required')
    try { await createFeaturedProduct(buildFD()); closeModal(); load() }
    catch (e) { setError(e?.response?.data?.error || 'Failed to create product') }
  }

  const handleUpdate = async () => {
    if (!form.name.trim()) return setError('Product name is required')
    try { await updateFeaturedProduct(editingId, buildFD()); closeModal(); load() }
    catch (e) { setError(e?.response?.data?.error || 'Failed to update product') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return
    try { await deleteFeaturedProduct(id); load() }
    catch { alert('Failed to delete product') }
  }

  return (
    <div className="p-10">
      {modal && (
        <Modal
          title={modal === 'add' ? 'Add Product' : 'Edit Product'}
          form={form} setForm={setForm}
          file={file} setFile={setFile}
          preview={preview} setPreview={setPreview}
          onSubmit={modal === 'add' ? handleAdd : handleUpdate}
          onClose={closeModal}
          error={error}
        />
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Locks &amp; Accessories</h1>
          <p className="text-sm text-gray-500 mt-1">Manage the product catalog and homepage carousel</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#159c48] hover:bg-[#117a38] text-white text-sm font-bold rounded-xl transition-colors">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">Loading...</p>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map(item => (
            <div key={item._id} className="bg-white border border-gray-200 rounded-xl px-6 py-4 flex items-center gap-4 shadow-sm">
              {item.image
                ? <img src={imgSrc(item.image)} alt={item.name} className="w-16 h-12 object-cover rounded-lg border border-gray-200 flex-shrink-0" />
                : <div className="w-16 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0"><ImageIcon size={18} className="text-gray-400" /></div>
              }
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">{item.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.descType === 'table' ? 'Specs Table' : 'Bullet List'}</p>
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
                <ImageIcon size={28} className="text-[#159c48]" />
              </div>
              <h3 className="text-base font-bold text-gray-800 mb-1">No products yet</h3>
              <p className="text-sm text-gray-400 mb-5">Add your first product to display in the catalog</p>
              <button onClick={openAdd}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#159c48] hover:bg-[#117a38] text-white text-sm font-bold rounded-xl transition-colors">
                <Plus size={15} /> Add Your First Product
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminFeaturedProducts
