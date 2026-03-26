import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Eye, EyeOff, Mail } from 'lucide-react'
import { apiLogin } from './api'
import logo from '../assets/logo.jpeg'

const fieldStyle = (hasError) => ({
  width: '100%',
  padding: '12px 44px 12px 42px',
  fontSize: 15,
  background: 'rgba(255,255,255,0.06)',
  border: `1px solid ${hasError ? '#ef4444' : 'rgba(255,255,255,0.12)'}`,
  borderRadius: 10,
  color: '#fff',
  fontFamily: "'Inter', sans-serif",
  outline: 'none',
  boxSizing: 'border-box',
})

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.')
      return
    }
    setLoading(true)
    try {
      await apiLogin(email.trim(), password)
      navigate('/admin/dashboard')
    } catch {
      setError('Incorrect email or password.')
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => setError('')

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: '#1e293b', borderRadius: 20, padding: '48px 44px', width: '100%', maxWidth: 420, boxShadow: '0 24px 80px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <img src={logo} alt="Slyder" style={{ height: 52, objectFit: 'contain', marginBottom: 20 }} />
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(21,156,72,0.15)', border: '1px solid rgba(21,156,72,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Lock size={22} color="#159c48" />
          </div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: '#fff', fontFamily: "'Inter', sans-serif" }}>Admin Panel</h1>
          <p style={{ margin: '8px 0 0', fontSize: 14, color: 'rgba(255,255,255,0.45)', fontFamily: "'Inter', sans-serif" }}>Slyder Electronics</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Email */}
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 8, fontFamily: "'Inter', sans-serif" }}>
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); clearError() }}
                placeholder="admin@slyderindia.com"
                autoComplete="email"
                style={fieldStyle(!!error)}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 8, fontFamily: "'Inter', sans-serif" }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); clearError() }}
                placeholder="Enter admin password"
                autoComplete="current-password"
                style={fieldStyle(!!error)}
              />
              <button type="button" onClick={() => setShow(!show)}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
                {show ? <EyeOff size={18} color="rgba(255,255,255,0.4)" /> : <Eye size={18} color="rgba(255,255,255,0.4)" />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p style={{ margin: 0, fontSize: 13, color: '#ef4444', fontFamily: "'Inter', sans-serif", background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 8, padding: '10px 14px' }}>
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '13px', background: loading ? '#0f6b30' : '#159c48', color: '#fff', fontSize: 15, fontWeight: 700, fontFamily: "'Inter', sans-serif", border: 'none', borderRadius: 10, cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s', marginTop: 4 }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#117a38' }}
            onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#159c48' }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
