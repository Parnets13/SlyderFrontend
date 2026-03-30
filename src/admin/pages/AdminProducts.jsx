import { useState, useEffect } from 'react'
import { Pencil, Trash2, Plus, X, Check, ImageIcon } from 'lucide-react'
import { getFeaturedProducts, createFeaturedProduct, updateFeaturedProduct, deleteFeaturedProduct } from '../api'

const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '')
const imgSrc = (filename) => `${BASE_URL}/uploads/featured/${filename}`

const inp = 'w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500'
const ta  = `${inp} resize-y min-h-[100px]`

const BLANK = { name: '', descType: 'bullets', descText: '', specsText: '' }

function Modal({ title, form, setForm, file, setFile, preview, setPreview, onSubmit, onClose, error, isEdit }) {
  const handleFile = (e) => {
    const f = e.target.files[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col">

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
              <span className="text-sm text-gray-500 truncate">
                {file ? file.name : isEdit ? 'Click to replace image' : 'Click to upload (JPG, PNG, WebP — max 5MB)'}
              </span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
            </label>
            {preview && <img src={preview} alt="Preview" className="mt-3 h-40 w-full object-cover rounded-xl border border-gray-200" />}
          </div>

          {/* Description type */}
          <div>
            <label className="block text-sm font-extrabold text-gray-900 mb-2">Description Type</label>
            <div className="flex gap-6">
              {['bullets', 'table'].map(t => (
                <label key={t} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="descType" value={t} checked={form.descType === t}
                    onChange={() => setForm({ 
                      ...form, 
                      descType: t,
                      // Initialize with one empty row when switching to table mode
                      specsText: t === 'table' && !form.specsText ? '|' : form.specsText
                    })} className="accent-[#159c48]" />
                  <span className="text-sm font-semibold text-gray-700">{t === 'bullets' ? 'Bullet Points' : 'Specs Table'}</span>
                </label>
              ))}
            </div>
          </div>

          {form.descType === 'bullets' ? (
            <div>
              <label className="block text-sm font-extrabold text-gray-900 mb-2">Features <span className="font-normal text-gray-400">(one per line)</span></label>
              <textarea className={ta} value={form.descText}
                onChange={e => setForm({ ...form, descText: e.target.value })}
                placeholder={"RFID Mifare card technology\nDurable zinc alloy body\nLow battery indicator"} />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-extrabold text-gray-900 mb-2">Specifications</label>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-[200px_1fr] bg-gray-50 border-b border-gray-200">
                  <div className="px-4 py-2.5 text-sm font-extrabold text-gray-900 border-r border-gray-200">Specification</div>
                  <div className="px-4 py-2.5 text-sm font-extrabold text-gray-900">Description</div>
                </div>
                
                {/* Table Rows */}
                <div className="divide-y divide-gray-200">
                  {form.specsText.split('\n').filter(Boolean).map((line, idx) => {
                    const [spec, ...rest] = line.split('|')
                    const desc = rest.join('|')
                    return (
                      <div key={idx} className="grid grid-cols-[200px_1fr]">
                        <input
                          className="px-4 py-2.5 text-sm border-r border-gray-200 bg-white text-gray-900 outline-none focus:bg-blue-50"
                          value={spec}
                          onChange={e => {
                            const lines = form.specsText.split('\n')
                            lines[idx] = `${e.target.value}|${desc}`
                            setForm({ ...form, specsText: lines.join('\n') })
                          }}
                          placeholder="e.g. Application Card"
                        />
                        <input
                          className="px-4 py-2.5 text-sm bg-white text-gray-900 outline-none focus:bg-blue-50"
                          value={desc}
                          onChange={e => {
                            const lines = form.specsText.split('\n')
                            lines[idx] = `${spec}|${e.target.value}`
                            setForm({ ...form, specsText: lines.join('\n') })
                          }}
                          placeholder="e.g. Philips Mifare cards of 13.5 MHz frequency"
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
              
              {/* Add Row Button */}
              <button
                type="button"
                onClick={() => setForm({ ...form, specsText: form.specsText + (form.specsText ? '\n' : '') + '|' })}
                className="mt-3 flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-[#159c48] hover:bg-green-50 border border-gray-200 hover:border-[#159c48] rounded-lg transition-colors"
              >
                <Plus size={14} /> Add Row
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-gray-100 flex-shrink-0">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">Cancel</button>
          <button onClick={onSubmit} className="flex items-center gap-1.5 px-6 py-2.5 bg-[#159c48] hover:bg-[#117a38] text-white text-sm font-bold rounded-lg transition-colors">
            <Check size={14} /> Save Product
          </button>
        </div>
      </div>
    </div>
  )
}

function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null) // null | 'add' | 'edit'
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(BLANK)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState('')

  const load = async () => {
    try { setProducts(await getFeaturedProducts()) }
    catch { setProducts([]) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const buildFD = () => {
    const fd = new FormData()
    fd.append('name', form.name)
    fd.append('descType', form.descType)
    const description = form.descType === 'bullets'
      ? form.descText.split('\n').map(s => s.trim()).filter(Boolean)
      : []
    const specs = form.descType === 'table'
      ? form.specsText.split('\n').filter(Boolean).map(line => {
          const [spec, ...rest] = line.split('|')
          return { spec: spec.trim(), desc: rest.join('|').trim() }
        })
      : []
    fd.append('description', JSON.stringify(description))
    fd.append('specs', JSON.stringify(specs))
    if (file) fd.append('image', file)
    return fd
  }

  const reset = () => { setForm(BLANK); setFile(null); setPreview(null); setError('') }

  const openAdd = () => { reset(); setModal('add') }

  const openEdit = (p) => {
    setEditingId(p._id)
    setForm({
      name: p.name,
      descType: p.descType || 'bullets',
      descText: (p.description || []).join('\n'),
      specsText: (p.specs || []).map(s => `${s.spec}|${s.desc}`).join('\n'),
    })
    setFile(null)
    setPreview(p.image ? imgSrc(p.image) : null)
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
    catch { alert('Failed to delete') }
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
          isEdit={modal === 'edit'}
        />
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500 mt-1">{products.length} products</p>
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
          {products.map(p => (
            <div key={p._id} className="bg-white border border-gray-200 rounded-xl px-6 py-4 flex items-center gap-4 shadow-sm">
              {p.image
                ? <img src={imgSrc(p.image)} alt={p.name} className="w-16 h-16 object-cover rounded-lg border border-gray-200 flex-shrink-0" />
                : <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0"><ImageIcon size={18} className="text-gray-400" /></div>
              }
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">{p.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {p.descType === 'table' ? 'Specs Table' : 'Bullet List'}
                  {' · '}{p.descType === 'bullets' ? `${(p.description || []).length} features` : `${(p.specs || []).length} specs`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => openEdit(p)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-colors">
                  <Pencil size={13} /> Edit
                </button>
                <button onClick={() => handleDelete(p._id)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-500 text-xs font-semibold rounded-lg transition-colors">
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          ))}

          {products.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
              <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-2xl flex items-center justify-center mb-4">
                <ImageIcon size={28} className="text-[#159c48]" />
              </div>
              <h3 className="text-base font-bold text-gray-800 mb-1">No products yet</h3>
              <p className="text-sm text-gray-400 mb-5">Add your first product to the catalog</p>
              <button onClick={openAdd}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#159c48] hover:bg-[#117a38] text-white text-sm font-bold rounded-xl transition-colors">
                <Plus size={15} /> Add Product
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminProducts
