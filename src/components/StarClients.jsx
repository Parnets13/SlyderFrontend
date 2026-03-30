import { useState, useEffect } from 'react'
import hotel4 from '../assets/4hotel.jpg'
import hotel7 from '../assets/7hotel.jpg'
import hotel8 from '../assets/8hotel.jpg'
import hotel9 from '../assets/9hotel.jpg'
import hotel11 from '../assets/11hotel.jpg'

const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api$/, '')

const FALLBACK = [
  { _id: '1', _local: hotel4 },
  { _id: '2', _local: hotel7 },
  { _id: '3', _local: hotel8 },
  { _id: '4', _local: hotel9 },
  { _id: '5', _local: hotel11 },
]

function StarClients() {
  const [clients, setClients] = useState(FALLBACK)

  useEffect(() => {
    fetch(`${BASE_URL}/api/star-clients`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setClients(data) })
      .catch(() => {})
  }, [])

  const imgFor = (h) => h._local ? h._local : `${BASE_URL}/uploads/star-clients/${h.image}`

  const track = [...clients, ...clients, ...clients]

  return (
    <section className="py-16 px-4 overflow-hidden" style={{ background: '#fff' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Our{' '}
            <span style={{
              background: 'linear-gradient(135deg, #159c48, #4ade80)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Star Clients
            </span>
          </h2>
          <div className="w-14 h-1 rounded-full mx-auto mt-4" style={{ backgroundColor: '#159c48' }} />
          <p className="text-gray-500 mt-4 text-base max-w-md mx-auto">
            Proud to serve some of the finest names in hospitality across India.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #fff, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #fff, transparent)' }} />

        <div className="star-clients-track flex gap-8 items-center">
          {track.map((h, i) => (
            <div
              key={i}
              className="flex-shrink-0 bg-white rounded-2xl flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{ width: '200px', height: '110px', border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', overflow: 'hidden' }}
            >
              <img
                src={imgFor(h)}
                alt="Client"
                className="w-full h-full transition-all duration-300"
                onMouseEnter={e => e.currentTarget.style.filter = 'grayscale(0%)'}
                onMouseLeave={e => e.currentTarget.style.filter = 'grayscale(20%)'}
                style={{ filter: 'grayscale(20%)', objectFit: 'fill' }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .star-clients-track {
          animation: scroll-star-clients 22s linear infinite;
          width: max-content;
        }
        .star-clients-track:hover {
          animation-play-state: paused;
        }
        @keyframes scroll-star-clients {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-200px * ${clients.length} - 32px * ${clients.length})); }
        }
      `}</style>
    </section>
  )
}

export default StarClients
