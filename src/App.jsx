// import { Routes, Route, useLocation } from 'react-router-dom'
// import './App.css'
// import Header from './components/Header'
// import Footer from './components/Footer'
// import ScrollToTop from './components/ScrollToTop'

// // Home page components
// import BannerImage from './components/BannerImage'
// import Announcement from './components/Announcement'
// import LocksAccessories from './components/LocksAccessories'
// import AboutSlyder from './components/AboutSlyder'
// import VideoSection from './components/VideoSection'
// import HotelsSection from './components/HotelsSection'
// import StarClients from './components/StarClients'
// import Testimonial from './components/Testimonial'

// // Pages
// import About from './pages/About'
// import DistributorNetwork from './pages/DistributorNetwork'
// import BecomeDistributor from './pages/BecomeDistributor'
// import Contact from './pages/Contact'
// import Projects from './pages/Projects'
// import Products from './pages/Products'
// import ProductDetail from './pages/ProductDetail'

// // Admin
// import AdminLogin from './admin/AdminLogin'
// import AdminLayout from './admin/AdminLayout'
// import AdminDashboard from './admin/pages/AdminDashboard'
// import AdminBanners from './admin/pages/AdminBanners'
// import AdminProducts from './admin/pages/AdminProducts'
// import AdminTestimonials from './admin/pages/AdminTestimonials'
// import AdminAnnouncements from './admin/pages/AdminAnnouncements'
// import AdminContact from './admin/pages/AdminContact'
// import AdminContactInfo from './admin/pages/AdminContactInfo'
// import AdminContactMessages from './admin/pages/AdminContactMessages'
// import AdminFeaturedProducts from './admin/pages/AdminFeaturedProducts'
// import AdminVideos from './admin/pages/AdminVideos'
// import AdminHotels from './admin/pages/AdminHotels'
// import AdminAbout from './admin/pages/AdminAbout'
// import AdminAboutSlyder from './admin/pages/AdminAboutSlyder'
// import AdminDistributor from './admin/pages/AdminDistributor'
// import AdminProjects from './admin/pages/AdminProjects'
// import AdminBecomeDistributorContent from './admin/pages/AdminBecomeDistributorContent'
// import AdminBecomeDistributorApps from './admin/pages/AdminBecomeDistributorApps'
// import AdminStarClients from './admin/pages/AdminStarClients'

// function HomePage() {
//   return (
//     <>
//       <BannerImage />
//       <Announcement />
//       <LocksAccessories />
//       <AboutSlyder />
//       <VideoSection />
//       <StarClients />
//       <HotelsSection />
//       <Testimonial />
//     </>
//   )
// }

// function App() {
//   const location = useLocation()
//   const isAdmin = location.pathname.startsWith('/admin')

//   return (
//     <>
//       <ScrollToTop />
//       {!isAdmin && <Header />}
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/distributors" element={<DistributorNetwork />} />
//         <Route path="/become-distributor" element={<BecomeDistributor />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/projects" element={<Projects />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/products/:slug" element={<ProductDetail />} />

//         {/* Admin */}
//         <Route path="/admin" element={<AdminLogin />} />
//         <Route path="/admin/admin" element={<AdminLogin />} />
//         <Route path="/admin/dashboard"     element={<AdminLayout><AdminDashboard /></AdminLayout>} />
//         <Route path="/admin/banners"       element={<AdminLayout><AdminBanners /></AdminLayout>} />
//         <Route path="/admin/products"      element={<AdminLayout><AdminProducts /></AdminLayout>} />
//         <Route path="/admin/testimonials" element={<AdminLayout><AdminTestimonials /></AdminLayout>} />
//         <Route path="/admin/announcements" element={<AdminLayout><AdminAnnouncements /></AdminLayout>} />
//         <Route path="/admin/contact" element={<AdminLayout><AdminContact /></AdminLayout>} />
//         <Route path="/admin/contact-info"     element={<AdminLayout><AdminContactInfo /></AdminLayout>} />
//         <Route path="/admin/contact-messages" element={<AdminLayout><AdminContactMessages /></AdminLayout>} />
//         <Route path="/admin/featured-products" element={<AdminLayout><AdminFeaturedProducts /></AdminLayout>} />
//         <Route path="/admin/videos"            element={<AdminLayout><AdminVideos /></AdminLayout>} />
//         <Route path="/admin/hotels"            element={<AdminLayout><AdminHotels /></AdminLayout>} />
//         <Route path="/admin/about"             element={<AdminLayout><AdminAbout /></AdminLayout>} />
//         <Route path="/admin/about-slyder"      element={<AdminLayout><AdminAboutSlyder /></AdminLayout>} />
//         <Route path="/admin/distributor"       element={<AdminLayout><AdminDistributor /></AdminLayout>} />
//         <Route path="/admin/become-distributor" element={<AdminLayout><AdminBecomeDistributorContent /></AdminLayout>} />
//         <Route path="/admin/distributor-apps"   element={<AdminLayout><AdminBecomeDistributorApps /></AdminLayout>} />
//         <Route path="/admin/projects"          element={<AdminLayout><AdminProjects /></AdminLayout>} />
//         <Route path="/admin/star-clients"      element={<AdminLayout><AdminStarClients /></AdminLayout>} />
//       </Routes>
//       {!isAdmin && <Footer />}
//     </>
//   )
// }

// export default App 
 
  

import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

// Home page components
import BannerImage from './components/BannerImage'
import Announcement from './components/Announcement'
import LocksAccessories from './components/LocksAccessories'
import AboutSlyder from './components/AboutSlyder'
import VideoSection from './components/VideoSection'
import HotelsSection from './components/HotelsSection'
import StarClients from './components/StarClients'
import Testimonial from './components/Testimonial'

