import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Tag } from 'lucide-react'
import heroBg from '../assets/cor2.jpg'

const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/api$/, '') || 'https://slyderind.in'

const categoryColors = {
  Hospitality: { bg: '#e8f5e9', color: '#159c48' },
  Commercial:  { bg: '#e3f2fd', color: '#1565c0' },
  Residential: { bg: '#fff3e0', color: '#e65100' },
  Healthcare:  { bg: '#fce4ec', color: '#c62828' },
  Retail:      { bg: '#f3e5f5', color: '#6a1b9a' },
  General:     { bg: '#f1f5f9', color: '#475569' },
}

function CaseStudyCard({ item }) {
  const imgSrc = `${BASE_URL}/uploads/case-studies/${item.image}`
  const tagStyle = categoryColors[item.category] || categoryColors.General

  return (
    <Link
      to={`/case-studies/${item.slug}`}
      style={{
        display: 'block',
        background: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
        textDecoration: 'none',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'all 0.3s ease',
      }}
      className="cs-card"
    >
      {/* Image */}
      <div style={{ position: 'relative', paddingTop: '58%', overflow: 'hidden', background: '#f1f5f9' }}>
        <img
          src={imgSrc}
          alt={item.title}
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.35s ease',
          }}
          className="cs-card-img"
        />
        {item.isFeatured && (
          <div style={{
            position: 'absolute', top: 14, left: 14,
            padding: '5px 12px',
            background: '#159c48', color: '#fff',
            fontSize: 11, fontWeight: 700,
            borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.05em',
          }}>
            Featured
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '22px 24px 20px' }}>
        {/* Category tag */}
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '4px 11px',
          borderRadius: 20,
          fontSize: 11, fontWeight: 700, letterSpacing: '0.05em',
          background: tagStyle.bg, color: tagStyle.color,
          marginBottom: 14,
        }}>
          <Tag size={10} />
          {item.category}
        </span>

        {/* Title */}
        <h3 style={{
          margin: '0 0 10px',
          fontSize: 18, fontWeight: 800, color: '#0f172a', lineHeight: 1.35,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {item.title}
        </h3>

        {/* Client */}
        <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {item.client}
        </p>

        {/* Short description */}
        <p style={{
          margin: '0 0 16px', fontSize: 14, color: '#64748b', lineHeight: 1.65,
          display: '-webkit-box', WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {item.shortDescription}
        </p>

        {/* Result highlight */}
        {item.result && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 12px',
            background: 'rgba(21,156,72,0.07)',
            borderRadius: 8, marginBottom: 16,
            borderLeft: '3px solid #159c48',
          }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#159c48' }}>
              {item.result}
            </p>
          </div>
        )}

        {/* Read more */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          color: '#159c48', fontSize: 14, fontWeight: 700,
        }} className="cs-card-link">
          Read Case Study
          <ArrowRight size={15} className="cs-card-arrow" />
        </div>
      </div>
    </Link>
  )
}

function CaseStudies() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${BASE_URL}/api/case-studies`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setItems(data) })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{ position: 'relative', width: '100%', height: 'clamp(200px, 40vw, 340px)', overflow: 'hidden' }}>
        <img src={heroBg} alt="Case Studies" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.65) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#159c48', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>
            Real Results
          </p>
          <h1 style={{ margin: 0, fontSize: 'clamp(30px, 6vw, 52px)', fontWeight: 800, color: '#ffffff', fontFamily: "'Inter', sans-serif", textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}>
            Case Studies
          </h1>
          <div style={{ width: 64, height: 4, borderRadius: 2, background: '#159c48' }} />
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 'clamp(36px, 5vw, 64px) clamp(16px, 5vw, 80px) clamp(40px, 5vw, 80px)', background: '#f8fafc' }}>

        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 700, color: '#159c48', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>
            Success Stories
          </p>
          <h2 style={{ margin: '0 0 16px', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, color: '#0f172a', fontFamily: "'Inter', sans-serif" }}>
            How Slyder Delivers Results
          </h2>
          <div style={{ width: 56, height: 4, borderRadius: 2, background: '#159c48', margin: '0 auto 16px' }} />
          <p style={{ margin: '0 auto', fontSize: 'clamp(14px, 1.5vw, 17px)', color: '#64748b', maxWidth: 580, lineHeight: 1.8 }}>
            From luxury hotels to corporate campuses, see how our smart lock solutions have transformed security and operations for our clients.
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#64748b', fontSize: 16 }}>Loading case studies...</div>
        ) : items.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: 28,
            maxWidth: 1200,
            margin: '0 auto',
          }}>
            {items.map(item => <CaseStudyCard key={item._id} item={item} />)}
          </div>
        ) : (
          <div style={{ padding: 60, textAlign: 'center', background: '#fff', borderRadius: 12, color: '#64748b', maxWidth: 600, margin: '0 auto' }}>
            No case studies available yet. Check back soon!
          </div>
        )}

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 64 }}>
          <p style={{ margin: '0 0 20px', fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 700, color: '#0f172a' }}>
            Ready to write your own success story?
          </p>
          <a
            href="/contact"
            style={{
              display: 'inline-block', padding: '14px 36px',
              borderRadius: 50, background: '#159c48', color: '#fff',
              fontWeight: 700, fontSize: 15, textDecoration: 'none',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#117a38'}
            onMouseLeave={e => e.currentTarget.style.background = '#159c48'}
          >
            Get in Touch &rarr;
          </a>
        </div>
      </div>

      <style>{`
        .cs-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.12); border-color: rgba(21,156,72,0.2); }
        .cs-card:hover .cs-card-img { transform: scale(1.05); }
        .cs-card:hover .cs-card-link { color: #117a38; }
        .cs-card-arrow { transition: transform 0.3s ease; }
        .cs-card:hover .cs-card-arrow { transform: translateX(4px); }
      `}</style>
    </div>
  )
}

export default CaseStudies
