import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import heroBg from '../assets/cor3.png'

const BASE_URL = (import.meta.env.VITE_API_URL || 'https://slyderind.onrender.com/api').replace('/api', '')
const imgSrc = (p) => p.image ? `${BASE_URL}/uploads/featured/${p.image}` : null

const styles = `
  .prod-card { background:#fff; border-radius:16px; border:1px solid #e2e8f0; overflow:hidden;
    box-shadow:0 2px 16px rgba(0,0,0,0.06); transition:transform 0.3s ease,box-shadow 0.3s ease;
    display:flex; flex-direction:column; }
  .prod-card:hover { transform:translateY(-6px); box-shadow:0 16px 48px rgba(0,0,0,0.13); }
  .prod-img { width:100%; height:220px; object-fit:cover; display:block; transition:transform 0.4s ease; }
  .prod-card:hover .prod-img { transform:scale(1.05); }
  .products-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:28px; }
  @media (max-width: 900px) { .products-grid { grid-template-columns:repeat(2,1fr); } }
  @media (max-width: 560px) { .products-grid { grid-template-columns:1fr; } }
`

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${BASE_URL}/api/featured-products`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setProducts(data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <style>{styles}</style>

      {/* Hero */}
      <div style={{ position: 'relative', width: '100%', height: 'clamp(200px, 40vw, 340px)', overflow: 'hidden' }}>
        <img src={heroBg} alt="Our Products" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.65))' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#159c48', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>What We Offer</p>
          <h1 style={{ margin: 0, fontSize: 'clamp(30px, 6vw, 52px)', fontWeight: 800, color: '#fff', fontFamily: "'Inter', sans-serif", textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}>Our Products</h1>
          <div style={{ width: 64, height: 4, borderRadius: 2, background: '#159c48' }} />
        </div>
      </div>

      {/* Grid */}
      <div style={{ padding: 'clamp(36px, 5vw, 64px) clamp(16px, 4vw, 60px) clamp(40px, 5vw, 80px)', background: '#f8fafc' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 700, color: '#159c48', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>Product Range</p>
          <h2 style={{ margin: '0 0 12px', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', fontFamily: "'Inter', sans-serif" }}>Our Products</h2>
          <div style={{ width: 56, height: 4, borderRadius: 2, background: '#159c48', margin: '0 auto' }} />
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#94a3b8', fontFamily: "'Inter', sans-serif" }}>Loading products...</p>
        ) : products.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#94a3b8', fontFamily: "'Inter', sans-serif" }}>No products found.</p>
        ) : (
          <div className="products-grid">
            {products.map(p => (
              <Link key={p._id} to={`/products/${p._id}`} style={{ textDecoration: 'none' }}>
                <div className="prod-card">
                  <div style={{ overflow: 'hidden' }}>
                    {imgSrc(p)
                      ? <img src={imgSrc(p)} alt={p.name} className="prod-img" />
                      : <div style={{ width: '100%', height: 220, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: 13 }}>No image</div>
                    }
                  </div>
                  <div style={{ padding: '18px 20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ margin: '0 0 14px', fontSize: 17, fontWeight: 700, color: '#0f172a', fontFamily: "'Inter', sans-serif", lineHeight: 1.3 }}>
                      {p.name}
                    </h3>
                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 6, color: '#159c48', fontWeight: 700, fontSize: 14, fontFamily: "'Inter', sans-serif" }}>
                      View Details <ArrowUpRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Products