// Pages
import About from './pages/About'
import DistributorNetwork from './pages/DistributorNetwork'
import BecomeDistributor from './pages/BecomeDistributor'
import Contact from './pages/Contact'
import Projects from './pages/Projects'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'

// Admin
import AdminLogin from './admin/AdminLogin'
import AdminLayout from './admin/AdminLayout'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminBanners from './admin/pages/AdminBanners'
import AdminProducts from './admin/pages/AdminProducts'
import AdminTestimonials from './admin/pages/AdminTestimonials'
import AdminAnnouncements from './admin/pages/AdminAnnouncements'
import AdminContact from './admin/pages/AdminContact'
import AdminContactInfo from './admin/pages/AdminContactInfo'
import AdminContactMessages from './admin/pages/AdminContactMessages'
import AdminFeaturedProducts from './admin/pages/AdminFeaturedProducts'
import AdminVideos from './admin/pages/AdminVideos'
import AdminHotels from './admin/pages/AdminHotels'
import AdminAbout from './admin/pages/AdminAbout'
import AdminAboutSlyder from './admin/pages/AdminAboutSlyder'
import AdminDistributor from './admin/pages/AdminDistributor'
import AdminProjects from './admin/pages/AdminProjects'
import AdminBecomeDistributorContent from './admin/pages/AdminBecomeDistributorContent'
import AdminBecomeDistributorApps from './admin/pages/AdminBecomeDistributorApps'
import AdminStarClients from './admin/pages/AdminStarClients'

function HomePage() {
  return (
    <>
      <BannerImage />
      <Announcement />
      <HotelsSection />
      <LocksAccessories />
      <AboutSlyder />
      <VideoSection />
      {/* <StarClients /> */}
      
      <Testimonial />
    </>
  )
}

function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  // ✅ WhatsApp config
  const phoneNumber = '919845670055' // replace with your number
  const message = 'Hello, I need more information'

  const openWhatsApp = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Header />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/distributors" element={<DistributorNetwork />} />
        <Route path="/become-distributor" element={<BecomeDistributor />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/banners" element={<AdminLayout><AdminBanners /></AdminLayout>} />
        <Route path="/admin/products" element={<AdminLayout><AdminProducts /></AdminLayout>} />
        <Route path="/admin/testimonials" element={<AdminLayout><AdminTestimonials /></AdminLayout>} />
        <Route path="/admin/announcements" element={<AdminLayout><AdminAnnouncements /></AdminLayout>} />
        <Route path="/admin/contact" element={<AdminLayout><AdminContact /></AdminLayout>} />
        <Route path="/admin/contact-info" element={<AdminLayout><AdminContactInfo /></AdminLayout>} />
        <Route path="/admin/contact-messages" element={<AdminLayout><AdminContactMessages /></AdminLayout>} />
        <Route path="/admin/featured-products" element={<AdminLayout><AdminFeaturedProducts /></AdminLayout>} />
        <Route path="/admin/videos" element={<AdminLayout><AdminVideos /></AdminLayout>} />
        <Route path="/admin/hotels" element={<AdminLayout><AdminHotels /></AdminLayout>} />
        <Route path="/admin/about" element={<AdminLayout><AdminAbout /></AdminLayout>} />
        <Route path="/admin/about-slyder" element={<AdminLayout><AdminAboutSlyder /></AdminLayout>} />
        <Route path="/admin/distributor" element={<AdminLayout><AdminDistributor /></AdminLayout>} />
        <Route path="/admin/become-distributor" element={<AdminLayout><AdminBecomeDistributorContent /></AdminLayout>} />
        <Route path="/admin/distributor-apps" element={<AdminLayout><AdminBecomeDistributorApps /></AdminLayout>} />
        <Route path="/admin/projects" element={<AdminLayout><AdminProjects /></AdminLayout>} />
        <Route path="/admin/star-clients" element={<AdminLayout><AdminStarClients /></AdminLayout>} />
      </Routes>

      {!isAdmin && <Footer />}

      {/* ✅ WhatsApp Floating Button (Right Side, Official Icon) */}
      {!isAdmin && (
        <button
          onClick={openWhatsApp}
          className="fixed right-5 bottom-12 z-50 hover:scale-110 transition-transform duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-14 h-14"
          >
            <path
              fill="#25D366"
              d="M16 .4C7.4.4.4 7.4.4 16c0 2.8.7 5.4 2 7.7L.4 31.6l8.1-2.1c2.2 1.2 4.8 1.9 7.5 1.9 8.6 0 15.6-7 15.6-15.6S24.6.4 16 .4z"
            />
            <path
              fill="#fff"
              d="M24.1 19.5c-.4-.2-2.5-1.2-2.9-1.3-.4-.1-.7-.2-1 .2-.3.4-1.1 1.3-1.3 1.6-.2.2-.5.3-.9.1-.4-.2-1.6-.6-3.1-2-1.2-1.1-2-2.5-2.2-2.9-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.2-.4.3-.6.1-.2 0-.5-.1-.7-.1-.2-1-2.4-1.4-3.3-.3-.7-.7-.6-1-.6h-.9c-.3 0-.7.1-1 .5-.3.4-1.3 1.3-1.3 3.1s1.3 3.6 1.5 3.8c.2.2 2.6 4 6.3 5.5.9.4 1.6.6 2.2.8.9.3 1.7.2 2.3.1.7-.1 2.5-1 2.8-2 .3-1 .3-1.8.2-2-.1-.2-.4-.3-.8-.5z"
            />
          </svg>
        </button>
      )}
    </>
  )
}

export default App