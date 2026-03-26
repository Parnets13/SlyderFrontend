import { useState, useEffect, useRef } from 'react'

const BASE_URL = (import.meta.env.VITE_API_URL || 'https://slyderind.onrender.com/api').replace(/\/api$/, '')

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
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 32 }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="28" height="28" viewBox="0 0 24 24" fill={i < count ? '#f59e0b' : '#d1d5db'}>
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
        border: active ? '3px solid #fff' : '2px solid #e2e8f0',
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
        ? <img src={imgSrc} alt={t.author} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: active ? 'none' : 'grayscale(100%)', transition: 'filter 0.3s ease' }} />
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

  return (
    <section style={{ background: '#fff', padding: '100px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
        <Stars count={t.rating ?? 5} />
        <p style={{
          margin: '0 0 36px',
          fontSize: 'clamp(20px, 2.4vw, 28px)',
          fontWeight: 700, lineHeight: 1.55, color: '#0f172a', letterSpacing: '-0.01em',
          opacity: fading ? 0 : 1,
          transform: fading ? 'translateY(8px)' : 'translateY(0)',
          transition: 'opacity 0.28s ease, transform 0.28s ease',
        }}>
          "{t.quote || t.text}"
        </p>
        <p style={{
          margin: '0 0 32px', fontSize: 15, color: '#64748b', fontWeight: 500,
          opacity: fading ? 0 : 1, transition: 'opacity 0.28s ease',
        }}>
          {t.author || t.hotel}{t.role ? `, ${t.role}` : ''}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {items.map((item, i) => (
            <Avatar key={i} t={item} i={i} active={i === active} onClick={() => goTo(i)} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonial
