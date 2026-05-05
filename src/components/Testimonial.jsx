import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'

const BASE_URL = (import.meta.env.VITE_API_URL || 'https://slyderind.in/api').replace(/\/api$/, '')

const FALLBACK = [
  {
    quote: "Slyder Hotel Locks' RFID technology has streamlined security for our guests. Their impeccable products are matched by their unparalleled after-sales service, available around the clock, ensuring complete customer contentment.",
    author: 'Gemini Group of Hotels',
    role: 'General Manager',
  },
  {
    quote: "We have been using Slyder's hotel lock system for over 5 years. The quality is outstanding and the Made in India RFID reader works flawlessly. Highly recommended for any hotel looking to upgrade their security.",
    author: 'The Chevron Hotel',
    role: 'Operations Head',
  },
  {
    quote: "The lock management software provided by Slyder is intuitive and powerful. It has given us complete control over room access and significantly improved our guest experience.",
    author: 'Best Western India',
    role: 'Front Office Manager',
  },
  {
    quote: "Slyder's transaction alert feature is a game changer. We get real-time notifications for every access event. Their support team is always available and extremely responsive.",
    author: "Chairman's Club & Resort",
    role: 'Security Director',
  },
]

const AVATAR_COLORS = ['#94a3b8', '#64748b', '#cbd5e1', '#475569']

function Stars({ count = 5 }) {
  return (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 28 }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill={i < count ? '#f59e0b' : 'rgba(255,255,255,0.2)'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function Avatar({ t, i, active, onClick }) {
  const imgSrc = t.image ? `${BASE_URL}/uploads/testimonials/${t.image}` : null
  return (
    <button
      onClick={onClick}
      style={{
        width: active ? 52 : 44,
        height: active ? 52 : 44,
        borderRadius: '50%',
        border: active ? '3px solid rgba(255,255,255,0.9)' : '2px solid rgba(255,255,255,0.25)',
        background: AVATAR_COLORS[i % AVATAR_COLORS.length],
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        outline: 'none',
        flexShrink: 0,
        boxShadow: active ? '0 0 0 3px #f59e0b' : 'none',
        marginLeft: i > 0 ? 8 : 0,
        zIndex: active ? 10 : 1,
        position: 'relative',
        overflow: 'hidden',
        padding: 0,
        fontSize: 13,
        fontWeight: 800,
        color: '#fff',
      }}
      aria-label={t.author}
    >
      {imgSrc
        ? <img src={imgSrc} alt={t.author} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: active ? 'none' : 'grayscale(60%)', transition: 'filter 0.3s ease' }} />
        : (t.author?.slice(0, 2).toUpperCase())
      }
    </button>
  )
}

function Testimonial() {
  const [items, setItems] = useState(FALLBACK)
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    fetch(`${BASE_URL}/api/testimonials`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setItems(data) })
      .catch(() => {})
  }, [])

  const goTo = (idx) => {
    if (idx === active) return
    setFading(true)
    setTimeout(() => { setActive(idx); setFading(false) }, 280)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setFading(true)
      setTimeout(() => { setActive(prev => (prev + 1) % items.length); setFading(false) }, 280)
    }, 5000)
    return () => clearInterval(timerRef.current)
  }, [items.length])

  const t = items[active]

  const h1Text = 'What Our Clients Say'
  const metaDescription = 'Read testimonials from leading hotels across India who trust Slyder for their security needs - Real reviews from satisfied customers about our hotel lock systems.'

  return (
    <section style={{
      padding: '100px 24px',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f2a1a 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* SEO: H1 and Meta Description */}
      <Helmet>
        <meta name="description" content={metaDescription} />
      </Helmet>

      {/* Visually hidden H1 for SEO */}
      <h1 style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        borderWidth: 0,
      }}>
        {h1Text}
      </h1>

      {/* Background blobs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '-20%', left: '-10%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(21,156,72,0.18) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-20%', right: '-10%',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(21,156,72,0.12) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)',
        }} />
      </div>

      {/* Section label */}
      <div style={{ textAlign: 'center', marginBottom: 48, position: 'relative', zIndex: 1 }}>
        <span style={{
          display: 'inline-block', fontSize: 11, fontWeight: 800,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          padding: '6px 18px', borderRadius: 100,
          background: 'rgba(21,156,72,0.15)',
          border: '1px solid rgba(21,156,72,0.35)',
          color: '#4ade80',
          backdropFilter: 'blur(8px)',
        }}>
          What Our Clients Say
        </span>
      </div>

      {/* Glass card */}
      <div style={{
        maxWidth: 780, margin: '0 auto', position: 'relative', zIndex: 1,
        background: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 28,
        padding: 'clamp(36px, 5vw, 64px) clamp(28px, 5vw, 72px)',
        boxShadow: '0 8px 64px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)',
        textAlign: 'center',
      }}>

        {/* Quote icon */}
        <div style={{ marginBottom: 20 }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ opacity: 0.25 }}>
            <text x="0" y="36" fontSize="52" fill="white" fontFamily="Georgia, serif">"</text>
          </svg>
        </div>

        <Stars count={t.rating ?? 5} />

        <p style={{
          margin: '0 0 36px',
          fontSize: 'clamp(17px, 2.2vw, 24px)',
          fontWeight: 500,
          lineHeight: 1.7,
          color: 'rgba(255,255,255,0.88)',
          letterSpacing: '-0.01em',
          fontStyle: 'italic',
          opacity: fading ? 0 : 1,
          transform: fading ? 'translateY(10px)' : 'translateY(0)',
          transition: 'opacity 0.28s ease, transform 0.28s ease',
        }}>
          "{t.quote || t.text}"
        </p>

        {/* Divider */}
        <div style={{
          width: 48, height: 2, borderRadius: 2,
          background: 'linear-gradient(90deg, transparent, #159c48, transparent)',
          margin: '0 auto 28px',
        }} />

        <p style={{
          margin: '0 0 32px',
          fontSize: 14,
          color: 'rgba(255,255,255,0.55)',
          fontWeight: 600,
          letterSpacing: '0.03em',
          textTransform: 'uppercase',
          opacity: fading ? 0 : 1,
          transition: 'opacity 0.28s ease',
        }}>
          {t.author || t.hotel}{t.role ? ` · ${t.role}` : ''}
        </p>

        {/* Avatars */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {items.map((item, i) => (
            <Avatar key={i} t={item} i={i} active={i === active} onClick={() => goTo(i)} />
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32, position: 'relative', zIndex: 1 }}>
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === active ? 24 : 8,
              height: 8,
              borderRadius: 4,
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              background: i === active ? '#159c48' : 'rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease',
            }}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Testimonial
