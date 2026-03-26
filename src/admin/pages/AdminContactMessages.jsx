import { useState, useEffect } from 'react'
import { Trash2, Mail, Eye, X } from 'lucide-react'
import { getContactMessages, markMessageRead, deleteContactMessage } from '../api'

function DetailModal({ msg, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center p-6 overflow-y-auto"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl my-6 overflow-hidden">
        {/* Header */}
        <div className="bg-[#159c48] px-7 py-5 flex items-center justify-between">
          <div>
            <p className="text-green-100 text-xs font-semibold uppercase tracking-widest mb-0.5">Contact Message</p>
            <h2 className="text-white text-xl font-extrabold">{msg.name}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Meta bar */}
        <div className="flex flex-wrap items-center gap-5 px-7 py-3 bg-gray-50 border-b border-gray-200 text-xs text-gray-500">
          <span>Date: <span className="font-semibold text-gray-700">{new Date(msg.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span></span>
          <span>Email: <span className="font-semibold text-gray-700">{msg.email}</span></span>
          {msg.mobile && <span>Mobile: <span className="font-semibold text-gray-700">{msg.mobile}</span></span>}
        </div>

        {/* Body */}
        <div className="px-7 py-6 flex flex-col gap-5">
          {msg.subject && (
            <div>
              <p className="text-xs font-extrabold text-[#159c48] uppercase tracking-widest mb-1.5">Subject</p>
              <p className="text-sm font-semibold text-gray-800">{msg.subject}</p>
            </div>
          )}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <p className="text-xs font-extrabold text-[#159c48] uppercase tracking-widest">Message</p>
              <div className="flex-1 h-px bg-green-100" />
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
            </div>
          </div>
        </div>

        <div className="px-7 py-4 border-t border-gray-100 flex justify-end">
          <button onClick={onClose} className="px-5 py-2 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

function AdminContactMessages() {
  const [messages, setMessages] = useState([])
  const [viewing, setViewing] = useState(null)

  const load = async () => { try { setMessages(await getContactMessages()) } catch {} }
  useEffect(() => { load() }, [])

  const handleView = async (msg) => {
    setViewing(msg)
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
    <div className="p-10">
      <div className="mb-8 flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Contact Form</h1>
          <p className="text-sm text-gray-500 mt-1">Messages submitted via the Contact page</p>
        </div>
        {unread > 0 && (
          <span className="px-3 py-1 bg-[#159c48] text-white text-xs font-bold rounded-full">{unread} unread</span>
        )}
      </div>

      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 rounded-2xl">
          <Mail size={36} className="text-gray-200 mb-3" />
          <p className="text-gray-400 text-sm">No messages yet.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="px-5 py-3 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-5 py-3 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-5 py-3 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Mobile</th>
                <th className="px-5 py-3 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-5 py-3 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-5 py-3 text-xs font-extrabold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {messages.map(msg => (
                <tr key={msg._id} className={`transition-colors ${!msg.read ? 'bg-green-50 hover:bg-green-100' : 'bg-white hover:bg-gray-50'}`}>
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-900 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {!msg.read && <span className="w-2 h-2 rounded-full bg-[#159c48] flex-shrink-0" />}
                      {msg.name}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-600 whitespace-nowrap">{msg.email}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-600 whitespace-nowrap">{msg.mobile || '—'}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-600 max-w-[200px] truncate">{msg.subject || '—'}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-500 whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => handleView(msg)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#159c48] bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition-colors"
                      >
                        <Eye size={13} /> View
                      </button>
                      <button
                        onClick={() => handleDelete(msg._id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {viewing && <DetailModal msg={viewing} onClose={() => setViewing(null)} />}
    </div>
  )
}

export default AdminContactMessages
