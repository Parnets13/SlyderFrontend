import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { ArrowRight } from 'lucide-react'

import img1 from '../assets/pr1.png'
import img2 from '../assets/pr2.png'
import img3 from '../assets/pr3.jpg'
import img4 from '../assets/pr4.png'
import img5 from '../assets/pr5.png'
import img6 from '../assets/cor1.png'
import img7 from '../assets/cor2.jpg'
import img8 from '../assets/cor3.png'

const BASE_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace(/\/api$/, '')
  : 'https://slyderind.in'

const FALLBACK = [
  { _id: '1', name: 'Slyder Hotel Lock', _local: img1, specs: [{ spec: 'Technology', desc: 'RFID & Bluetooth' }, { spec: 'Origin', desc: '100% Made in India' }, { spec: 'Alert System', desc: 'Real-time Transaction Alerts' }, { spec: 'Management', desc: 'Cloud-based Software' }] },
  { _id: '2', name: 'RFID Reader', _local: img2, specs: [{ spec: 'Operation', desc: 'Standalone' }, { spec: 'Body', desc: 'Durable Metal' }, { spec: 'Compatibility', desc: 'Wide Card Support' }, { spec: 'Installation', desc: 'Easy Plug & Play' }] },
  { _id: '3', name: 'Lock Management Software', _local: img3, specs: [{ spec: 'Dashboard', desc: 'Centralized Control' }, { spec: 'Monitoring', desc: 'Live Lock Status' }, { spec: 'Support', desc: 'Multi-property' }, { spec: 'Reports', desc: 'Audit Trail & Logs' }] },
  { _id: '4', name: 'Encoder', _local: img4, specs: [{ spec: 'Speed', desc: 'Fast Card Encoding' }, { spec: 'Cards', desc: 'All Types Supported' }, { spec: 'Interface', desc: 'USB Plug & Play' }, { spec: 'Design', desc: 'Compact Desktop' }] },
  { _id: '5', name: 'Key Cylinder', _local: img5, specs: [{ spec: 'Material', desc: 'Brass' }, { spec: 'Width', desc: '35mm' }, { spec: 'Keys', desc: '2 Individual Computerised Keys' }, { spec: 'Security', desc: 'Anti-pick & Anti-drill' }] },
  { _id: '6', name: 'Power Saving Switch', _local: img6, specs: [{ spec: 'Control', desc: 'Smart Energy Management' }, { spec: 'Activation', desc: 'Card-activated Power' }, { spec: 'Benefit', desc: 'Reduces Electricity Cost' }, { spec: 'Install', desc: 'Easy Retrofit' }] },
  { _id: '7', name: 'DND Electronic Panel', _local: img7, specs: [{ spec: 'Function', desc: 'Do Not Disturb Signal' }, { spec: 'Display', desc: 'LED Indicator' }, { spec: 'Notification', desc: 'Wireless' }, { spec: 'Design', desc: 'Elegant Panel' }] },
  { _id: '8', name: 'Door Accessories', _local: img8, specs: [{ spec: 'Build', desc: 'Heavy-duty' }, { spec: 'Resistance', desc: 'Corrosion Resistant' }, { spec: 'Finish', desc: 'Multiple Options' }, { spec: 'Hardware', desc: 'Premium Grade' }] },
]

