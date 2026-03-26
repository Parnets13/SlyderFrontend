function Footer() {
  return (
    <footer className="py-6 px-4 text-center" style={{ backgroundColor: '#2d2d2d' }}>
      <a
        href="#"
        className="text-sm transition-colors"
        style={{ color: 'rgba(255,255,255,0.7)' }}
        onMouseEnter={e => e.currentTarget.style.color = '#159c48'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
      >
        Privacy Policy
      </a>
      <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
        Copyright © All rights reserved 2022–23
      </p>
    </footer>
  )
}

export default Footer
