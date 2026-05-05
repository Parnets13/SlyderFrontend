import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import cor2 from '../assets/cor2.jpg'
import cor1 from '../assets/cor1.png'
import cor3 from '../assets/cor3.png'

const API_URL = (import.meta.env.VITE_API_URL || 'https://slyderind.in/api').replace('/api', '')

const FALLBACK_SLIDES = [
  { _id: '1', image: null, _local: cor2, title: 'Smart Hotel Lock Solutions',   subtitle: 'Secure. Reliable. Made in India.' },
  { _id: '2', image: null, _local: cor1, title: 'Advanced RFID Technology',     subtitle: 'Next-gen access control for modern hospitality.' },
  { _id: '3', image: null, _local: cor3, title: 'Lock Management Software',     subtitle: 'Centralized control at your fingertips.' },
]

// 3 animations that cycle: fadeUp, fadeLeft, zoomIn
const ANIM_CLASSES = ['anim-fade-up', 'anim-fade-left', 'anim-zoom-in']

function BannerImage() {
  const [slides, setSlides] = useState(FALLBACK_SLIDES)
  const [activeIndex, setActiveIndex] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const swiperRef = useRef(null)

  useEffect(() => {
    fetch(`${API_URL}/api/banners`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setSlides(data) })
      .catch(() => {})
  }, [])

  const imgSrc = (slide) =>
    slide._local ? slide._local : `${API_URL}/uploads/banners/${slide.image}`

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex)
    setAnimKey(k => k + 1)
  }

  // pick animation cycling through 3, wrapping for any number of slides
  const animClass = ANIM_CLASSES[activeIndex % ANIM_CLASSES.length]

  return (
    <div className="relative w-full banner-wrapper" style={{ overflow: 'hidden' }}>
      {/* SEO: Dynamic Meta Description */}
      <Helmet>
        <meta name="description" content={slides[activeIndex]?.subtitle || 'Smart Hotel Lock Solutions - Secure, Reliable, Made in India'} />
      </Helmet>

      <Swiper
        modules={[Autoplay, Pagination]}
        onSwiper={(s) => { swiperRef.current = s }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        speed={800}
        onSlideChange={handleSlideChange}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide._id}>
            <div className="relative w-full h-full overflow-hidden">

              {/* Full-screen background for all screen sizes */}
              <div
                className="absolute inset-0 bg-cover bg-center banner-zoom"
                style={{ backgroundImage: `url(${imgSrc(slide)})` }}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 z-10" style={{
                background: 'linear-gradient(105deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.1) 100%)'
              }} />

              {/* Bottom vignette */}
              <div className="absolute bottom-0 left-0 right-0 h-40 z-10" style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)'
              }} />

              {/* Content */}
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="w-full px-6 md:px-20">
                  <div key={animKey} className={`max-w-2xl ${animClass}`}>
                    {/* SEO: H1 Tag */}
                    <h1
                      className="text-3xl sm:text-5xl md:text-7xl font-black text-white leading-[1.05] mb-4 md:mb-6"
                      style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
                    >
                      {slide.title}
                    </h1>
                    <div className="w-14 md:w-20 h-1.5 rounded-full bg-[#159c48] mb-4 md:mb-6" />
                    {/* SEO: Meta Description (displayed as subtitle) */}
                    <p className="text-sm sm:text-base md:text-xl text-white/80 leading-relaxed font-medium max-w-sm md:max-w-none">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Prev Button */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 group"
        aria-label="Previous slide"
      >
        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2 border-white/30 bg-black/20 backdrop-blur-md transition-all duration-300 group-hover:bg-[#159c48] group-hover:border-[#159c48] group-hover:scale-110 group-hover:shadow-[0_0_24px_rgba(21,156,72,0.5)]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </div>
      </button>

      {/* Custom Next Button */}
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 group"
        aria-label="Next slide"
      >
        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2 border-white/30 bg-black/20 backdrop-blur-md transition-all duration-300 group-hover:bg-[#159c48] group-hover:border-[#159c48] group-hover:scale-110 group-hover:shadow-[0_0_24px_rgba(21,156,72,0.5)]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </div>
      </button>

      <style>{`
        .banner-wrapper,
        .banner-wrapper .swiper,
        .banner-wrapper .swiper-wrapper,
        .banner-wrapper .swiper-slide {
          height: 100svh;
          min-height: 0;
          max-height: none;
        }
        .banner-zoom {
          animation: kenburns 8s ease-in-out forwards;
        }
        @keyframes kenburns {
          0%   { transform: scale(1.08); }
          100% { transform: scale(1); }
        }

        /* Animation 1 — fade up */
        .anim-fade-up {
          animation: fadeUp 0.75s ease forwards;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Animation 2 — fade from left */
        .anim-fade-left {
          animation: fadeLeft 0.75s ease forwards;
        }
        @keyframes fadeLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* Animation 3 — zoom in */
        .anim-zoom-in {
          animation: zoomIn 0.75s ease forwards;
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }

        .swiper-pagination {
          bottom: 24px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: auto !important;
          text-align: center !important;
        }
        @media (min-width: 768px) {
          .swiper-pagination {
            bottom: 36px !important;
            left: 72px !important;
            transform: none !important;
            text-align: left !important;
          }
        }
        .swiper-pagination-bullet {
          background: rgba(255,255,255,0.35) !important;
          width: 8px !important;
          height: 8px !important;
          opacity: 1 !important;
          transition: all 0.3s ease !important;
        }
        .swiper-pagination-bullet-active {
          background: #159c48 !important;
          width: 32px !important;
          border-radius: 4px !important;
        }
      `}</style>
    </div>
  )
}

export default BannerImage
