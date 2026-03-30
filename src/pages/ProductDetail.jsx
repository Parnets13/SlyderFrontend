import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '')

const tableStyles = `
  .spec-table { width:100%; border-collapse:collapse; }
  .spec-table th { background:#159c48; color:#fff; padding:10px 16px; text-align:left; font-size:14px; font-weight:700; font-family:'Inter',sans-serif; }
  .spec-table td { padding:10px 16px; font-size:14px; color:#374151; font-family:'Inter',sans-serif; border-bottom:1px solid #e2e8f0; }
  .spec-table tr:nth-child(even) td { background:#f8fafc; }
  .spec-table tr:last-child td { border-bottom:none; }
  .product-detail-grid { display:grid; grid-template-columns:1fr 1fr; gap:0; }
  @media (max-width: 768px) {
    .product-detail-grid { grid-template-columns:1fr; }
    .product-detail-img { border-right:none !important; border-bottom:1px solid #e2e8f0; }
  }
`

function ProductDetail() {
  const { slug: id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id || id === 'undefined') { setLoading(false); return }
    fetch(`${BASE_URL}/api/featured-products/${id}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => setProduct(data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <div style={{ padding: '80px 20px', textAlign: 'center', fontFamily: "'Inter', sans-serif", color: '#94a3b8' }}>Loading...</div>
  }

  if (!product) {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center', fontFamily: "'Inter', sans-serif" }}>
        <h2 style={{ color: '#0f172a' }}>Product not found</h2>
        <Link to="/products" style={{ color: '#159c48', fontWeight: 700 }}>← Back to Products</Link>
      </div>
    )
  }

  const imgUrl = product.image ? `${BASE_URL}/uploads/featured/${product.image}` : null

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: 96 }}>
      <style>{tableStyles}</style>

      {/* Top bar */}
      <div style={{ background: '#0f172a', padding: '14px clamp(16px, 4vw, 60px)', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <Link to="/products"
          style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14, fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
          onMouseEnter={e => e.currentTarget.style.color = '#159c48'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
        >
          <ArrowLeft size={16} /> Our Products
        </Link>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>/</span>
        <span style={{ color: '#fff', fontSize: 14, fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>{product.name}</span>
      </div>

      {/* Content */}
      <div style={{ padding: 'clamp(24px, 4vw, 60px) clamp(16px, 4vw, 60px) clamp(40px, 5vw, 80px)' }}>
        <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 8px 40px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>

          <div style={{ background: '#f1f5f9', borderBottom: '1px solid #e2e8f0', padding: 'clamp(16px, 3vw, 28px) clamp(16px, 4vw, 48px)' }}>
            <h1 style={{ margin: 0, fontSize: 'clamp(20px, 2.5vw, 30px)', fontWeight: 800, color: '#0f172a', fontFamily: "'Inter', sans-serif" }}>
              {product.name}
            </h1>
          </div>

          <div className="product-detail-grid">
            <div className="product-detail-img" style={{ padding: 'clamp(24px, 4vw, 48px)', borderRight: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafafa' }}>
              {imgUrl
                ? <img src={imgUrl} alt={product.name} style={{ width: '100%', maxHeight: 420, objectFit: 'contain', borderRadius: 12, display: 'block' }} />
                : <div style={{ width: '100%', height: 260, background: '#f1f5f9', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>No image</div>
              }
            </div>

            <div style={{ padding: 'clamp(24px, 4vw, 48px)' }}>
              {product.descType === 'table' ? (
                <>
                  <h3 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 700, color: '#0f172a', fontFamily: "'Inter', sans-serif" }}>Specifications</h3>
                  {(product.specs || []).length > 0 ? (
                    <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #e2e8f0', overflowX: 'auto' }}>
                      <table className="spec-table">
                        <thead><tr><th>Specification</th><th>Description</th></tr></thead>
                        <tbody>
                          {product.specs.map((row, i) => (
                            <tr key={i}>
                              <td style={{ fontWeight: 600, color: '#0f172a' }}>{row.spec}</td>
                              <td>{row.desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p style={{ color: '#94a3b8', fontSize: 14, fontFamily: "'Inter', sans-serif" }}>No specifications added yet.</p>
                  )}
                </>
              ) : (
                <>
                  <h3 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 700, color: '#0f172a', fontFamily: "'Inter', sans-serif" }}>Product Features</h3>
                  {(product.description || []).length > 0 ? (
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                      {product.description.map((item, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                          <span style={{ flexShrink: 0, width: 8, height: 8, borderRadius: '50%', background: '#159c48', marginTop: 7, display: 'block' }} />
                          <span style={{ fontSize: 15, color: '#374151', lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ color: '#94a3b8', fontSize: 14, fontFamily: "'Inter', sans-serif" }}>No features added yet.</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
