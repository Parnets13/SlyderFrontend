import { useState, useEffect } from 'react'
import hotel4 from '../assets/4hotel.jpg'
import hotel7 from '../assets/7hotel.jpg'
import hotel8 from '../assets/8hotel.jpg'
import hotel9 from '../assets/9hotel.jpg'
import hotel11 from '../assets/11hotel.jpg'

const BASE_URL = (import.meta.env.VITE_API_URL || 'https://slyderind.onrender.com/api').replace(/\/api$/, '')

const FALLBACK = [
  { _id: '1', _local: hotel4 },
  { _id: '2', _local: hotel7 },
  { _id: '3', _local: hotel8 },
  { _id: '4', _local: hotel9 },
  { _id: '5', _local: hotel11 },
]

function HotelsSection() {
  const [hotels, setHotels] = useState(FALLBACK)

  useEffect(() => {
    fetch(`${BASE_URL}/api/hotels`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setHotels(data) })
      .catch(() => {})
  }, [])

  const imgFor = (h) => h._local ? h._local : `${BASE_URL}/uploads/hotels/${h.image}`

  // Duplicate for seamless infinite scroll
  const track = [...hotels, ...hotels, ...hotels]

  return (
    <section className="py-16 px-4 overflow-hidden" style={{ background: '#f8fafc' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(21,156,72,0.08)', color: '#159c48', border: '1px solid rgba(21,156,72,0.2)' }}
          >
            Our Clients
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Approved by{' '}
            <span style={{
              background: 'linear-gradient(135deg, #159c48, #4ade80)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
         
            </span>
          </h2>
          <div className="w-14 h-1 rounded-full mx-auto mt-4" style={{ backgroundColor: '#159c48' }} />
          <p className="text-gray-500 mt-4 text-base max-w-md mx-auto">
            Leading hotels across India trust Slyder for their security needs.
          </p>
        </div>

      </div>

      {/* Infinite scroll track — full width */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #f8fafc, transparent)' }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #f8fafc, transparent)' }} />

        <div className="hotels-track flex gap-8 items-center">
          {track.map((h, i) => (
            <div
              key={i}
              className="flex-shrink-0 bg-white rounded-2xl flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{ width: '200px', height: '110px', border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', overflow: 'hidden' }}
            >
              <img
                src={imgFor(h)}
                alt="Hotel"
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
        .hotels-track {
          animation: scroll-hotels 22s linear infinite;
          width: max-content;
        }
        .hotels-track:hover {
          animation-play-state: paused;
        }
        @keyframes scroll-hotels {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-200px * ${hotels.length} - 32px * ${hotels.length})); }
        }
      `}</style>
    </section>
  )
}

export default HotelsSection
