import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import heroBg from '../assets/11hotel.jpg'
import indiaMap from '../assets/India Map.jfif'

const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api$/, '')

function DistributorNetwork() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(`${BASE_URL}/api/distributor`)
      .then(r => r.json())
      .then(d => { if (d?.title) setData(d) })
      .catch(() => {})
  }, [])

  const title = data?.title || 'Nationwide Training Programs'
  const description = data?.description || `To further strengthen its network's capabilities, Slyder Electronics conducts nationwide training programs for its partners, technicians, and sales teams. These programs ensure that everyone in the network is well-versed in the latest technologies, features, and solutions offered by the company.\n\nSlyder Electronics' commitment to excellence goes beyond innovation in hotel lock solutions; it extends to its comprehensive nationwide service and sales network.`
  const imageSrc = data?.image ? `${BASE_URL}/uploads/distributor/${data.image}` : indiaMap

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <style>{`
        .dist-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }
        @media (max-width: 768px) {
          .dist-grid { grid-template-columns: 1fr; gap: 32px; }
        }
      `}</style>

      {/* Hero Banner — header overlays this transparently */}
      <div style={{ position: 'relative', width: '100%', height: 'clamp(200px, 40vw, 340px)', overflow: 'hidden' }}>
        <img src={heroBg} alt="Distributor Network" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.65) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#159c48', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>Our Reach</p>
          <h1 style={{ margin: 0, fontSize: 'clamp(28px, 6vw, 52px)', fontWeight: 800, color: '#ffffff', fontFamily: "'Inter', sans-serif", textShadow: '0 2px 16px rgba(0,0,0,0.4)', textAlign: 'center', padding: '0 16px' }}>
            Distributor Network
          </h1>
          <div style={{ width: 64, height: 4, borderRadius: 2, background: '#159c48' }} />
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 'clamp(32px, 5vw, 60px) clamp(16px, 4vw, 60px) clamp(40px, 5vw, 80px)', background: '#f1f5f9' }}>
        <div style={{ background: '#ffffff', borderRadius: 20, boxShadow: '0 8px 40px rgba(0,0,0,0.10)', border: '1px solid #e2e8f0', padding: 'clamp(28px, 5vw, 56px) clamp(20px, 5vw, 64px)' }}>
          <div className="dist-grid">
            <div>
              <h2 style={{ margin: '0 0 24px', fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 700, color: '#0f172a', fontFamily: "'Inter', sans-serif", borderBottom: '3px solid #159c48', paddingBottom: 12, display: 'inline-block' }}>
                {title}
              </h2>
              {description.split('\n\n').map((para, i) => (
                <p key={i} style={{ margin: '0 0 20px', fontSize: 'clamp(15px, 1.5vw, 17px)', color: '#374151', lineHeight: 2, textAlign: 'justify', fontFamily: "'Merriweather', serif" }}>
                  {para}
                </p>
              ))}
              <Link
                to="/become-distributor"
                style={{ display: 'inline-block', background: '#159c48', color: '#fff', fontSize: 16, fontWeight: 700, fontFamily: "'Inter', sans-serif", padding: '14px 32px', borderRadius: 8, textDecoration: 'none', letterSpacing: '0.02em', transition: 'background 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#117a38' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#159c48' }}
              >
                Become Distributor →
              </Link>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={imageSrc} alt="Slyder Electronics India Distributor Map" style={{ width: '100%', maxWidth: 480, height: 'auto', display: 'block', objectFit: 'contain' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DistributorNetwork
