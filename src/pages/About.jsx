import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import founderImg from '../assets/founder .jfif'
import heroBg from '../assets/cor2.jpg'

const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api$/, '')

const sections = [
  { id: 'intro', heading: 'Slyder Electronics — Pioneering Hotel Lock Solutions', content: [{ label: null, text: "Slyder Electronics is a trailblazing company that revolutionized the hospitality industry with its innovative electronic lock solutions. Established in 2006, Slyder Electronics swiftly emerged as a frontrunner in importing and providing cutting-edge hotel locks in India." }] },
  { id: 'milestones', heading: 'Milestones and Achievements', content: [{ label: 'Mifare Card Revolution', text: 'Recognizing the potential of Mifare card technology, Slyder Electronics became one of the trailblazers in the industry by introducing Mifare card hotel locks.' }, { label: 'Market Leadership', text: 'With a keen focus on excellence, Slyder Electronics garnered an impressive 60% market share in the boutique hotel segment in Karnataka.' }, { label: 'Cutting-edge Offerings', text: "Slyder Electronics solidified its reputation as an industry leader by developing India's first hotel Lock RFID readers and accompanying lock management software." }] },
  { id: 'vision', heading: 'Vision and Values', content: [{ label: null, text: "Slyder Electronics is driven by a vision to continually redefine the standards of secure access systems in the hospitality industry." }] },
  { id: 'network', heading: 'Nationwide Service and Sales Network', content: [{ label: null, text: "In addition to its remarkable achievements in hotel lock innovation, Slyder Electronics has also cemented its reputation through its extensive nationwide service and sales network." }] },
  { id: 'support', heading: 'Comprehensive Customer Support', content: [{ label: 'Slyder', text: "Electronics takes pride in its commitment to customer satisfaction, and this commitment is reflected in its nationwide service network." }] },
  { id: 'sales', heading: 'Efficient Sales Network', content: [{ label: 'Slyder', text: "Electronics has made its innovative electronic lock solutions easily accessible to a wide range of clients through its efficient sales network." }] },
  { id: 'local', heading: 'Localized Expertise', content: [{ label: null, text: "Understanding the importance of localized expertise, Slyder Electronics ensures that its service and sales network is equipped with professionals who have an in-depth understanding of regional preferences." }] },
  { id: 'support247', heading: '24/7 Support and Accessibility', content: [{ label: null, text: "In keeping with its commitment to exceptional customer service, Slyder Electronics provides 24/7 support through various channels." }] },
]

const COLLAPSED_HEIGHT = 260

function Section({ section }) {
  const [expanded, setExpanded] = useState(false)
  const [needsToggle, setNeedsToggle] = useState(false)

  const measuredRef = (el) => {
    if (el && el.scrollHeight > COLLAPSED_HEIGHT + 10) setNeedsToggle(true)
  }

  const renderBody = () => {
    if (section.points && section.points.length > 0) {
      return (
        <ul style={{ margin: 0, padding: '0 0 0 24px', listStyle: 'disc' }}>
          {section.points.map((pt, i) => (
            <li key={i} style={{ fontSize: 'clamp(15px, 1.5vw, 19px)', color: '#1e293b', lineHeight: 2, marginBottom: 14, textAlign: 'justify', fontFamily: "'Merriweather', serif" }}>{pt}</li>
          ))}
        </ul>
      )
    }
    if (section.description) {
      return <p style={{ margin: 0, fontSize: 'clamp(15px, 1.5vw, 19px)', color: '#1e293b', lineHeight: 2, textAlign: 'justify', fontFamily: "'Merriweather', serif" }}>{section.description}</p>
    }
    return section.content?.length ? (
      <ul style={{ margin: 0, padding: '0 0 0 24px', listStyle: 'disc' }}>
        {section.content.map((item, i) => (
          <li key={i} style={{ fontSize: 'clamp(15px, 1.5vw, 19px)', color: '#1e293b', lineHeight: 2, marginBottom: 14, textAlign: 'justify', fontFamily: "'Merriweather', serif" }}>
            {item.label ? <><strong style={{ color: '#0f172a', fontWeight: 700 }}>{item.label}</strong>{': '}{item.text}</> : item.text}
          </li>
        ))}
      </ul>
    ) : null
  }

  return (
    <div style={{ borderBottom: '1px solid #e2e8f0' }}>
      <div style={{ background: '#f1f5f9', borderTop: '1px solid #e2e8f0', padding: '24px 20px' }}>
        <h2 style={{ margin: 0, fontSize: 'clamp(18px, 2vw, 26px)', fontWeight: 700, color: '#0f172a', textAlign: 'center', fontFamily: "'Inter', sans-serif" }}>
          {section.heading}
        </h2>
      </div>
      <div style={{ padding: 'clamp(20px, 4vw, 36px) clamp(16px, 6vw, 100px) 0', position: 'relative' }}>
        <div ref={measuredRef} style={{ overflow: 'hidden', maxHeight: expanded ? 'none' : COLLAPSED_HEIGHT, transition: 'max-height 0.4s ease', position: 'relative' }}>
          {renderBody()}
          {!expanded && needsToggle && (
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: 'linear-gradient(to bottom, transparent, #fff)', pointerEvents: 'none' }} />
          )}
        </div>
        {needsToggle && (
          <div style={{ textAlign: 'right', padding: '12px 0 24px' }}>
            <button onClick={() => setExpanded(!expanded)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 700, color: '#159c48', padding: 0 }}>
              {expanded ? 'Less More' : 'Read More'}
            </button>
          </div>
        )}
        {!needsToggle && <div style={{ height: 24 }} />}
      </div>
    </div>
  )
}

