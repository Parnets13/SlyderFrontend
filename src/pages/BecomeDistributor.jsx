import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import heroBg from '../assets/cor3.png'

const BASE_URL = (import.meta.env.VITE_API_URL || 'https://slyderind.in/api').replace(/\/api$/, '')

const DEFAULT_SECTIONS = [
  { heading: 'Strengths for Providing Service', body: "Please provide detailed information about your company's strengths that make you an ideal distributor for the Slyder Hotel Lock System." },
  { heading: 'Proven Background of Sales to Hotel Projects', body: "Provide evidence of your successful sales history in supplying products to hotel projects." },
  { heading: 'Additional Information', body: "Is there any additional information you would like to share that demonstrates your company's suitability as a distributor?" },
]

const inp = { width: '100%', padding: '10px 14px', fontSize: 15, border: '1px solid #e2e8f0', borderRadius: 8, fontFamily: "'Inter', sans-serif", color: '#0f172a', outline: 'none', boxSizing: 'border-box', background: '#f5f7fa' }
const lbl = { display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6, fontFamily: "'Inter', sans-serif" }
const ta = { ...inp, resize: 'vertical', minHeight: 90 }
const secH = { fontSize: 17, fontWeight: 700, color: '#159c48', fontFamily: "'Inter', sans-serif", borderBottom: '2px solid #bbf7d0', paddingBottom: 8, marginBottom: 20, marginTop: 32 }
const subH = { fontSize: 14, fontWeight: 700, color: '#0f172a', fontFamily: "'Inter', sans-serif", marginBottom: 6, marginTop: 18 }
const hint = { fontSize: 13, color: '#64748b', marginBottom: 8, fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }

const BLANK = {
  companyName: '', contactPerson: '', title: '', email: '', phone: '', address: '',
  yearsInBusiness: '', businessLocation: '', numEmployees: '', website: '', companyDesc: '',
  technicalExpertise: '', customerSupport: '', installationServices: '', maintenanceUpgrades: '', trainingServices: '',
  projectExamples: '', clientTestimonials: '', salesPerformance: '',
  signature: '', date: '',
}

function F({ label, field, form, setForm, type = 'text', area = false }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={lbl}>{label}</label>
      {area
        ? <textarea style={ta} value={form[field] || ''} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} />
        : <input type={type} style={inp} value={form[field] || ''} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} />
      }
    </div>
  )
}

