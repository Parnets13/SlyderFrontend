import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Calendar, User, ArrowRight } from 'lucide-react'

const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/api$/, '') || 'https://slyderind.in'

function BlogCard({ blog }) {
  const imgSrc = `${BASE_URL}/uploads/blogs/${blog.image}`
  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <Link
      to={`/blog/${blog.slug}`}
      style={{
        display: 'block',
        background: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
        transition: 'all 0.3s ease',
        textDecoration: 'none',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
      className="blog-card"
    >
      {/* Image */}
      <div style={{ position: 'relative', paddingTop: '60%', overflow: 'hidden', background: '#f1f5f9' }}>
        <img
          src={imgSrc}
          alt={blog.title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
          }}
          className="blog-card-image"
        />
        {blog.isFeatured && (
          <div
            style={{
              position: 'absolute',
              top: 16,
              left: 16,
              padding: '6px 12px',
              background: '#159c48',
              color: '#fff',
              fontSize: 11,
              fontWeight: 700,
              borderRadius: 6,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: 24 }}>
        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12, flexWrap: 'wrap' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 12,
              color: '#64748b',
              fontWeight: 500,
            }}
          >
            <Calendar size={14} />
            {formattedDate}
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 12,
              color: '#64748b',
              fontWeight: 500,
            }}
          >
            <User size={14} />
            {blog.author}
          </span>
          <span
            style={{
              padding: '4px 10px',
              background: '#f1f5f9',
              color: '#64748b',
              fontSize: 11,
              fontWeight: 600,
              borderRadius: 6,
            }}
          >
            {blog.category}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            margin: '0 0 12px',
            fontSize: 20,
            fontWeight: 800,
            color: '#0f172a',
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {blog.title}
        </h3>

        {/* Description */}
        <p
          style={{
            margin: '0 0 16px',
            fontSize: 14,
            color: '#64748b',
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {blog.shortDescription}
        </p>

        {/* Read More */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            color: '#159c48',
            fontSize: 14,
            fontWeight: 700,
          }}
          className="blog-card-link"
        >
          Read More
          <ArrowRight size={16} className="blog-card-arrow" />
        </div>
      </div>
    </Link>
  )
}

function Blog() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${BASE_URL}/api/blog`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBlogs(data)
        }
      })
      .catch(err => console.error('Error fetching blogs:', err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingTop: 100 }}>
      <Helmet>
        <title>Blog - Hotel Lock Systems & Security Insights | Slyder</title>
        <meta name="description" content="Learn about smart locks, RFID systems, and hotel security solutions. Expert insights on hotel lock technology and industry trends." />
      </Helmet>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px 80px' }}>
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
            Insights & Updates
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
            Hotel Lock Systems &{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #159c48, #4ade80)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Security Insights
            </span>
          </h1>

          <p
            style={{
              margin: 0,
              fontSize: 18,
              color: '#64748b',
              maxWidth: 700,
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.6,
            }}
          >
            Learn about smart locks, RFID systems, and hotel security solutions
          </p>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#64748b' }}>
            Loading blogs...
          </div>
        ) : blogs.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 32,
            }}
          >
            {blogs.map(blog => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
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
            No blog posts available yet. Check back soon!
          </div>
        )}
      </div>

      <style>{`
        .blog-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.12);
          border-color: rgba(21,156,72,0.2);
        }
        .blog-card:hover .blog-card-image {
          transform: scale(1.05);
        }
        .blog-card:hover .blog-card-link {
          color: #117a38;
        }
        .blog-card:hover .blog-card-arrow {
          transform: translateX(4px);
        }
        .blog-card-arrow {
          transition: transform 0.3s ease;
        }
      `}</style>
    </div>
  )
}

export default Blog
