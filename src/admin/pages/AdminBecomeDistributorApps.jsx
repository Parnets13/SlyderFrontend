import { useState, useEffect } from 'react'
import { Trash2, FileText, Eye, X } from 'lucide-react'
import { getDistributorApplications, markDistributorAppRead, deleteDistributorApp } from '../api'

const FIELD_GROUPS = [
  { label: 'Contact Information', fields: [
    { key: 'companyName',    label: 'Company Name' },
    { key: 'contactPerson',  label: 'Contact Person' },
    { key: 'title',          label: 'Title' },
    { key: 'email',          label: 'Email' },
    { key: 'phone',          label: 'Phone' },
    { key: 'address',        label: 'Address' },
  ]},
  { label: 'Company Profile', fields: [
    { key: 'yearsInBusiness',  label: 'Years in Business' },
    { key: 'businessLocation', label: 'Business Location' },
    { key: 'numEmployees',     label: 'No. of Employees' },
    { key: 'website',          label: 'Website' },
    { key: 'companyDesc',      label: 'Company Description' },
  ]},
  { label: 'Strengths', fields: [
    { key: 'technicalExpertise',   label: 'Technical Expertise' },
    { key: 'customerSupport',      label: 'Customer Support' },
    { key: 'installationServices', label: 'Installation Services' },
    { key: 'maintenanceUpgrades',  label: 'Maintenance & Upgrades' },
    { key: 'trainingServices',     label: 'Training Services' },
  ]},
  { label: 'Sales Background', fields: [
    { key: 'projectExamples',    label: 'Project Examples' },
    { key: 'clientTestimonials', label: 'Client Testimonials' },
    { key: 'salesPerformance',   label: 'Sales Performance' },
  ]},
  { label: 'Declaration', fields: [
    { key: 'signature', label: 'Signature' },
    { key: 'date',      label: 'Date' },
  ]},
]

function DetailModal({ app, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center p-6 overflow-y-auto"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-6 overflow-hidden">
        {/* Modal header */}
        <div className="bg-[#159c48] px-7 py-5 flex items-center justify-between">
          <div>
            <p className="text-green-100 text-xs font-semibold uppercase tracking-widest mb-0.5">Application Detail</p>
            <h2 className="text-white text-xl font-extrabold">{app.companyName || 'Unnamed Company'}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Meta bar */}
        <div className="flex items-center gap-6 px-7 py-3 bg-gray-50 border-b border-gray-200 text-xs text-gray-500">
          <span>Submitted: <span className="font-semibold text-gray-700">{new Date(app.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span></span>
          {app.email && <span>Email: <span className="font-semibold text-gray-700">{app.email}</span></span>}
          {app.phone && <span>Phone: <span className="font-semibold text-gray-700">{app.phone}</span></span>}
        </div>

        {/* Body */}
        <div className="px-7 py-6 flex flex-col gap-7">
          {FIELD_GROUPS.map(group => {
            const filled = group.fields.filter(f => app[f.key])
            if (!filled.length) return null
            return (
              <div key={group.label}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-extrabold text-[#159c48] uppercase tracking-widest">{group.label}</span>
                  <div className="flex-1 h-px bg-green-100" />
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  {filled.map(f => (
                    <div key={f.key} className={app[f.key]?.length > 80 ? 'col-span-2' : ''}>
                      <p className="text-xs font-bold text-gray-400 mb-1">{f.label}</p>
                      <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{app[f.key]}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
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

function AdminBecomeDistributorApps() {
  const [apps, setApps] = useState([])
  const [viewing, setViewing] = useState(null)

  const load = async () => { try { setApps(await getDistributorApplications()) } catch {} }
  useEffect(() => { load() }, [])

  const handleView = async (app) => {
    setViewing(app)
    if (!app.read) {
      try { await markDistributorAppRead(app._id); load() } catch {}
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this application?')) return
    try { await deleteDistributorApp(id); load() } catch {}
  }

  const unread = apps.filter(a => !a.read).length

  return (
    <div className="p-10">
      <div className="mb-8 flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Distributor Applications</h1>
          <p className="text-sm text-gray-500 mt-1">Applications submitted via the Become Distributor form</p>
        </div>
        {unread > 0 && <span className="px-3 py-1 bg-[#159c48] text-white text-xs font-bold rounded-full">{unread} new</span>}
      </div>

      {apps.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 rounded-2xl">
          <FileText size={36} className="text-gray-200 mb-3" />
          <p className="text-gray-400 text-sm">No applications yet.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="px-5 py-3 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-5 py-3 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Contact Person</th>
                <th className="px-5 py-3 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-5 py-3 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-5 py-3 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-5 py-3 text-xs font-extrabold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {apps.map(app => (
                <tr key={app._id} className={`transition-colors ${!app.read ? 'bg-green-50 hover:bg-green-100' : 'bg-white hover:bg-gray-50'}`}>
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-900 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {!app.read && <span className="w-2 h-2 rounded-full bg-[#159c48] flex-shrink-0" />}
                      {app.companyName || '—'}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-600 whitespace-nowrap">{app.contactPerson || '—'}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-600 whitespace-nowrap">{app.email || '—'}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-600 whitespace-nowrap">{app.phone || '—'}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-500 whitespace-nowrap">
                    {new Date(app.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => handleView(app)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#159c48] bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition-colors"
                      >
                        <Eye size={13} /> View
                      </button>
                      <button
                        onClick={() => handleDelete(app._id)}
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

      {viewing && <DetailModal app={viewing} onClose={() => setViewing(null)} />}
    </div>
  )
}

export default AdminBecomeDistributorApps
