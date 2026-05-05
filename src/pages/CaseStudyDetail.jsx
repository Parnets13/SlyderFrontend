import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Tag, Eye, Building2 } from 'lucide-react'

const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/api$/, '') || 'https://slyderind.in'

const categoryColors = {
  Hospitality: { bg: '#e8f5e9', color: '#159c48' },
  Commercial:  { bg: '#e3f2fd', color: '#1565c0' },
  Residential: { bg: '#fff3e0', color: '#e65100' },
  Healthcare:  { bg: '#fce4ec', color: '#c62828' },
  Retail:      { bg: '#f3e5f5', color: '#6a1b9a' },
  General:     { bg: '#f1f5f9', color: '#475569' },
}

function CaseStudyDetail() {
  const { slug } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${BASE_URL}/api/case-studies/slug/${slug}`)
      .then(r => r.json())
      .then(data => setItem(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', paddingTop: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#64748b', fontSize: 18 }}>Loading...</div>
      </div>
    )
  }

  if (!item || item.message) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', paddingTop: 100 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>Case Study Not Found</h1>
          <p style={{ color: '#64748b', marginBottom: 24 }}>The case study you are looking for does not exist.</p>
          <Link to="/case-studies" style={{ color: '#159c48', fontWeight: 600, textDecoration: 'none' }}>
            &larr; Back to Case Studies
          </Link>
        </div>
      </div>
    )
  }

  const imgSrc = `${BASE_URL}/uploads/case-studies/${item.image}`
  const tagStyle = categoryColors[item.category] || categoryColors.General
  const formattedDate = new Date(item.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingTop: 100 }}>
      <article style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px 80px' }}>

        {/* Back */}
        <Link
          to="/case-studies"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            color: '#64748b', fontSize: 14, fontWeight: 600,
            textDecoration: 'none', marginBottom: 32,
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#159c48'}
          onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
        >
          <ArrowLeft size={16} />
          Back to Case Studies
        </Link>

        {/* Hero image */}
        <div style={{ width: '100%', height: 400, borderRadius: 16, overflow: 'hidden', marginBottom: 32, background: '#f1f5f9' }}>
          <img src={imgSrc} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Meta row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 14px', borderRadius: 20,
            fontSize: 12, fontWeight: 700, letterSpacing: '0.05em',
            background: tagStyle.bg, color: tagStyle.color,
          }}>
            <Tag size={11} />
            {item.category}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#64748b', fontWeight: 500 }}>
            <Building2 size={15} />
            {item.client}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#64748b', fontWeight: 500 }}>
            <Eye size={15} />
            {item.views} views
          </span>
          <span style={{ fontSize: 13, color: '#94a3b8' }}>{formattedDate}</span>
        </div>

        {/* Title */}
        <h1 style={{
          margin: '0 0 20px',
          fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 900,
          color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1.2,
        }}>
          {item.title}
        </h1>

        {/* Short description */}
        <p style={{ margin: '0 0 28px', fontSize: 18, color: '#64748b', lineHeight: 1.7, fontWeight: 500 }}>
          {item.shortDescription}
        </p>

        {/* Result highlight */}
        {item.result && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '16px 20px',
            background: 'rgba(21,156,72,0.07)',
            borderRadius: 12, marginBottom: 32,
            borderLeft: '4px solid #159c48',
          }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#159c48', flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#159c48' }}>
              Key Result: {item.result}
            </p>
          </div>
        )}

        {/* Divider */}
        <div style={{ width: 60, height: 4, background: 'linear-gradient(90deg, #159c48, #4ade80)', borderRadius: 4, marginBottom: 32 }} />

        {/* Full content */}
        <div
          style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}
          dangerouslySetInnerHTML={{ __html: item.content.replace(/\n/g, '<br/>') }}
        />

        {/* CTA */}
        <div style={{
          marginTop: 60, padding: 32,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          borderRadius: 12, textAlign: 'center',
        }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 24, fontWeight: 800, color: '#fff' }}>
            Want similar results for your business?
          </h3>
          <p style={{ margin: '0 0 20px', fontSize: 15, color: 'rgba(255,255,255,0.7)' }}>
            Talk to our team about the right lock solution for you.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/contact"
              style={{
                display: 'inline-block', padding: '12px 32px',
                background: '#159c48', color: '#fff',
                fontSize: 15, fontWeight: 700, borderRadius: 8,
                textDecoration: 'none', transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#117a38'}
              onMouseLeave={e => e.currentTarget.style.background = '#159c48'}
            >
              Contact Us
            </Link>
            <Link
              to="/case-studies"
              style={{
                display: 'inline-block', padding: '12px 32px',
                background: 'rgba(255,255,255,0.1)', color: '#fff',
                fontSize: 15, fontWeight: 700, borderRadius: 8,
                textDecoration: 'none', transition: 'background 0.2s ease',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              More Case Studies
            </Link>
          </div>
        </div>

      </article>
    </div>
  )
}

export default CaseStudyDetail
