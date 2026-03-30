import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { LayoutDashboard, Package, MessageSquare, Megaphone, Phone, PhoneCall, Image, Layers, Video, Building2, Star, FileText, MapPin, Images, UserPlus, ClipboardList, LogOut, Menu, X } from 'lucide-react'
import { apiLogout, isAuthenticated } from './api'
import logo from '../assets/logo.jpeg'

const navItems = [
  { label: 'Dashboard',          icon: LayoutDashboard, path: '/admin/dashboard' },
  { label: 'Banners',            icon: Image,           path: '/admin/banners' },
  { label: 'Featured Products',  icon: Layers,          path: '/admin/featured-products' },
  { label: 'Videos',             icon: Video,           path: '/admin/videos' },
  { label: 'Hotels / Clients',   icon: Building2,       path: '/admin/hotels' },
  { label: 'Star Clients',        icon: Star,            path: '/admin/star-clients' },
  { label: 'About Page',         icon: FileText,        path: '/admin/about' },
  { label: 'About Slyder',       icon: FileText,        path: '/admin/about-slyder' },
  { label: 'Distributor Network',     icon: MapPin,          path: '/admin/distributor' },
  { label: 'Become Distributor',      icon: UserPlus,        path: '/admin/become-distributor' },
  { label: 'Distributor Applications',icon: ClipboardList,   path: '/admin/distributor-apps' },
  { label: 'Projects',                icon: Images,          path: '/admin/projects' },
  { label: 'Products',           icon: Package,         path: '/admin/products' },
  { label: 'Testimonials',       icon: MessageSquare,   path: '/admin/testimonials' },
  { label: 'Announcements',      icon: Megaphone,       path: '/admin/announcements' },
  { label: 'Contact Card',       icon: Phone,           path: '/admin/contact-info' },
  { label: 'Contact Form',       icon: PhoneCall,       path: '/admin/contact-messages' },
]

function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  if (!isAuthenticated()) {
    navigate('/admin')
    return null
  }

  const handleLogout = () => {
    apiLogout()
    navigate('/admin')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Inter', sans-serif" }}>

      {/* Sidebar */}
      <div style={{ width: collapsed ? 68 : 240, background: '#0f172a', display: 'flex', flexDirection: 'column', transition: 'width 0.25s ease', flexShrink: 0, position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* Logo */}
        <div style={{ padding: collapsed ? '20px 16px' : '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between', gap: 12 }}>
          {!collapsed && <img src={logo} alt="Slyder" style={{ height: 36, objectFit: 'contain' }} />}
          <button onClick={() => setCollapsed(!collapsed)}
            style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 8, padding: 6, cursor: 'pointer', display: 'flex', flexShrink: 0 }}>
            {collapsed ? <Menu size={18} color="#fff" /> : <X size={18} color="#fff" />}
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 8px', display: 'flex', flexDirection: 'column', gap: 4, overflowY: 'auto', overflowX: 'hidden' }}>
          {navItems.map(item => {
            const Icon = item.icon
            const active = location.pathname === item.path
            return (
              <Link key={item.path} to={item.path}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: collapsed ? '10px 16px' : '10px 16px', borderRadius: 10, textDecoration: 'none', background: active ? 'rgba(21,156,72,0.18)' : 'transparent', transition: 'background 0.2s', justifyContent: collapsed ? 'center' : 'flex-start' }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
              >
                <Icon size={18} color={active ? '#159c48' : 'rgba(255,255,255,0.55)'} />
                {!collapsed && <span style={{ fontSize: 14, fontWeight: 600, color: active ? '#159c48' : 'rgba(255,255,255,0.7)', whiteSpace: 'nowrap' }}>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: '16px 8px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button onClick={handleLogout}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderRadius: 10, background: 'transparent', border: 'none', cursor: 'pointer', justifyContent: collapsed ? 'center' : 'flex-start', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.12)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <LogOut size={18} color="rgba(255,255,255,0.45)" />
            {!collapsed && <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.45)' }}>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {children}
      </div>
    </div>
  )
}

export default AdminLayout