function DistributorModal({ onClose }) {
  const [form, setForm] = useState(BLANK)
  const [status, setStatus] = useState(null)

  const handleSubmit = async () => {
    if (!form.companyName || !form.email) { alert('Company name and email are required'); return }
    setStatus('sending')
    try {
      const res = await fetch(`${BASE_URL}/api/become-distributor/apply`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) { setStatus('success'); setForm(BLANK) } else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '20px 12px', overflowY: 'auto' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 780, boxShadow: '0 24px 80px rgba(0,0,0,0.25)', overflow: 'hidden', marginBottom: 40 }}>
        <div style={{ background: '#159c48', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ margin: 0, fontFamily: "'Inter', sans-serif", color: '#fff', fontSize: 13 }}>Application</p>
            <h2 style={{ margin: 0, fontSize: 'clamp(16px, 2vw, 22px)', fontWeight: 800, color: '#fff', fontFamily: "'Inter', sans-serif" }}>Distributor Application Form</h2>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 8, padding: 8, cursor: 'pointer', display: 'flex' }}>
            <X size={20} color="#fff" />
          </button>
        </div>

        <div style={{ padding: 'clamp(20px, 4vw, 32px) clamp(16px, 4vw, 36px) clamp(24px, 4vw, 40px)' }}>
          {status === 'success' && (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: 14, fontFamily: "'Inter', sans-serif" }}>
              ✓ Application submitted successfully! We will review and contact you soon.
            </div>
          )}
          {status === 'error' && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: 14, fontFamily: "'Inter', sans-serif" }}>
              Something went wrong. Please try again.
            </div>
          )}

          <p style={secH}>Contact Information</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0 24px' }}>
            <F label="Company Name *" field="companyName" form={form} setForm={setForm} />
            <F label="Contact Person" field="contactPerson" form={form} setForm={setForm} />
            <F label="Title" field="title" form={form} setForm={setForm} />
            <F label="Email Id *" field="email" type="email" form={form} setForm={setForm} />
            <F label="Phone No." field="phone" type="tel" form={form} setForm={setForm} />
          </div>
          <F label="Address" field="address" area form={form} setForm={setForm} />

          <p style={secH}>Company Profile</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0 24px' }}>
            <F label="No. of Years in Business" field="yearsInBusiness" form={form} setForm={setForm} />
            <F label="Business Location" field="businessLocation" form={form} setForm={setForm} />
            <F label="No. of Employees" field="numEmployees" form={form} setForm={setForm} />
            <F label="Website" field="website" form={form} setForm={setForm} />
          </div>
          <F label="Brief Description of Company" field="companyDesc" area form={form} setForm={setForm} />

          <p style={secH}>Strengths for Providing Service</p>
          {[
            { field: 'technicalExpertise', num: 1, label: 'Technical Expertise', hint: "Describe your team's technical knowledge and experience in the hospitality industry." },
            { field: 'customerSupport', num: 2, label: 'Customer Support', hint: "Detail your company's approach to customer support and helpdesk availability." },
            { field: 'installationServices', num: 3, label: 'Installation Services', hint: "Describe your experience and capability in installing hotel lock systems." },
            { field: 'maintenanceUpgrades', num: 4, label: 'Maintenance & Upgrades', hint: "Outline how you handle ongoing maintenance and system upgrades." },
            { field: 'trainingServices', num: 5, label: 'Training Services', hint: "Describe any training programs you offer to hotel staff." },
          ].map(({ field, num, label, hint: h }) => (
            <div key={field}>
              <p style={subH}>{num}. {label}</p>
              <p style={hint}>{h}</p>
              <textarea style={ta} value={form[field] || ''} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} />
            </div>
          ))}

          <p style={secH}>Proven Background of Sales to Hotel Projects</p>
          {[
            { field: 'projectExamples', num: 1, label: 'Project Examples', hint: 'List at least three hotel projects where you supplied products or services.' },
            { field: 'clientTestimonials', num: 2, label: 'Client Testimonials', hint: 'Provide client testimonials, references, or endorsements.' },
            { field: 'salesPerformance', num: 3, label: 'Sales Performance', hint: "Provide an overview of your company's overall sales performance." },
          ].map(({ field, num, label, hint: h }) => (
            <div key={field}>
              <p style={subH}>{num}. {label}</p>
              <p style={hint}>{h}</p>
              <textarea style={{ ...ta, minHeight: num === 1 ? 110 : 90 }} value={form[field] || ''} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} />
            </div>
          ))}

          <p style={secH}>Declaration</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0 24px' }}>
            <F label="Signature" field="signature" form={form} setForm={setForm} />
            <F label="Date" field="date" type="date" form={form} setForm={setForm} />
          </div>

          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <button
              onClick={handleSubmit}
              disabled={status === 'sending'}
              style={{ background: '#159c48', color: '#fff', fontSize: 16, fontWeight: 700, fontFamily: "'Inter', sans-serif", padding: '14px 40px', borderRadius: 8, border: 'none', cursor: 'pointer', opacity: status === 'sending' ? 0.7 : 1, transition: 'background 0.2s', width: '100%', maxWidth: 320 }}>
              {status === 'sending' ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function BecomeDistributor() {
  const [modalOpen, setModalOpen] = useState(false)
  const [pageTitle, setPageTitle] = useState('Slyder Hotel Lock System Distributor')
  const [submissionNote, setSubmissionNote] = useState('Please submit the completed application form along with any supporting documents to slydereletronics@gmail.com. We will review your application and contact you if further information is required.')
  const [sections, setSections] = useState(DEFAULT_SECTIONS)

  useEffect(() => {
    fetch(`${BASE_URL}/api/become-distributor/content`)
      .then(r => r.json())
      .then(d => {
        if (d?.title) setPageTitle(d.title)
        if (d?.submissionNote) setSubmissionNote(d.submissionNote)
        if (d?.sections?.length) setSections(d.sections)
      }).catch(() => {})
  }, [])

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ position: 'relative', width: '100%', height: 'clamp(200px, 40vw, 340px)', overflow: 'hidden' }}>
        <img src={heroBg} alt="Become a Distributor" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.65) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#159c48', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>Partner With Us</p>
          <h1 style={{ margin: 0, fontSize: 'clamp(28px, 6vw, 42px)', fontWeight: 900, color: '#fff', fontFamily: "'Inter', sans-serif", textShadow: '0 2px 16px rgba(0,0,0,0.4)', textAlign: 'center', padding: '0 16px' }}>Become Distributor</h1>
          <div style={{ width: 64, height: 4, borderRadius: 2, background: '#159c48' }} />
        </div>
      </div>

      <div style={{ padding: 'clamp(32px, 5vw, 60px) clamp(16px, 4vw, 60px) clamp(40px, 5vw, 80px)', background: '#f1f5f9' }}>
        <div style={{ background: '#ffffff', borderRadius: 20, boxShadow: '0 8px 40px rgba(0,0,0,0.10)', border: '1px solid #e2e8f0', padding: 'clamp(28px, 5vw, 56px) clamp(20px, 5vw, 72px)' }}>
          <h2 style={{ margin: '0 0 40px', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: '#159c48', fontFamily: "'Inter', sans-serif", textAlign: 'center' }}>
            {pageTitle}
          </h2>

          {sections.map((s, i) => (
            <div key={i} style={{ marginBottom: 36 }}>
              <h3 style={{ margin: '0 0 12px', fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700, color: '#0f172a', fontFamily: "'Inter', sans-serif", borderLeft: '4px solid #159c48', paddingLeft: 14 }}>{s.heading}</h3>
              <p style={{ margin: 0, fontSize: 'clamp(14px, 1.5vw, 17px)', color: '#374151', lineHeight: 2, textAlign: 'justify', fontFamily: "'Merriweather', serif", paddingLeft: 18 }}>{s.body}</p>
            </div>
          ))}

          <div style={{ marginTop: 40, padding: '20px 24px', background: '#f0fdf4', borderRadius: 12, border: '1px solid #bbf7d0' }}>
            <p style={{ margin: 0, fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#374151', lineHeight: 1.9, fontFamily: "'Merriweather', serif", textAlign: 'justify' }}>
              {submissionNote}
            </p>
          </div>

          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <button
              onClick={() => setModalOpen(true)}
              style={{ display: 'inline-block', background: '#159c48', color: '#fff', fontSize: 16, fontWeight: 700, fontFamily: "'Inter', sans-serif", padding: '14px 36px', borderRadius: 8, border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#117a38'}
              onMouseLeave={e => e.currentTarget.style.background = '#159c48'}>
              Click Here to Fill the Form
            </button>
          </div>
        </div>
      </div>

      {modalOpen && <DistributorModal onClose={() => setModalOpen(false)} />}
    </div>
  )
}

export default BecomeDistributor