const orgItems = [
  { heading: 'Founder and CEO - Mr. S. Venkatesh', content: "Founder and CEO, Mr. S. Venkatesh, provides overall strategic guidance and leadership." },
  { heading: 'Co-founder - Mr. V.S. Prakash', content: "As a co-founder, Mr. V.S. Prakash plays a key role in shaping Slyder Electronics' strategic direction." },
  { heading: 'National Sales Manager', content: "The National Sales Manager oversees the sales and business development efforts of the company." },
  { heading: 'Sales Team', content: "The sales team focuses on expanding Slyder Electronics' customer base across different regions." },
  { heading: 'Technical Support Executives', content: "The Technical Support Executives are responsible for installation, troubleshooting, and maintenance." },
  { heading: 'Research and Development (R&D) Team', content: "The R&D team is dedicated to innovation and product development." },
  { heading: 'Product Development and Innovation Team', content: "This team collaborates with the R&D team to translate innovative ideas into tangible products." },
  { heading: 'Operations and Manufacturing Department', content: "The operations team manages the production process and supply chain management." },
  { heading: 'Customer Service and Support Team', content: "The customer service team provides prompt assistance and technical support to customers." },
  { heading: 'Marketing and Branding Department', content: "The marketing team develops strategies to create brand awareness and promote Slyder Electronics' products." },
  { heading: 'Finance and Accounting Department', content: "The finance and accounting team ensures financial stability by managing budgets and financial reporting." },
  { heading: 'Human Resources and Administration', content: "This department handles employee recruitment, training, and administrative functions." },
  { heading: 'Service Center Network', content: "The service center network is responsible for on-site technical support, installation, and troubleshooting." },
  { heading: 'Distributors and Dealers', content: "Distributors and dealers play a vital role in Slyder Electronics' market expansion." },
]

