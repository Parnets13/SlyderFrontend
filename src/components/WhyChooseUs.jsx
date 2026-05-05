import { Helmet } from 'react-helmet-async'
import { useState, useEffect } from 'react'
import * as Icons from 'lucide-react'

const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/api$/, '') || 'https://slyderind.in'

// Fallback features if API fails
const FALLBACK_FEATURES = [
  {
    icon: 'Shield',
    title: '100% Made in India',
    description: 'Proudly manufactured in India with indigenous RFID technology and software solutions.',
    color: '#159c48',
  },
  {
    icon: 'Award',
    title: 'Industry-First Features',
    description: 'Revolutionary transaction alert system that keeps you informed in real-time.',
    color: '#f59e0b',
  },
  {
    icon: 'Headphones',
    title: '24/7 Support',
    description: 'Round-the-clock customer service ensuring complete satisfaction and peace of mind.',
    color: '#3b82f6',
  },
  {
    icon: 'Zap',
    title: 'Advanced Technology',
    description: 'Cutting-edge RFID and Bluetooth technology for seamless access control.',
    color: '#8b5cf6',
  },
  {
    icon: 'Globe',
    title: 'Trusted Nationwide',
    description: 'Leading hotels across India trust Slyder for their security infrastructure.',
    color: '#ec4899',
  },
  {
    icon: 'TrendingUp',
    title: 'Proven Track Record',
    description: 'Over 5 years of excellence in hospitality security solutions.',
    color: '#06b6d4',
  },
]

function FeatureCard({ feature, index }) {
  const IconComponent = Icons[feature.icon]

  return (
    <div
      className="feature-card"
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 20,
        padding: '32px 28px',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      {/* Gradient overlay on hover */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${feature.color}08, transparent)`,
          opacity: 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }}
        className="feature-card-overlay"
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Icon */}
        {IconComponent ? (
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: `${feature.color}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              transition: 'transform 0.3s ease',
            }}
            className="feature-icon-wrapper"
          >
            <IconComponent size={32} color={feature.color} strokeWidth={2} />
          </div>
        ) : null}

        {/* Title */}
        <h3
          style={{
            margin: '0 0 12px',
            fontSize: 20,
            fontWeight: 800,
            color: '#0f172a',
            letterSpacing: '-0.02em',
          }}
        >
          {feature.title}
        </h3>

        {/* Description */}
        <p
          style={{
            margin: 0,
            fontSize: 15,
            lineHeight: 1.6,
            color: '#64748b',
            fontWeight: 500,
          }}
        >
          {feature.description}
        </p>
      </div>
    </div>
  )
}

function WhyChooseUs() {
  const [features, setFeatures] = useState(FALLBACK_FEATURES)

  useEffect(() => {
    fetch(`${BASE_URL}/api/why-choose-us`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setFeatures(data)
        }
      })
      .catch(() => {
        // Use fallback features on error
      })
  }, [])

  const h1Text = 'Why Choose Slyder'
  const metaDescription = '100% Made in India hotel lock systems with industry-first features, 24/7 support, advanced RFID technology, and proven track record across India.'

  return (
    <section
      style={{
        padding: '80px 20px',
        background: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* SEO: H1 and Meta Description */}
      <Helmet>
        <meta name="description" content={metaDescription} />
      </Helmet>

      {/* Background decorative elements */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.3 }}>
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-5%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(21,156,72,0.08) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: '-5%',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
          }}
        />
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '6px 18px',
              borderRadius: 100,
              background: 'rgba(21,156,72,0.1)',
              border: '1px solid rgba(21,156,72,0.2)',
              color: '#159c48',
              marginBottom: 16,
            }}
          >
            Our Advantages
          </span>

          <h1
            style={{
              margin: '0 0 16px',
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 900,
              color: '#0f172a',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            Why Choose{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #159c48, #4ade80)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Slyder
            </span>
          </h1>

          <div
            style={{
              width: 60,
              height: 4,
              borderRadius: 4,
              background: 'linear-gradient(90deg, transparent, #159c48, transparent)',
              margin: '0 auto 20px',
            }}
          />

          <p
            style={{
              margin: 0,
              fontSize: 18,
              color: '#64748b',
              maxWidth: 600,
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.6,
            }}
          >
            Experience the perfect blend of innovation, reliability, and Indian craftsmanship
          </p>
        </div>

        {/* Features Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
          }}
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>

      <style>{`
        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.12);
          border-color: ${features[0].color}40;
        }
        .feature-card:hover .feature-card-overlay {
          opacity: 1;
        }
        .feature-card:hover .feature-icon-wrapper {
          transform: scale(1.1);
        }
        @media (max-width: 640px) {
          .feature-card {
            padding: 24px 20px !important;
          }
        }
      `}</style>
    </section>
  )
}

export default WhyChooseUs
