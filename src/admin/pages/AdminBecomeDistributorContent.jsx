import { useState, useEffect } from 'react'
import { Check, Plus, X, FileText, AlignLeft, Layout } from 'lucide-react'
import { getBecomeDistributorContent, updateBecomeDistributorContent } from '../api'

const inp = 'w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-900 outline-none focus:border-[#159c48] focus:ring-2 focus:ring-[#159c48]/10 focus:bg-white transition-all'
const ta  = `${inp} resize-y`

function AdminBecomeDistributorContent() {
  const [title, setTitle] = useState('')
  const [submissionNote, setSubmissionNote] = useState('')
  const [sections, setSections] = useState([])
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getBecomeDistributorContent().then(d => {
      setTitle(d.title || '')
      setSubmissionNote(d.submissionNote || '')
      setSections(d.sections || [])
    }).catch(() => {})
  }, [])

  const addSection    = () => setSections(s => [...s, { heading: '', body: '' }])
  const removeSection = (i) => setSections(s => s.filter((_, idx) => idx !== i))
  const updateSection = (i, key, val) => setSections(s => s.map((sec, idx) => idx === i ? { ...sec, [key]: val } : sec))

  const handleSave = async () => {
    try {
      setError('')
      await updateBecomeDistributorContent({ title, submissionNote, sections })
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch { setError('Failed to save') }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Become Distributor</h1>
          <p className="text-sm text-gray-400 mt-1">Manage the page content shown to potential distributors</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#159c48] hover:bg-[#117a38] text-white text-sm font-bold rounded-xl shadow-sm transition-all active:scale-95"
        >
          <Check size={15} /> Save Changes
        </button>
      </div>

      {/* Alerts */}
      {error && (
        <div className="mb-6 flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
          <X size={14} /> {error}
        </div>
      )}
      {saved && (
        <div className="mb-6 flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3">
          <Check size={14} /> Changes saved successfully
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Left column — Page settings */}
        <div className="col-span-1 flex flex-col gap-5">

          {/* Page Title card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#f0fdf4] flex items-center justify-center">
                <Layout size={15} className="text-[#159c48]" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-gray-900">Page Title</p>
                <p className="text-xs text-gray-400">Shown as the main heading</p>
              </div>
            </div>
            <input
              className={inp}
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Slyder Hotel Lock System Distributor"
            />
          </div>

          {/* Submission Note card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#f0fdf4] flex items-center justify-center">
                <AlignLeft size={15} className="text-[#159c48]" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-gray-900">Submission Note</p>
                <p className="text-xs text-gray-400">Green info box at the bottom</p>
              </div>
            </div>
            <textarea
              className={ta}
              rows={6}
              value={submissionNote}
              onChange={e => setSubmissionNote(e.target.value)}
              placeholder="Text shown in the green box at the bottom of the page..."
            />
          </div>
        </div>

        {/* Right column — Sections */}
        <div className="col-span-2">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#f0fdf4] flex items-center justify-center">
                  <FileText size={15} className="text-[#159c48]" />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-gray-900">Page Sections</p>
                  <p className="text-xs text-gray-400">{sections.length} section{sections.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <button
                onClick={addSection}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#159c48] hover:bg-[#117a38] text-white text-xs font-bold rounded-lg transition-all active:scale-95"
              >
                <Plus size={13} /> Add Section
              </button>
            </div>

            {sections.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-gray-200 rounded-xl">
                <FileText size={32} className="text-gray-200 mb-3" />
                <p className="text-sm text-gray-400">No sections yet.</p>
                <p className="text-xs text-gray-300 mt-1">Click "Add Section" to get started.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {sections.map((sec, i) => (
                  <div key={i} className="group relative border border-gray-200 rounded-xl p-5 bg-gray-50 hover:border-[#159c48]/30 hover:bg-white transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-extrabold text-[#159c48] uppercase tracking-widest">Section {i + 1}</span>
                      <button
                        onClick={() => removeSection(i)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1.5">Heading</label>
                        <input
                          className={inp}
                          value={sec.heading}
                          onChange={e => updateSection(i, 'heading', e.target.value)}
                          placeholder="Section heading"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1.5">Description</label>
                        <textarea
                          className={ta}
                          rows={3}
                          value={sec.body}
                          onChange={e => updateSection(i, 'body', e.target.value)}
                          placeholder="Section description..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminBecomeDistributorContent
