import { useState, useEffect } from 'react'
import { Check, Trash2, Mail, MailOpen } from 'lucide-react'
import { getContact, updateContact, getContactMessages, markMessageRead, deleteContactMessage } from '../api'

const inp = 'w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500'
const ta  = `${inp} resize-y`

const TABS = ['Contact Info', 'Messages']

// ── Contact Info Tab ─────────────────────────────────────
function ContactInfoTab() {
  const [form, setForm] = useState({ address: '', mobile: '', email1: '', email2: '', website: '' })
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getContact().then(d => {
      if (d) setForm({ address: d.address || '', mobile: d.mobile || '', email1: d.email1 || '', email2: d.email2 || '', website: d.website || '' })
    }).catch(() => {})
  }, [])

  const handleSave = async () => {
    try {
      setError('')
      await updateContact(form)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch { setError('Failed to save') }
  }

  return (
    <div className="flex flex-col gap-4 max-w-xl">
      {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-3 py-2">{error}</div>}
      {saved && <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-3 py-2">Saved successfully</div>}
      {[
        { key: 'address', label: 'Address', textarea: true },
        { key: 'mobile',  label: 'Mobile Number' },
        { key: 'email1',  label: 'Email 1' },
        { key: 'email2',  label: 'Email 2' },
        { key: 'website', label: 'Website' },
      ].map(f => (
        <div key={f.key}>
          <label className="block text-sm font-extrabold text-gray-900 mb-2">{f.label}</label>
          {f.textarea
            ? <textarea className={ta} rows={3} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
            : <input className={inp} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
          }
        </div>
      ))}
      <button onClick={handleSave} className="flex items-center gap-1.5 px-6 py-2.5 bg-[#159c48] hover:bg-[#117a38] text-white text-sm font-bold rounded-lg transition-colors w-fit">
        <Check size={14} /> Save Changes
      </button>
    </div>
  )
}

// ── Messages Tab ─────────────────────────────────────────
function MessagesTab() {
  const [messages, setMessages] = useState([])
  const [expanded, setExpanded] = useState(null)

  const load = async () => { try { setMessages(await getContactMessages()) } catch {} }
  useEffect(() => { load() }, [])

  const handleExpand = async (msg) => {
    setExpanded(expanded === msg._id ? null : msg._id)
    if (!msg.read) {
      try { await markMessageRead(msg._id); load() } catch {}
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return
    try { await deleteContactMessage(id); load() } catch {}
  }

  const unread = messages.filter(m => !m.read).length

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <p className="text-sm text-gray-500">{messages.length} total</p>
        {unread > 0 && <span className="px-2 py-0.5 bg-[#159c48] text-white text-xs font-bold rounded-full">{unread} unread</span>}
      </div>

      {messages.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-16">No messages yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {messages.map(msg => (
            <div key={msg._id} className={`bg-white border rounded-xl shadow-sm overflow-hidden transition-all ${!msg.read ? 'border-[#159c48]/40' : 'border-gray-200'}`}>
              {/* Header row */}
              <div className="flex items-center gap-4 px-5 py-4 cursor-pointer" onClick={() => handleExpand(msg)}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${!msg.read ? 'bg-[#f0fdf4]' : 'bg-gray-100'}`}>
                  {msg.read ? <MailOpen size={15} className="text-gray-400" /> : <Mail size={15} className="text-[#159c48]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm truncate ${!msg.read ? 'font-extrabold text-gray-900' : 'font-semibold text-gray-700'}`}>{msg.name}</p>
                    {!msg.read && <span className="w-2 h-2 rounded-full bg-[#159c48] flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-gray-400 truncate">{msg.subject || msg.email}</p>
                </div>
                <p className="text-xs text-gray-400 flex-shrink-0">{new Date(msg.createdAt).toLocaleDateString()}</p>
                <button onClick={e => { e.stopPropagation(); handleDelete(msg._id) }}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 flex-shrink-0 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Expanded content */}
              {expanded === msg._id && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div><span className="font-bold text-gray-500">Email:</span> <span className="text-gray-800">{msg.email}</span></div>
                    {msg.mobile && <div><span className="font-bold text-gray-500">Mobile:</span> <span className="text-gray-800">{msg.mobile}</span></div>}
                    {msg.subject && <div className="col-span-2"><span className="font-bold text-gray-500">Subject:</span> <span className="text-gray-800">{msg.subject}</span></div>}
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────
function AdminContact() {
  const [tab, setTab] = useState(0)

  return (
    <div className="p-10">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Contact</h1>
        <p className="text-sm text-gray-500 mt-1">Manage contact info and view submitted messages</p>
      </div>

      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-8">
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)}
            className={`px-5 py-2 text-sm font-bold rounded-lg transition-colors ${tab === i ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 0 && <ContactInfoTab />}
      {tab === 1 && <MessagesTab />}
    </div>
  )
}

export default AdminContact