function OrgItem({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid #e2e8f0' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', background: open ? '#eef6ff' : '#fff', border: 'none', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', gap: 12 }}
      >
        <span style={{ fontSize: 'clamp(14px, 1.5vw, 18px)', fontWeight: 700, color: open ? '#159c48' : '#0f172a', fontFamily: "'Inter', sans-serif", textAlign: 'left' }}>
          {item.heading}
        </span>
        <ChevronDown size={18} color={open ? '#159c48' : '#94a3b8'} style={{ flexShrink: 0, transition: 'transform 0.3s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </button>
      {open && (
        <div style={{ padding: '4px 20px 20px 24px' }}>
          <ul style={{ margin: 0, padding: '0 0 0 16px', listStyle: 'disc' }}>
            <li style={{ fontSize: 'clamp(14px, 1.4vw, 17px)', color: '#374151', lineHeight: 1.9, fontFamily: "'Merriweather', serif", textAlign: 'justify' }}>
              {item.content}
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

function About() {
  const [apiSections, setApiSections] = useState([])
  const [founder, setFounder] = useState(null)
  const [apiOrgItems, setApiOrgItems] = useState([])

  useEffect(() => {
    fetch(`${BASE_URL}/api/about/sections`).then(r => r.json()).then(d => { if (Array.isArray(d) && d.length) setApiSections(d) }).catch(() => {})
    fetch(`${BASE_URL}/api/about/founder`).then(r => r.json()).then(d => { if (d?._id) setFounder(d) }).catch(() => {})
    fetch(`${BASE_URL}/api/about/org`).then(r => r.json()).then(d => { if (Array.isArray(d) && d.length) setApiOrgItems(d) }).catch(() => {})
  }, [])

  const displaySections = apiSections.length ? apiSections : sections
  const displayOrgItems = apiOrgItems.length ? apiOrgItems : orgItems
  const founderHeading = founder?.heading || 'Visionary Founder of Slyder Electronics'
  const founderSubhead = founder?.subheading || 'Early Education and Academic Background'
  const founderBio = founder?.bio || `Mr. S. Venkatesh, a dynamic entrepreneur and visionary leader, graduated with a degree in Commerce from the prestigious <strong>Ness Wadia College of Commerce in Pune</strong>.`
  const founderName = founder?.name || 'Mr. S. Venkatesh'
  const founderRole = founder?.role || 'Founder & CEO'
  const founderImgSrc = founder?.image ? `${BASE_URL}/uploads/founder/${founder.image}` : founderImg

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <style>{`
        .founder-grid {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 48px;
          padding: 40px clamp(16px, 6vw, 100px) 48px;
          align-items: flex-start;
        }
        @media (max-width: 768px) {
          .founder-grid { grid-template-columns: 1fr; gap: 28px; padding: 28px 16px 36px; }
        }
      `}</style>

      {/* Hero Banner */}
      <div style={{ position: 'relative', width: '100%', height: 'clamp(220px, 40vw, 340px)', overflow: 'hidden' }}>
        <img src={heroBg} alt="About Us" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.65) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#159c48', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>Who We Are</p>
          <h1 style={{ margin: 0, fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: 800, color: '#ffffff', fontFamily: "'Inter', sans-serif", textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}>About Us</h1>
          <div style={{ width: 64, height: 4, borderRadius: 2, background: '#159c48' }} />
        </div>
      </div>

      {displaySections.map((s, i) => <Section key={s._id || s.id || i} section={s} />)}

      {/* Founder Section */}
      <div style={{ borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ background: '#f1f5f9', borderTop: '1px solid #e2e8f0', padding: '24px 20px' }}>
          <h2 style={{ margin: 0, fontSize: 'clamp(18px, 2vw, 26px)', fontWeight: 700, color: '#0f172a', textAlign: 'center', fontFamily: "'Inter', sans-serif" }}>
            {founderHeading}
          </h2>
        </div>
        <div className="founder-grid">
          <div>
            <h3 style={{ margin: '0 0 16px', fontSize: 'clamp(16px, 1.5vw, 20px)', fontWeight: 700, color: '#159c48', fontFamily: "'Inter', sans-serif" }}>
              {founderSubhead}
            </h3>
            <p style={{ margin: 0, fontSize: 'clamp(15px, 1.5vw, 19px)', color: '#1e293b', lineHeight: 2, textAlign: 'justify', fontFamily: "'Merriweather', serif" }}
              dangerouslySetInnerHTML={{ __html: founderBio }} />
          </div>
          <div>
            <div style={{ width: '100%', borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '4px solid #f1f5f9' }}>
              <img src={founderImgSrc} alt={founderName} style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
            </div>
            <p style={{ margin: '12px 0 0', textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#64748b', fontFamily: "'Inter', sans-serif" }}>
              {founderName}<br />
              <span style={{ color: '#159c48', fontWeight: 600 }}>{founderRole}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Organizational Structure */}
      <div style={{ padding: 'clamp(24px, 4vw, 48px) clamp(16px, 4vw, 48px) 60px' }}>
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', boxShadow: '0 4px 32px rgba(0,0,0,0.07)', overflow: 'hidden', maxWidth: 900, margin: '0 auto' }}>
          <div style={{ background: '#f1f5f9', borderBottom: '1px solid #e2e8f0', padding: '24px 20px' }}>
            <h2 style={{ margin: 0, fontSize: 'clamp(18px, 2vw, 26px)', fontWeight: 700, color: '#0f172a', textAlign: 'center', fontFamily: "'Inter', sans-serif" }}>
              Organizational Structure of Slyder Electronics
            </h2>
          </div>
          {displayOrgItems.map((item, i) => <OrgItem key={i} item={item} />)}
        </div>
      </div>
    </div>
  )
}

export default About
