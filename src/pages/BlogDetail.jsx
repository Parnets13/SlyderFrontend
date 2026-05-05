import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams, Link } from 'react-router-dom'
import { Calendar, User, ArrowLeft, Eye } from 'lucide-react'

const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/api$/, '') || 'https://slyderind.in'

function BlogDetail() {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${BASE_URL}/api/blog/slug/${slug}`)
      .then(r => r.json())
      .then(data => setBlog(data))
      .catch(err => console.error('Error fetching blog:', err))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', paddingTop: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#64748b', fontSize: 18 }}>Loading...</div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', paddingTop: 100 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>Blog Not Found</h1>
          <p style={{ color: '#64748b', marginBottom: 24 }}>The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" style={{ color: '#159c48', fontWeight: 600, textDecoration: 'none' }}>
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  const imgSrc = `${BASE_URL}/uploads/blogs/${blog.image}`
  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingTop: 100 }}>
      <Helmet>
        <title>{blog.title} | Slyder Blog</title>
        <meta name="description" content={blog.shortDescription} />
      </Helmet>

      <article style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px 80px' }}>
        {/* Back Button */}
        <Link
          to="/blog"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            color: '#64748b',
            fontSize: 14,
            fontWeight: 600,
            textDecoration: 'none',
            marginBottom: 32,
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#159c48'}
          onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        {/* Featured Image */}
        <div
          style={{
            width: '100%',
            height: 400,
            borderRadius: 16,
            overflow: 'hidden',
            marginBottom: 32,
            background: '#f1f5f9',
          }}
        >
          <img
            src={imgSrc}
            alt={blog.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Meta Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24, flexWrap: 'wrap' }}>
          <span
            style={{
              padding: '6px 14px',
              background: 'rgba(21,156,72,0.1)',
              color: '#159c48',
              fontSize: 12,
              fontWeight: 700,
              borderRadius: 6,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {blog.category}
          </span>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 14,
              color: '#64748b',
              fontWeight: 500,
            }}
          >
            <Calendar size={16} />
            {formattedDate}
          </span>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 14,
              color: '#64748b',
              fontWeight: 500,
            }}
          >
            <User size={16} />
            {blog.author}
          </span>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 14,
              color: '#64748b',
              fontWeight: 500,
            }}
          >
            <Eye size={16} />
            {blog.views} views
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            margin: '0 0 24px',
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 900,
            color: '#0f172a',
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
          }}
        >
          {blog.title}
        </h1>

        {/* Short Description */}
        <p
          style={{
            margin: '0 0 32px',
            fontSize: 18,
            color: '#64748b',
            lineHeight: 1.7,
            fontWeight: 500,
          }}
        >
          {blog.shortDescription}
        </p>

        {/* Divider */}
        <div
          style={{
            width: 60,
            height: 4,
            background: 'linear-gradient(90deg, #159c48, #4ade80)',
            borderRadius: 4,
            marginBottom: 32,
          }}
        />

        {/* Content */}
        <div
          style={{
            fontSize: 16,
            lineHeight: 1.8,
            color: '#334155',
          }}
          dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br/>') }}
        />

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#64748b' }}>Tags:</span>
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  style={{
                    padding: '6px 12px',
                    background: '#f1f5f9',
                    color: '#64748b',
                    fontSize: 13,
                    fontWeight: 500,
                    borderRadius: 6,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Back to Blog CTA */}
        <div
          style={{
            marginTop: 60,
            padding: 32,
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            borderRadius: 12,
            textAlign: 'center',
          }}
        >
          <h3 style={{ margin: '0 0 12px', fontSize: 24, fontWeight: 800, color: '#fff' }}>
            Read More Articles
          </h3>
          <p style={{ margin: '0 0 20px', fontSize: 15, color: 'rgba(255,255,255,0.7)' }}>
            Explore more insights about hotel security and smart lock systems
          </p>
          <Link
            to="/blog"
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
            View All Posts
          </Link>
        </div>
      </article>
    </div>
  )
}

export default BlogDetail
