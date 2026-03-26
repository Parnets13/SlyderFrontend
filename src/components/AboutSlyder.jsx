import { CheckCircle2, Award, Users, Globe, Cpu } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const ICONS = [Award, Globe, Cpu, Users]

function parseValue(val) {
  const match = String(val).match(/^([^0-9]*)(\d+)([^0-9]*)$/)
  if (!match) return { prefix: '', number: null, suffix: val }
  return { prefix: match[1], number: parseInt(match[2], 10), suffix: match[3] }
}

function useCountUp(target, duration = 1800, started = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started || target === null) return
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])
  return count
}

function StatCard({ s, i, started }) {
  const isAccent = i === 0
  const Icon = ICONS[i % ICONS.length]
  const { prefix, number, suffix } = parseValue(s.value)
  const count = useCountUp(number, 1800, started)
  const display = number !== null ? `${prefix}${count}${suffix}` : s.value

  return (
    <div
      style={{
        borderRadius: 24, padding: '28px 20px',
        background: isAccent ? 'linear-gradient(135deg, #159c48 0%, #16a34a 100%)' : 'rgba(255,255,255,0.04)',
        border: isAccent ? 'none' : '1px solid rgba(255,255,255,0.08)',
        boxShadow: isAccent ? '0 20px 48px rgba(21,156,72,0.35)' : 'none',
        transition: 'transform 0.28s ease, box-shadow 0.28s ease',
        cursor: 'default', position: 'relative', overflow: 'hidden',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; if (!isAccent) e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.3)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; if (!isAccent) e.currentTarget.style.boxShadow = 'none' }}
    >
      <div style={{ position: 'absolute', top: -24, right: -24, width: 80, height: 80, borderRadius: '50%', background: isAccent ? 'rgba(255,255,255,0.1)' : 'rgba(21,156,72,0.06)' }} />
      <div style={{ width: 36, height: 36, borderRadius: 12, marginBottom: 16, background: isAccent ? 'rgba(255,255,255,0.2)' : 'rgba(21,156,72,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={17} color={isAccent ? '#fff' : '#4ade80'} />
      </div>
      <p style={{ margin: '0 0 6px', fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 900, lineHeight: 1, color: isAccent ? '#fff' : '#f8fafc', fontVariantNumeric: 'tabular-nums' }}>
        {display}
      </p>
      <p style={{ margin: 0, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: isAccent ? 'rgba(255,255,255,0.75)' : 'rgba(248,250,252,0.4)' }}>
        {s.label}
      </p>
    </div>
  )
}

const API_URL = (import.meta.env.VITE_API_URL || 'https://slyderind.onrender.com/api')

const DEFAULTS = {
  heading: 'Welcome To',
  subheading: 'Slyder Electronics',
  description: "Slyder Electronics revolutionized the hospitality industry with innovative electronic lock solutions. Established in 2006, Slyder emerged as India's frontrunner in cutting-edge hotel locks — driven by quality, innovation, and customer satisfaction.",
  points: [
    'Frontrunner in hotel electronic lock solutions since 2006',
    "Designed India's first RFID Reader for hotel lock systems",
    'Built indigenous Lock Management Software from scratch',
    'Trusted by hundreds of hotels across India',
  ],
  stats: [
    { value: '2006', label: 'Established' },
    { value: '18+', label: 'Years of Excellence' },
    { value: '100%', label: 'Made in India' },
    { value: '#1', label: 'RFID in India' },
  ],
  pioneerTitle: 'Industry Pioneer',
  pioneerText: 'First to design & manufacture RFID Reader + Lock Management Software in India',
}

function AboutSlyder() {
  const statsRef = useRef(null)
  const [started, setStarted] = useState(false)
  const [data, setData] = useState(DEFAULTS)

  useEffect(() => {
    fetch(`${API_URL}/about-slyder`)
      .then(r => r.json())
      .then(d => { if (d && d.heading) setData(d) })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  const stats = data.stats?.length ? data.stats : DEFAULTS.stats
  const points = data.points?.length ? data.points : DEFAULTS.points

  return (
    <section style={{ background: '#0f172a', padding: '80px 0', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(21,156,72,0.15) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(21,156,72,0.1) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
          <div style={{ width: 40, height: 2, background: '#159c48', borderRadius: 2 }} />
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#159c48' }}>
            About Slyder Electronics
          </span>
        </div>

        {/* Two-column on md+, single column on mobile */}
        <div className="about-slyder-grid">
          {/* LEFT */}
          <div>
            <h2 style={{ margin: '0 0 8px', fontSize: 'clamp(30px, 4vw, 56px)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.03em', color: '#f8fafc' }}>
              {data.heading}
            </h2>
            <h2 style={{ margin: '0 0 28px', fontSize: 'clamp(30px, 4vw, 56px)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.03em', background: 'linear-gradient(90deg, #159c48 0%, #4ade80 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {data.subheading}
            </h2>
            <p style={{ margin: '0 0 32px', fontSize: 16, lineHeight: 1.85, color: 'rgba(248,250,252,0.55)' }}>
              {data.description}
            </p>
            <ul style={{ margin: '0 0 40px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {points.map((p, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ flexShrink: 0, marginTop: 1, width: 22, height: 22, borderRadius: '50%', background: 'rgba(21,156,72,0.15)', border: '1px solid rgba(21,156,72,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle2 size={12} color="#4ade80" />
                  </div>
                  <span style={{ fontSize: 14, color: 'rgba(248,250,252,0.7)', fontWeight: 500, lineHeight: 1.6 }}>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — Stats */}
          <div ref={statsRef} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {stats.map((s, i) => (
              <StatCard key={i} s={s} i={i} started={started} />
            ))}
            <div style={{ gridColumn: '1 / -1', borderRadius: 24, padding: '20px 24px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(21,156,72,0.2)', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, flexShrink: 0, background: 'linear-gradient(135deg, #159c48, #16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 18px rgba(21,156,72,0.4)' }}>
                <Award size={20} color="#fff" />
              </div>
              <div>
                <p style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 800, color: '#f8fafc' }}>{data.pioneerTitle}</p>
                <p style={{ margin: 0, fontSize: 13, color: 'rgba(248,250,252,0.45)', lineHeight: 1.5 }}>{data.pioneerText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-slyder-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        @media (max-width: 768px) {
          .about-slyder-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
    </section>
  )
}

export default AboutSlyder
