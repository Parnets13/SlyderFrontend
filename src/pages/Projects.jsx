import { useState, useEffect } from 'react'
import heroBg from '../assets/cor2.jpg'
import img1 from '../assets/4hotel.jpg'
import img2 from '../assets/7hotel.jpg'
import img3 from '../assets/8hotel.jpg'
import img4 from '../assets/9hotel.jpg'
import img5 from '../assets/11hotel.jpg'
import img6 from '../assets/cor1.png'
import img7 from '../assets/cor2.jpg'
import img8 from '../assets/cor3.png'
import img9 from '../assets/pr1.png'
import img10 from '../assets/pr2.png'
import img11 from '../assets/pr3.jpg'
import img12 from '../assets/pr4.png'
import img13 from '../assets/pr5.png'
import img15 from '../assets/pro1.jpeg'
import img16 from '../assets/pro2.jpeg'
import img17 from '../assets/pro3.jpeg'

const BASE_URL = (import.meta.env.VITE_API_URL || 'https://slyderind.onrender.com/api').replace(/\/api$/, '')
const fallbackImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img15, img16, img17]

const galleryStyles = `
  .proj-grid { columns: 4; column-gap: 16px; }
  @media (max-width: 900px) { .proj-grid { columns: 3; } }
  @media (max-width: 600px) { .proj-grid { columns: 2; } }
  .proj-item { break-inside: avoid; margin-bottom: 16px; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
  .proj-img { width: 100%; display: block; border-radius: 12px; transition: transform 0.35s ease, box-shadow 0.35s ease; cursor: pointer; }
  .proj-item:hover .proj-img { transform: scale(1.04); box-shadow: 0 16px 48px rgba(0,0,0,0.22); }
`

function Projects() {
  const [apiImages, setApiImages] = useState([])

  useEffect(() => {
    fetch(`${BASE_URL}/api/projects`)
      .then(r => r.json())
      .then(d => { if (Array.isArray(d) && d.length) setApiImages(d) })
      .catch(() => {})
  }, [])

  const images = apiImages.length
    ? apiImages.map(p => `${BASE_URL}/uploads/projects/${p.image}`)
    : fallbackImages

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <style>{galleryStyles}</style>

      {/* Hero Banner */}
      <div style={{ position: 'relative', width: '100%', height: 'clamp(200px, 40vw, 340px)', overflow: 'hidden' }}>
        <img src={heroBg} alt="Our Projects" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.65) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#159c48', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>What We've Done</p>
          <h1 style={{ margin: 0, fontSize: 'clamp(30px, 6vw, 52px)', fontWeight: 800, color: '#ffffff', fontFamily: "'Inter', sans-serif", textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}>Our Projects</h1>
          <div style={{ width: 64, height: 4, borderRadius: 2, background: '#159c48' }} />
        </div>
      </div>

      {/* Gallery */}
      <div style={{ padding: 'clamp(36px, 5vw, 64px) clamp(16px, 3vw, 48px) clamp(40px, 5vw, 80px)', background: '#f8fafc' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 700, color: '#159c48', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>Portfolio</p>
          <h2 style={{ margin: '0 0 16px', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, color: '#0f172a', fontFamily: "'Inter', sans-serif" }}>Our Projects</h2>
          <div style={{ width: 56, height: 4, borderRadius: 2, background: '#159c48', margin: '0 auto 16px' }} />
          <p style={{ margin: 0, fontSize: 'clamp(14px, 1.5vw, 17px)', color: '#64748b', fontFamily: "'Merriweather', serif", maxWidth: 560, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.8 }}>
            A glimpse into the hotels and establishments we've secured with our innovative lock solutions across India.
          </p>
        </div>

        <div className="proj-grid">
          {images.map((img, i) => (
            <div key={i} className="proj-item">
              <img src={img} alt={`Project ${i + 1}`} className="proj-img" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects
