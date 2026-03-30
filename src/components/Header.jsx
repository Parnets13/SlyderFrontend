import { useState, useRef, useCallback, useMemo, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'


import batteryImg from '../assets/battery-1.jpeg'
import brochureImg from '../assets/Brochure.png'
import templateImg from '../assets/template.jpeg'
import slyder from '../assets/7.png'

const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '')

const downloadItems = [
  { label: 'Battery', href: batteryImg, filename: 'Battery.jpeg' },
  { label: 'Brochure', href: brochureImg, filename: 'Brochure.png' },
  { label: 'Template', href: templateImg, filename: 'Template.jpeg' },
]

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Our Products', href: '/products', hasDropdown: true, dropdownType: 'products' },
   { label: 'Projects', href: '/projects' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
   { label: 'Download', href: '/download', hasDropdown: true, dropdownType: 'download' }, 
   {
  label: 'Distributor',
  hasDropdown: true,
  dropdownType: 'distributor'
},
  //  { label: 'Become Distributor', href: '/become-distributor' },
  // { label: 'Distributor Network', href: '/distributors' },
  
 
  
 
  
]
import { Lock, ChevronDown, Menu, X, PhoneCall } from 'lucide-react' 


// Extracted ProductDropdown component for better organization
const ProductDropdown = ({ isOpen, onClose, productItems }) => {
  if (!isOpen) return null

  return (
    <div 
      className="absolute top-full left-1/2 mt-4 z-50 w-[480px] -translate-x-1/2"
      onMouseLeave={onClose}
    >
      {/* Arrow */}
      <div className="flex justify-center mb-[-6px]">
        <div className="w-3 h-3 rotate-45 border-l border-t border-white/30 bg-white/15" />
      </div>

      {/* Dropdown Content */}
      <div className="rounded-2xl overflow-hidden backdrop-blur-2xl bg-slate-900/75 border border-white/10 shadow-2xl">
        {/* Grid */}
        <div className="p-3 grid grid-cols-2 gap-1">
          {productItems.map((item) => (
            <a
              key={item._id}
              href={`/products/${item._id}`}
              className="group flex items-start gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:translate-y-[-1px]"
            >
              <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                <Lock size={17} strokeWidth={1.8} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight" style={{ color: 'rgba(255,255,255,0.9)' }}>
                  {item.name}
                </p>
                <p className="text-xs mt-0.5 leading-snug text-white/45">{item.category || 'Product'}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 flex items-center justify-between border-t border-white/10 bg-black/15">
          <p className="text-xs text-white/40">Need help choosing?</p>
          <a href="/contact" className="text-xs font-semibold px-4 py-1.5 rounded-full text-white transition-all bg-[#159c48] hover:bg-[#117a38]">
            Contact Us →
          </a>
        </div>
      </div>
    </div>
  )
}

const DownloadDropdown = ({ isOpen }) => {
  if (!isOpen) return null

  return (
    <div className="absolute top-full left-1/2 mt-4 z-50 w-52 -translate-x-1/2">
      {/* Arrow */}
      <div className="flex justify-center mb-[-6px]">
        <div className="w-3 h-3 rotate-45 border-l border-t border-white/30 bg-white/15" />
      </div>

      <div className="rounded-2xl overflow-hidden backdrop-blur-2xl bg-slate-900/75 border border-white/10 shadow-2xl py-2">
        {downloadItems.map((item, index) => (
          <a
            key={item.label}
            href={item.href}
            download={item.filename}
            className="flex items-center px-5 py-3 text-sm font-medium transition-all duration-150"
            style={{
              color: 'rgba(255,255,255,0.85)',
              backgroundColor: 'transparent',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  )
}
const DistributorDropdown = ({ isOpen }) => {
  if (!isOpen) return null

  return (
    <div className="absolute top-full left-1/2 mt-4 z-50 w-56 -translate-x-1/2">
      {/* Arrow */}
      <div className="flex justify-center mb-[-6px]">
        <div className="w-3 h-3 rotate-45 border-l border-t border-white/30 bg-white/15" />
      </div>

      <div className="rounded-2xl overflow-hidden backdrop-blur-2xl bg-slate-900/75 border border-white/10 shadow-2xl py-2">
        <Link
          to="/become-distributor"
          className="block px-5 py-3 text-sm font-medium text-white/85 hover:bg-white/10"
        >
          Become Distributor
        </Link>

        <Link
          to="/distributors"
          className="block px-5 py-3 text-sm font-medium text-white/85 hover:bg-white/10"
        >
          Distributor Network
        </Link>
      </div>
    </div>
  )
}
const MobileNavItem = ({ link, productItems, downloadItems, onLinkClick }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()
  const active = pathname === link.href

  if (link.hasDropdown && link.dropdownType === 'products') {
    return (
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', color: 'rgba(255,255,255,0.85)', fontSize: 15, fontWeight: 700 }}
        >
          <span>{link.label}</span>
          <ChevronDown size={16} color="rgba(255,255,255,0.5)" style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
        </button>
        {isOpen && (
          <div style={{ paddingBottom: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {productItems.map(item => (
              <a key={item._id} href={`/products/${item._id}`} onClick={onLinkClick}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, textDecoration: 'none', background: 'rgba(255,255,255,0.05)', marginBottom: 2 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(21,156,72,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Lock size={14} color="#4ade80" />
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>{item.name}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    )
  }

  if (link.hasDropdown && link.dropdownType === 'download') {
    return (
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', color: 'rgba(255,255,255,0.85)', fontSize: 15, fontWeight: 700 }}
        >
          <span>{link.label}</span>
          <ChevronDown size={16} color="rgba(255,255,255,0.5)" style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
        </button>
        {isOpen && (
          <div style={{ paddingBottom: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {downloadItems.map(item => (
              <a key={item.label} href={item.href} download={item.filename} onClick={onLinkClick}
                style={{ display: 'flex', alignItems: 'center', padding: '10px 12px', borderRadius: 10, textDecoration: 'none', background: 'rgba(255,255,255,0.05)', marginBottom: 2, fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Link to={link.href} onClick={onLinkClick}
      style={{ display: 'block', padding: '14px 0', fontSize: 15, fontWeight: 700, textDecoration: 'none', color: active ? '#4ade80' : 'rgba(255,255,255,0.85)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      {link.label}
    </Link>
  )
}

function Header() { 
  const [distributorOpen, setDistributorOpen] = useState(false) 
  const [menuOpen, setMenuOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [downloadOpen, setDownloadOpen] = useState(false)
  const [productItems, setProductItems] = useState([])
  const [scrolled, setScrolled] = useState(false)
  const timeoutRef = useRef(null)
  const downloadTimeoutRef = useRef(null)
  const { pathname } = useLocation()

  const isHome = pathname === '/'
  const isSolid = scrolled || !isHome

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    fetch(`${BASE_URL}/api/featured-products`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setProductItems(data) })
      .catch(() => {})
  }, [])
  
  // Clean up timeout on unmount
  const clearTimeoutRef = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleMouseEnter = useCallback(() => {
    clearTimeoutRef()
    setProductsOpen(true)
  }, [clearTimeoutRef])

  const handleMouseLeave = useCallback(() => {
    clearTimeoutRef()
    timeoutRef.current = setTimeout(() => setProductsOpen(false), 150)
  }, [clearTimeoutRef])

  const handleDownloadEnter = useCallback(() => {
    if (downloadTimeoutRef.current) clearTimeout(downloadTimeoutRef.current)
    setDownloadOpen(true)
  }, [])

  const handleDownloadLeave = useCallback(() => {
    downloadTimeoutRef.current = setTimeout(() => setDownloadOpen(false), 150)
  }, [])

  const handleMobileMenuClose = useCallback(() => {
    setMenuOpen(false)
  }, [])
const handleDistributorEnter = useCallback(() => {
  setDistributorOpen(true)
}, [])

const handleDistributorLeave = useCallback(() => {
  setTimeout(() => setDistributorOpen(false), 150)
}, [])
  // Memoized styles to prevent recalculation
  const headerStyle = useMemo(() => (isSolid ? {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.12)',
    transition: 'all 0.3s ease',
  } : {
    background: 'transparent',
    backdropFilter: 'none',
    WebkitBackdropFilter: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.12)',
    boxShadow: 'none',
    transition: 'all 0.3s ease',
  }), [isSolid])

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={headerStyle}>
      <div className="w-full px-4 md:px-6 lg:px-10">
        <div className="flex items-center h-16 md:h-24 gap-4 md:gap-6">

          {/* Logo - always visible */}
          <div className="shrink-0">
            <a href="/">
              <img
                src={slyder}
                alt="Slyder"
                className={`w-auto object-contain  ${isSolid ? 'h-8 md:h-12' : 'h-11 md:h-18'}`}
                loading="eager"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 items-center justify-evenly">
            {navLinks.map((link) => {
              const navItemStyle = { color: isSolid ? '#374151' : '#ffffff' }
              const navClass = "relative font-extrabold text-base transition-all duration-200 group whitespace-nowrap"

              if (link.hasDropdown && link.dropdownType === 'products') {
                return (
                  <div key={link.label} className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <button className={`${navClass} flex items-center gap-1`} style={navItemStyle} aria-expanded={productsOpen} aria-haspopup="true">
                      {link.label}
                      <ChevronDown size={15} className={`transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`} />
                      <span className="absolute -bottom-0.5 left-0 w-0 h-1 bg-white transition-all duration-200 group-hover:w-full" />
                    </button>
                    <ProductDropdown isOpen={productsOpen} onClose={handleMouseLeave} productItems={productItems} />
                  </div>
                )
              }

              if (link.hasDropdown && link.dropdownType === 'download') {
                return (
                  <div key={link.label} className="relative" onMouseEnter={handleDownloadEnter} onMouseLeave={handleDownloadLeave}>
                    <button className={`${navClass} flex items-center gap-1`} style={navItemStyle} aria-expanded={downloadOpen} aria-haspopup="true">
                      {link.label}
                      <ChevronDown size={15} className={`transition-transform duration-200 ${downloadOpen ? 'rotate-180' : ''}`} />
                      <span className="absolute -bottom-0.5 left-0 w-0 h-1 bg-white transition-all duration-200 group-hover:w-full" />
                    </button>
                    <DownloadDropdown isOpen={downloadOpen} />
                  </div>
                )
              } 
              if (link.hasDropdown && link.dropdownType === 'distributor') {
  return (
    <div
      key={link.label}
      className="relative"
      onMouseEnter={handleDistributorEnter}
      onMouseLeave={handleDistributorLeave}
    >
      <button
        className={`${navClass} flex items-center gap-1`}
        style={navItemStyle}
      >
        {link.label}
        <ChevronDown
          size={15}
          className={`transition-transform duration-200 ${
            distributorOpen ? 'rotate-180' : ''
          }`}
        />
        <span className="absolute -bottom-0.5 left-0 w-0 h-1 bg-white transition-all duration-200 group-hover:w-full" />
      </button>

      {/* 🔥 THIS WAS MISSING */}
      <DistributorDropdown isOpen={distributorOpen} />
    </div>
  )
}

              return (
                <Link key={link.label} to={link.href} className={navClass} style={navItemStyle}>
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-1 bg-white transition-all duration-200 group-hover:w-full" />
                </Link>
              )
            })}
          </nav>

          {/* Phone - desktop right */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <a
              href="tel:+919845670055"
              className="flex items-center gap-4 font-bold transition-colors"
              style={{ color: isSolid ? '#159c48' : '#fff', fontSize: '1 rem' }}
              onMouseEnter={e => e.currentTarget.style.color = '#117a38'}
              onMouseLeave={e => e.currentTarget.style.color = isSolid ? '#159c48' : '#fff'}
            >
              <PhoneCall size={20} className="phone-ring" />
              9845670055
            </a>
          </div>

          {/* Mobile right side: phone icon + hamburger */}
          <div className="md:hidden flex items-center gap-3 ml-auto">
            <a
              href="tel:+919845670055"
              className="p-2 rounded-full transition-colors"
              style={{ color: isSolid ? '#159c48' : '#fff' }}
              aria-label="Call us"
            >
              <PhoneCall size={22} className="phone-ring" />
            </a>
            <button
              className="p-2 rounded-lg transition-colors"
              style={{ color: isSolid ? '#374151' : '#fff' }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Menu — dark to match desktop */}
      {menuOpen && (
        <div style={{ background: 'rgba(15,23,42,0.97)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ padding: '8px 20px 24px', display: 'flex', flexDirection: 'column', maxHeight: '80svh', overflowY: 'auto' }}>
            {navLinks.map((link) => (
              <MobileNavItem
                key={link.label}
                link={link}
                productItems={productItems}
                downloadItems={downloadItems}
                onLinkClick={handleMobileMenuClose}
              />
            ))}
            {/* Phone */}
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <a href="tel:+919845670055" style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#4ade80', fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
                <PhoneCall size={20} />
                9845670055
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