function LocksAccessories() {
  const [products, setProducts] = useState(FALLBACK)

  useEffect(() => {
    fetch(`${BASE_URL}/api/featured-products`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data.map((p, i) => ({
            ...p,
            specs: p.specs?.length ? p.specs : FALLBACK[i % FALLBACK.length].specs,
          })))
        }
      })
      .catch(() => {})
  }, [])

  const imgSrc = (p) => p._local ? p._local : `${BASE_URL}/uploads/featured/${p.image}`

  const h1Text = 'Locks & Accessories'
  const metaDescription = 'Premium hotel security solutions — engineered & manufactured in India. Slyder Hotel Lock, RFID Reader, Lock Management Software, and more.'

  return (
    <section style={{ background: '#f1f5f9', padding: '60px 0 80px' }}>
      {/* SEO: H1 and Meta Description */}
      <Helmet>
        <meta name="description" content={metaDescription} />
      </Helmet>

      {/* Header */}
      <div style={{ width: '90%', margin: '0 auto', paddingBottom: 40 }}>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#159c48' }}>
          Our Products
        </p>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <h1 style={{ margin: 0, fontSize: 'clamp(26px, 3vw, 48px)', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
            {h1Text}
          </h1>
          <a href="/products" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 28px', borderRadius: 100,
            background: '#159c48', color: '#fff',
            fontSize: 14, fontWeight: 700, textDecoration: 'none',
            boxShadow: '0 4px 18px rgba(21,156,72,0.3)',
          }}>
            View All <ArrowRight size={15} />
          </a>
        </div>
        <p style={{ margin: '12px 0 0', fontSize: 16, color: '#64748b' }}>
          Premium hotel security solutions — engineered &amp; manufactured in India.
        </p>
      </div>

      {/* Cards */}
      <div style={{ width: '90%', margin: '0 auto' }}>
        {products.map((p, i) => (
          <div key={p._id} className="product-sticky-wrapper" style={{ position: 'sticky', top: 60 + i * 12, zIndex: i + 1 }}>
            <ProductCard product={p} imgSrc={imgSrc(p)} index={i} />
          </div>
        ))}
        <div style={{ height: 80 }} />
      </div>

      <style>{`
        @media (max-width: 640px) {
          .product-card-grid { grid-template-columns: 1fr !important; height: auto !important; min-height: unset !important; max-height: unset !important; }
          .product-card-img { height: 220px !important; order: 0 !important; }
          .product-card-content { order: 1 !important; padding: 24px 20px !important; }
        }
      `}</style>
    </section>
  )
}

function ProductCard({ product, imgSrc, index }) {
  const flip = index % 2 !== 0
  const dark = flip

  return (
    <div
      className="product-card-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        borderRadius: 24, overflow: 'hidden',
        background: dark ? '#0f172a' : '#fff',
        boxShadow: '0 8px 48px rgba(0,0,0,0.10)',
        border: dark ? 'none' : '1px solid rgba(0,0,0,0.05)',
        height: '70vh', minHeight: 340, maxHeight: 580,
      }}
    >
      <div className="product-card-img" style={{ order: flip ? 1 : 0, overflow: 'hidden', background: '#e2e8f0' }}>
        <img src={imgSrc} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>

      <div className="product-card-content" style={{
        order: flip ? 0 : 1,
        padding: 'clamp(24px, 4vw, 52px) clamp(20px, 4vw, 60px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20,
      }}>
        <h3 style={{ margin: 0, fontSize: 'clamp(22px, 2.8vw, 42px)', fontWeight: 900, color: dark ? '#f8fafc' : '#0f172a', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
          {product.name}
        </h3>
        <div style={{ width: 52, height: 4, borderRadius: 4, background: '#159c48' }} />
        {product.specs?.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {product.specs.slice(0, 4).map((s, j) => (
              <div key={j} style={{ display: 'flex', alignItems: 'baseline', gap: 12, padding: '12px 0', borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'}`, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#159c48', textTransform: 'uppercase', letterSpacing: '0.1em', minWidth: 90, flexShrink: 0 }}>
                  {s.spec}
                </span>
                <span style={{ fontSize: 'clamp(14px, 1.5vw, 18px)', fontWeight: 600, color: dark ? '#e2e8f0' : '#1e293b', lineHeight: 1.3 }}>
                  {s.desc}
                </span>
              </div>
            ))}
          </div>
        )}
        <CtaButton />
      </div>
    </div>
  )
}

function CtaButton() {
  const [hovered, setHovered] = useState(false)
  return (
    <div>
      <style>{`
        @keyframes arrowPulse { 0%{transform:rotate(-45deg) scale(1)} 50%{transform:rotate(-45deg) scale(1.25)} 100%{transform:rotate(-45deg) scale(1)} }
      `}</style>
      <a
        href="/products"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '12px 24px', borderRadius: 12,
          background: '#159c48', color: '#fff',
          fontSize: 15, fontWeight: 700, textDecoration: 'none',
          boxShadow: hovered ? '0 8px 28px rgba(21,156,72,0.55)' : '0 6px 20px rgba(21,156,72,0.35)',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        Get in touch
        <span style={{
          width: 36, height: 36, borderRadius: '50%',
          background: hovered ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.3s ease',
          animation: hovered ? 'arrowPulse 0.6s ease' : 'none',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff"
            strokeWidth={hovered ? 3 : 2} strokeLinecap="round" strokeLinejoin="round"
            style={{ transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)', transform: hovered ? 'rotate(-45deg)' : 'rotate(0deg)' }}>
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </a>
    </div>
  )
}

export default LocksAccessories
