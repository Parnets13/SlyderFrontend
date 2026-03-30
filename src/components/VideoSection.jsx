import { Play, Pause } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import manV from '../assets/man-v.mp4'
import lockDemo from '../assets/mvi-4044_KNUKdNTf.mp4'

const BASE_URL = (import.meta.env.VITE_API_URL || 'https://slyderind.onrender.com/api').replace(/\/api$/, '')

const FALLBACK = [
  { _id: '1', title: 'Manufacturing Process', _local: manV },
  { _id: '2', title: 'Slyder Door Lock Demo', _local: lockDemo },
]

function VideoCard({ video, src }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [hovered, setHovered] = useState(false)

  const toggle = () => {
    const el = videoRef.current
    if (!el) return
    if (el.paused) { el.play() } else { el.pause() }
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 16, overflow: 'hidden', position: 'relative', cursor: 'pointer',
        boxShadow: hovered ? '0 24px 60px rgba(0,0,0,0.18)' : '0 4px 24px rgba(0,0,0,0.1)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        background: '#000',
      }}
    >
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
        <video
          ref={videoRef}
          preload="metadata"
          controls
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        >
          <source src={src} type="video/mp4" />
        </video>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)',
          opacity: playing ? 0 : 1, transition: 'opacity 0.35s ease', pointerEvents: 'none',
        }} />
        <div onClick={toggle} style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: playing ? 0 : 1,
          pointerEvents: playing ? 'none' : 'auto',
          transition: 'opacity 0.3s ease', cursor: 'pointer',
        }}>
          <div style={{
            width: 60, height: 60, borderRadius: '50%',
            background: playing ? 'rgba(0,0,0,0.45)' : '#159c48',
            backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: playing ? 'none' : '0 6px 28px rgba(21,156,72,0.55)',
            transition: 'all 0.25s ease', transform: hovered ? 'scale(1.1)' : 'scale(1)',
          }}>
            {playing
              ? <Pause size={20} color="#fff" fill="#fff" />
              : <Play size={20} color="#fff" fill="#fff" style={{ marginLeft: 3 }} />
            }
          </div>
        </div>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, padding: '18px 20px',
          opacity: playing ? 0 : 1, transition: 'opacity 0.3s ease', pointerEvents: 'none',
        }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#fff' }}>{video.title}</h3>
        </div>
      </div>
    </div>
  )
}

function VideoSection() {
  const [videos, setVideos] = useState(FALLBACK)

  useEffect(() => {
    fetch(`${BASE_URL}/api/videos`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setVideos(data) })
      .catch(() => {})
  }, [])

  const srcFor = (v) => v._local ? v._local : `${BASE_URL}/uploads/videos/${v.filename}`

  return (
    <section style={{ background: '#fff', padding: '60px 20px 80px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#159c48' }}>
            Watch & Learn
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <h2 style={{ margin: 0, fontSize: 'clamp(24px, 3.5vw, 44px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.025em', color: '#0f172a' }}>
              See Slyder{' '}
              <span style={{ background: 'linear-gradient(90deg, #159c48, #22c55e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                In Action
              </span>
            </h2>
            
          </div>
        </div>

        {/* Videos grid — stacks on mobile */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {videos.map(v => <VideoCard key={v._id} video={v} src={srcFor(v)} />)}
        </div>
      </div>
    </section>
  )
}

export default VideoSection
