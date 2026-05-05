import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { ChevronDown } from 'lucide-react'

const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/api$/, '') || 'https://slyderind.in'

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 16,
        transition: 'all 0.3s ease',
        boxShadow: isOpen ? '0 4px 12px rgba(0,0,0,0.08)' : '0 2px 4px rgba(0,0,0,0.04)',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 700,
            color: '#0f172a',
            lineHeight: 1.4,
          }}
        >
          {faq.question}
        </h3>
        <ChevronDown
          size={20}
          color="#64748b"
          style={{
            flexShrink: 0,
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      <div
        style={{
          maxHeight: isOpen ? '500px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
        }}
      >
        <div
          style={{
            padding: '0 24px 20px',
            fontSize: 15,
            lineHeight: 1.7,
            color: '#64748b',
          }}
        >
          {faq.answer}
        </div>
      </div>
    </div>
  )
}

function FAQ() {
  const [faqs, setFaqs] = useState([])
  const [openIndex, setOpenIndex] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    fetch(`${BASE_URL}/api/faq`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setFaqs(data)
        }
      })
      .catch(err => console.error('Error fetching FAQs:', err))
  }, [])

  const categories = ['All', ...new Set(faqs.map(f => f.category))]
  const filteredFaqs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(f => f.category === selectedCategory)

  // Generate JSON-LD schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingTop: 100 }}>
      <Helmet>
        <title>FAQ - Frequently Asked Questions | Slyder</title>
        <meta name="description" content="Find answers to frequently asked questions about Slyder hotel lock systems, products, installation, and support." />
        {faqs.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )}
      </Helmet>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 20px 80px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
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
            Help Center
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
            Frequently Asked{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #159c48, #4ade80)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Questions
            </span>
          </h1>

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
            Everything you need to know about Slyder hotel lock systems
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 1 && (
          <div
            style={{
              display: 'flex',
              gap: 12,
              marginBottom: 32,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '10px 20px',
                  borderRadius: 100,
                  border: selectedCategory === cat ? '2px solid #159c48' : '1px solid #e2e8f0',
                  background: selectedCategory === cat ? 'rgba(21,156,72,0.1)' : '#fff',
                  color: selectedCategory === cat ? '#159c48' : '#64748b',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* FAQ List */}
        <div>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <FAQItem
                key={faq._id}
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))
          ) : (
            <div
              style={{
                padding: 60,
                textAlign: 'center',
                background: '#fff',
                borderRadius: 12,
                color: '#64748b',
              }}
            >
              No FAQs available yet.
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div
          style={{
            marginTop: 60,
            padding: 40,
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            borderRadius: 16,
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              margin: '0 0 12px',
              fontSize: 28,
              fontWeight: 800,
              color: '#fff',
            }}
          >
            Still have questions?
          </h2>
          <p
            style={{
              margin: '0 0 24px',
              fontSize: 16,
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            Can't find the answer you're looking for? Please get in touch with our team.
          </p>
          <a
            href="/contact"
            style={{
              display: 'inline-block',
              padding: '12px 32px',
              background: '#159c48',
              color: '#fff',
              fontSize: 16,
              fontWeight: 700,
              borderRadius: 8,
              textDecoration: 'none',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#117a38'}
            onMouseLeave={e => e.currentTarget.style.background = '#159c48'}
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}

export default FAQ
