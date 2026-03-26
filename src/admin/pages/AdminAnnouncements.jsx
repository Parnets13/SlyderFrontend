import { useState } from 'react'
import { Plus, Trash2, X, Check } from 'lucide-react'
import { getStore, setStore, KEYS } from '../adminStore'

const defaultAnnouncements = [
  'Slyder Electronics — Pioneering Hotel Lock Solutions since 2006',
  "India's first RFID Reader and Lock Management Software for Hotel Lock Systems",
  '60% Market Share in Boutique Hotel Segment in Karnataka',
  'First to introduce Transaction Alert SMS feature for hotel security',
]

const inp = { width: '100%', padding: '10px 14px', fontSize: 14, border: '1px solid #e2e8f0', borderRadius: 8, fontFamily: "'Inter', sans-serif", color: '#0f172a', background: '#f8fafc', outline: 'none', boxSizing: 'border-box' }

function AdminAnnouncements() {
  const [items, setItems] = useState(() => getStore(KEYS.announcements, defaultAnnouncements))
  const [newText, setNewText] = useState('')
  const [adding, setAdding] = useState(false)

  const save = (updated) => { setItems(updated); setStore(KEYS.announcements, updated) }

  return (
    <div style={{ padding: '40px 48px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <h1 style={{ margin: '0 0 4px', fontSize: 26, fontWeight: 800, color: '#0f172a', fontFamily: "'Inter', sans-serif" }}>Announcements</h1>
          <p style={{ margin: 0, fontSize: 14, color: '#64748b', fontFamily: "'Inter', sans-serif" }}>Ticker text shown on homepage</p>
        </div>
        <button onClick={() => setAdding(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: '#159c48', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
          <Plus size={16} /> Add
        </button>
      </div>

      {adding && (
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <input style={{ ...inp, marginBottom: 12 }} value={newText} onChange={e => setNewText(e.target.value)} placeholder="Enter announcement text..." />
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => { if (newText.trim()) { save([...items, newText.trim()]); setNewText(''); setAdding(false) } }} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 20px', background: '#159c48', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}><Check size={15} /> Save</button>
            <button onClick={() => { setAdding(false); setNewText('') }} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 20px', background: '#f1f5f9', color: '#374151', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}><X size={15} /> Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((text, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <span style={{ width: 28, height: 28, borderRadius: 8, background: '#f0fdf4', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#159c48', flexShrink: 0, fontFamily: "'Inter', sans-serif" }}>{i + 1}</span>
            <p style={{ margin: 0, flex: 1, fontSize: 14, color: '#374151', fontFamily: "'Inter', sans-serif", lineHeight: 1.5 }}>{text}</p>
            <button onClick={() => { if (confirm('Delete?')) save(items.filter((_, j) => j !== i)) }} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#ef4444', fontFamily: "'Inter', sans-serif", flexShrink: 0 }}><Trash2 size={13} /> Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminAnnouncements
