import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import lottie from 'lottie-web'
import confettiAnimation from '../assets/thankyou-confetti.json'

function ThankYou() {
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    animRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: confettiAnimation,
    })
    return () => animRef.current?.destroy()
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f1f5f9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 16px',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 20,
        boxShadow: '0 8px 40px rgba(0,0,0,0.09)',
        border: '1px solid #e2e8f0',
        padding: 'clamp(40px, 5vw, 64px) clamp(32px, 5vw, 80px)',
        maxWidth: 500,
        width: '100%',
        textAlign: 'center',
      }}>

        {/* Lottie Animation */}
        <div ref={containerRef} style={{ width: 200, height: 200, margin: '0 auto' }} />

        <h2 style={{
          margin: '0 0 12px',
          fontSize: 'clamp(26px, 4vw, 36px)',
          fontWeight: 800,
          color: '#0f172a',
          fontFamily: "'Inter', sans-serif",
        }}>
          Thank You!
        </h2>

        <div style={{ width: 48, height: 4, background: '#159c48', borderRadius: 2, margin: '0 auto 20px' }} />

        <p style={{
          margin: '0 0 36px',
          fontSize: 16,
          color: '#64748b',
          lineHeight: 1.8,
          fontFamily: "'Inter', sans-serif",
        }}>
          Your message has been received.<br />We'll get back to you soon.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: '#159c48',
              color: '#fff',
              fontSize: 15,
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              padding: '13px 40px',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '0.08em',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#117a38'}
            onMouseLeave={e => e.currentTarget.style.background = '#159c48'}
          >
            GO TO HOME
          </button>

          <button
            onClick={() => navigate('/contact')}
            style={{
              background: 'transparent',
              color: '#159c48',
              fontSize: 15,
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              padding: '13px 40px',
              borderRadius: 8,
              border: '2px solid #159c48',
              cursor: 'pointer',
              letterSpacing: '0.08em',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#f0fdf4'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            BACK TO CONTACT
          </button>
        </div>

      </div>
    </div>
  )
}

export default ThankYou
