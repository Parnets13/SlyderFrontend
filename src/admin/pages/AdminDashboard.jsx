import { useState, useEffect } from 'react'
import { Package, MessageSquare, Megaphone, Phone, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getFeaturedProducts, getTestimonials, getAnnouncements } from '../api'

const cards = [
  { label: 'Products',      icon: Package,       path: '/admin/products',      color: '#159c48', bg: '#f0fdf4', border: '#bbf7d0' },
  { label: 'Testimonials',  icon: MessageSquare, path: '/admin/testimonials',  color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe' },
  { label: 'Announcements', icon: Megaphone,     path: '/admin/announcements', color: '#f59e0b', bg: '#fffbeb', border: '#fde68a' },
  { label: 'Contact Info',  icon: Phone,         path: '/admin/contact',       color: '#8b5cf6', bg: '#f5f3ff', border: '#ddd6fe' },
]

function StatCard({ label, icon: Icon, path, color, bg, border, count }) {
  return (
    <Link to={path} style={{ textDecoration: 'none' }}>
      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: bg, border: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={22} color={color} />
          </div>
          <ExternalLink size={16} color="#94a3b8" />
        </div>
        <p style={{ margin: '0 0 4px', fontSize: 28, fontWeight: 800, color: '#0f172a', fontFamily: "'Inter', sans-serif" }}>
          {count ?? '—'}
        </p>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#64748b', fontFamily: "'Inter', sans-serif" }}>{label}</p>
      </div>
    </Link>
  )
}

function AdminDashboard() {
  const [counts, setCounts] = useState([null, null, null, 1])

  useEffect(() => {
    Promise.allSettled([
      getFeaturedProducts(),
      getTestimonials(),
      getAnnouncements(),
    ]).then(([products, testimonials, announcements]) => {
      setCounts([
        products.status === 'fulfilled' ? products.value.length : 0,
        testimonials.status === 'fulfilled' ? testimonials.value.length : 0,
        announcements.status === 'fulfilled' ? announcements.value.length : 0,
        1,
      ])
    })
  }, [])

  return (
    <div style={{ padding: '40px 48px' }}>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ margin: '0 0 6px', fontSize: 28, fontWeight: 800, color: '#0f172a', fontFamily: "'Inter', sans-serif" }}>Dashboard</h1>
        <p style={{ margin: 0, fontSize: 15, color: '#64748b', fontFamily: "'Inter', sans-serif" }}>Manage your Slyder Electronics website content</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 48 }}>
        {cards.map((c, i) => <StatCard key={c.label} {...c} count={counts[i]} />)}
      </div>

      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', padding: '28px 32px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
        <h2 style={{ margin: '0 0 6px', fontSize: 18, fontWeight: 700, color: '#0f172a', fontFamily: "'Inter', sans-serif" }}>Quick Links</h2>
        <p style={{ margin: '0 0 20px', fontSize: 14, color: '#64748b', fontFamily: "'Inter', sans-serif" }}>View live pages</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {['/', '/about', '/products', '/projects', '/contact', '/distributors'].map(path => (
            <a key={path} href={path} target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, background: '#f1f5f9', border: '1px solid #e2e8f0', fontSize: 13, fontWeight: 600, color: '#374151', textDecoration: 'none', fontFamily: "'Inter', sans-serif", transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#e2e8f0'}
              onMouseLeave={e => e.currentTarget.style.background = '#f1f5f9'}
            >
              <ExternalLink size={13} /> {path === '/' ? 'Home' : path.replace('/', '')}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
