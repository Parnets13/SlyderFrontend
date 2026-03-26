import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import { getContact, updateContact } from '../api'

const inp = 'w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500'
const ta  = `${inp} resize-y`

function AdminContactInfo() {
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
    <div className="p-10">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Contact Card</h1>
        <p className="text-sm text-gray-500 mt-1">Edit the contact information shown on the Contact page</p>
      </div>

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
    </div>
  )
}

export default AdminContactInfo
