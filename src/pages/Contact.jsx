import { useState, useEffect } from 'react'
import { MapPin, Phone, Mail, Globe } from 'lucide-react'
import heroBg from '../assets/8hotel.jpg'

const BASE_URL = (import.meta.env.VITE_API_URL || 'https://slyderind.onrender.com/api').replace(/\/api$/, '')

const iconAnimations = `
  @keyframes iconPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.22)} }
  @keyframes iconBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
  @keyframes iconSpin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
  @keyframes iconShake { 0%,100%{transform:rotate(0deg)} 20%{transform:rotate(-15deg)} 40%{transform:rotate(15deg)} 60%{transform:rotate(-10deg)} 80%{transform:rotate(10deg)} }
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: stretch; }
  @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; } }
`

function ContactInfoItem({ icon: Icon, label, lines, animation }) {
  return (
    <div style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
      <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 10, background: '#f0fdf4', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={20} color="#159c48" style={{ animation, display: 'block' }} />
      </div>
      <div>
        <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>{label}</p>
        {lines.filter(Boolean).map((line, i) => (
          <p key={i} style={{ margin: 0, fontSize: 15, color: '#1e293b', lineHeight: 1.7, fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>{line}</p>
        ))}
      </div>
    </div>
  )
}

const BLANK = { name: '', email: '', mobile: '', subject: '', message: '' }

function Contact() {
  const [info, setInfo] = useState(null)
  const [form, setForm] = useState(BLANK)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    fetch(`${BASE_URL}/api/contact`)
      .then(r => r.json())
      .then(d => { if (d?.mobile) setInfo(d) })
      .catch(() => {})
  }, [])

  const address = info?.address || 'No.8 First Floor, Opp Government PU College, Jakkur Main Road, Sneha layout, Jakkur, Bangalore - 560064.'
  const mobile = info?.mobile || '9845670055'
  const email1 = info?.email1 || 'slyderelectronics@gmail.com'
  const email2 = info?.email2 || 'director@slyderind.in'
  const website = info?.website || 'www.slyderind.in'

  const contactItems = [
    { icon: MapPin, label: 'Address', animation: 'iconBounce 0.6s ease infinite', lines: address.split(',').reduce((acc, part, i, arr) => { if (i % 2 === 0) acc.push(arr.slice(i, i + 2).join(',').trim()); return acc }, []) },
    { icon: Phone, label: 'Mobile', animation: 'iconShake 0.5s ease infinite', lines: [mobile] },
    { icon: Mail, label: 'E-Mail', animation: 'iconPulse 0.7s ease infinite', lines: [email1, email2] },
    { icon: Globe, label: 'Web', animation: 'iconSpin 1s linear infinite', lines: [website] },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 15000)
      const res = await fetch(`${BASE_URL}/api/contact/message`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
        signal: controller.signal,
      })
      clearTimeout(timeout)
      const data = await res.json()
      if (data.success) { setStatus('success'); setForm(BLANK) } else setStatus('error')
    } catch { setStatus('error') }
  }

  const inp = { width: '100%', padding: '11px 14px', fontSize: 15, border: '1px solid #e2e8f0', borderRadius: 8, fontFamily: "'Inter', sans-serif", color: '#0f172a', background: '#f5f7fa', outline: 'none', boxSizing: 'border-box' }

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <style>{iconAnimations}</style>

      {/* Hero */}
      <div style={{ position: 'relative', width: '100%', height: 'clamp(200px, 40vw, 340px)', overflow: 'hidden' }}>
        <img src={heroBg} alt="Contact Us" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.65) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#159c48', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>Get In Touch</p>
          <h1 style={{ margin: 0, fontSize: 'clamp(30px, 6vw, 52px)', fontWeight: 800, color: '#ffffff', fontFamily: "'Inter', sans-serif", textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}>Contact Us</h1>
          <div style={{ width: 64, height: 4, borderRadius: 2, background: '#159c48' }} />
        </div>
      </div>

      {/* Contact Section */}
      <div style={{ padding: 'clamp(32px, 5vw, 60px) clamp(16px, 4vw, 60px) clamp(40px, 5vw, 80px)', background: '#f1f5f9' }}>
        <div className="contact-grid">
          {/* Form */}
          <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 8px 40px rgba(0,0,0,0.09)', border: '1px solid #e2e8f0', padding: 'clamp(24px, 4vw, 48px) clamp(20px, 4vw, 44px)' }}>
            <h2 style={{ margin: '0 0 8px', fontSize: 'clamp(20px, 2vw, 26px)', fontWeight: 800, color: '#0f172a', fontFamily: "'Inter', sans-serif" }}>Send Us a Message</h2>
            <div style={{ width: 48, height: 3, background: '#159c48', borderRadius: 2, marginBottom: 28 }} />

            {status === 'success' && (
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: 14, fontFamily: "'Inter', sans-serif" }}>
                ✓ Message sent! We'll get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: 14, fontFamily: "'Inter', sans-serif" }}>
                Something went wrong. Please try again.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {[
                { key: 'name', label: 'Your Name', type: 'text', required: true, placeholder: 'Enter your full name' },
                { key: 'email', label: 'Your Email', type: 'email', required: true, placeholder: 'Enter your email address' },
                { key: 'mobile', label: 'Your Mobile Number', type: 'tel', required: false, placeholder: 'Enter your mobile number' },
                { key: 'subject', label: 'Subject', type: 'text', required: false, placeholder: 'What is this regarding?' },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 18 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6, fontFamily: "'Inter', sans-serif" }}>
                    {f.label}{f.required && <span style={{ color: '#159c48' }}> *</span>}
                  </label>
                  <input type={f.type} placeholder={f.placeholder} required={f.required} value={form[f.key]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })} style={inp} />
                </div>
              ))}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6, fontFamily: "'Inter', sans-serif" }}>
                  Write Message <span style={{ color: '#159c48' }}>*</span>
                </label>
                <textarea rows={5} placeholder="Write your message here..." required value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{ ...inp, resize: 'vertical' }} />
              </div>
              <button type="submit" disabled={status === 'sending'}
                style={{ background: '#159c48', color: '#fff', fontSize: 15, fontWeight: 700, fontFamily: "'Inter', sans-serif", padding: '13px 40px', borderRadius: 8, border: 'none', cursor: 'pointer', letterSpacing: '0.08em', opacity: status === 'sending' ? 0.7 : 1, transition: 'background 0.2s' }}>
                {status === 'sending' ? 'SENDING...' : 'SEND'}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 8px 40px rgba(0,0,0,0.09)', border: '1px solid #e2e8f0', padding: 'clamp(24px, 4vw, 48px) clamp(20px, 4vw, 44px)' }}>
            <h2 style={{ margin: '0 0 8px', fontSize: 'clamp(20px, 2vw, 26px)', fontWeight: 800, color: '#0f172a', fontFamily: "'Inter', sans-serif" }}>Contact Information</h2>
            <div style={{ width: 48, height: 3, background: '#159c48', borderRadius: 2, marginBottom: 32 }} />
            {contactItems.map(item => <ContactInfoItem key={item.label} {...item} />)}
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div style={{ background: '#f1f5f9', padding: '0 clamp(16px, 4vw, 60px) clamp(32px, 5vw, 60px)' }}>
        <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.10)', border: '1px solid #e2e8f0', height: 'clamp(280px, 50vw, 480px)' }}>
          <iframe title="Slyder Electronics Location"
            src="https://www.google.com/maps?cid=1038833531330879419&output=embed"
            width="100%" height="100%" style={{ border: 0, display: 'block' }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </div>
  )
}

export default Contact
