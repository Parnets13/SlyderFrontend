import { useState, useEffect } from 'react'
import { Plus, X, Check, GripVertical, CheckCircle2 } from 'lucide-react'
import { getAboutSlyderContent, updateAboutSlyderContent } from '../api'

const inp = 'w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500'
const ta  = `${inp} resize-y`

const DEFAULT_STATS = [
  { value: '2006', label: 'Established', order: 0 },
  { value: '18+',  label: 'Years of Excellence', order: 1 },
  { value: '100%', label: 'Made in India', order: 2 },
  { value: '#1',   label: 'RFID in India', order: 3 },
]

function AdminAboutSlyder() {
  const [form, setForm] = useState({
    heading: '',
    subheading: '',
    description: '',
    points: [],
    stats: DEFAULT_STATS,
    pioneerTitle: '',
    pioneerText: '',
  })
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getAboutSlyderContent().then(data => {
      if (data) {
        setForm({
          heading:      data.heading      || '',
          subheading:   data.subheading   || '',
          description:  data.description  || '',
          points:       data.points       || [],
          stats:        data.stats?.length ? data.stats : DEFAULT_STATS,
          pioneerTitle: data.pioneerTitle || '',
          pioneerText:  data.pioneerText  || '',
        })
      }
    }).catch(() => {})
  }, [])

  // Points helpers
  const addPoint    = () => setForm(f => ({ ...f, points: [...f.points, ''] }))
  const updatePoint = (i, val) => setForm(f => { const pts = [...f.points]; pts[i] = val; return { ...f, points: pts } })
  const removePoint = (i) => setForm(f => ({ ...f, points: f.points.filter((_, idx) => idx !== i) }))

  // Stats helpers
  const addStat    = () => setForm(f => ({ ...f, stats: [...f.stats, { value: '', label: '', order: f.stats.length }] }))
  const updateStat = (i, key, val) => setForm(f => { const s = [...f.stats]; s[i] = { ...s[i], [key]: val }; return { ...f, stats: s } })
  const removeStat = (i) => setForm(f => ({ ...f, stats: f.stats.filter((_, idx) => idx !== i) }))

  const handleSave = async () => {
    setError('')
    setSaved(false)
    try {
      const payload = {
        ...form,
        points: form.points.filter(p => p.trim()),
        stats: form.stats.map((s, i) => ({ ...s, order: i })),
      }
      await updateAboutSlyderContent(payload)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch { setError('Failed to save changes') }
  }

  return (
    <div className="p-10 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">About Slyder Section</h1>
        <p className="text-sm text-gray-500 mt-1">Manage the "About Slyder" section on the home page</p>
      </div>

      {/* Toast */}
      <div style={{
        position: 'fixed', top: 24, right: 24, zIndex: 9999,
        display: 'flex', flexDirection: 'column', gap: 10, pointerEvents: 'none',
      }}>
        {saved && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: '#0f172a', color: '#fff',
            padding: '12px 18px', borderRadius: 12,
            boxShadow: '0 8px 32px rgba(0,0,0,0.22)',
            fontSize: 14, fontWeight: 600,
            animation: 'toastIn 0.3s ease',
            borderLeft: '4px solid #159c48',
            pointerEvents: 'auto',
          }}>
            <CheckCircle2 size={18} color="#159c48" />
            Changes saved successfully
          </div>
        )}
        {error && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: '#0f172a', color: '#fff',
            padding: '12px 18px', borderRadius: 12,
            boxShadow: '0 8px 32px rgba(0,0,0,0.22)',
            fontSize: 14, fontWeight: 600,
            animation: 'toastIn 0.3s ease',
            borderLeft: '4px solid #ef4444',
            pointerEvents: 'auto',
          }}>
            <X size={18} color="#ef4444" />
            {error}
          </div>
        )}
      </div>
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <div className="flex flex-col gap-6">

        {/* Headings */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
          <h2 className="text-sm font-extrabold text-gray-700 uppercase tracking-wide">Headings</h2>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-1.5">Heading (line 1)</label>
            <input className={inp} value={form.heading} onChange={e => setForm({ ...form, heading: e.target.value })} placeholder="Welcome To" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-1.5">Heading (line 2 — gradient)</label>
            <input className={inp} value={form.subheading} onChange={e => setForm({ ...form, subheading: e.target.value })} placeholder="Slyder Electronics" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-1.5">Description</label>
            <textarea className={ta} rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="About paragraph..." />
          </div>
        </div>

        {/* Bullet Points */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-gray-700 uppercase tracking-wide">Bullet Points</h2>
            <button onClick={addPoint} className="flex items-center gap-1 px-3 py-1.5 bg-[#159c48] hover:bg-[#117a38] text-white text-xs font-bold rounded-lg transition-colors">
              <Plus size={13} /> Add Point
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {form.points.map((pt, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-gray-400 text-sm font-bold w-5 text-right flex-shrink-0">{i + 1}.</span>
                <input className={inp} value={pt} onChange={e => updatePoint(i, e.target.value)} placeholder={`Point ${i + 1}`} />
                <button onClick={() => removePoint(i)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 flex-shrink-0 transition-colors"><X size={15} /></button>
              </div>
            ))}
            {form.points.length === 0 && <p className="text-xs text-gray-400 py-2">No points yet.</p>}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-gray-700 uppercase tracking-wide">Stat Cards</h2>
            <button onClick={addStat} className="flex items-center gap-1 px-3 py-1.5 bg-[#159c48] hover:bg-[#117a38] text-white text-xs font-bold rounded-lg transition-colors">
              <Plus size={13} /> Add Stat
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {form.stats.map((s, i) => (
              <div key={i} className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                <GripVertical size={15} className="text-gray-300 flex-shrink-0" />
                <div className="flex gap-3 flex-1">
                  <div className="w-28">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Value</label>
                    <input className={inp} value={s.value} onChange={e => updateStat(i, 'value', e.target.value)} placeholder="2006" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Label</label>
                    <input className={inp} value={s.label} onChange={e => updateStat(i, 'label', e.target.value)} placeholder="Established" />
                  </div>
                </div>
                <button onClick={() => removeStat(i)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 flex-shrink-0 transition-colors"><X size={15} /></button>
              </div>
            ))}
            {form.stats.length === 0 && <p className="text-xs text-gray-400 py-2">No stats yet.</p>}
          </div>
        </div>

        {/* Pioneer Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
          <h2 className="text-sm font-extrabold text-gray-700 uppercase tracking-wide">Pioneer Card (bottom wide card)</h2>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-1.5">Title</label>
            <input className={inp} value={form.pioneerTitle} onChange={e => setForm({ ...form, pioneerTitle: e.target.value })} placeholder="Industry Pioneer" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-1.5">Description</label>
            <textarea className={ta} rows={2} value={form.pioneerText} onChange={e => setForm({ ...form, pioneerText: e.target.value })} placeholder="First to design & manufacture..." />
          </div>
        </div>

        <button onClick={handleSave} className="flex items-center gap-1.5 px-6 py-2.5 bg-[#159c48] hover:bg-[#117a38] text-white text-sm font-bold rounded-lg transition-colors w-fit">
          <Check size={14} /> Save Changes
        </button>
      </div>
    </div>
  )
}

export default AdminAboutSlyder
