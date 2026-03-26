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

function HomePage() {
  return (
    <>
      <BannerImage />
      <Announcement />
      <LocksAccessories />
      <AboutSlyder />
      <VideoSection />
      <HotelsSection />
      <Testimonial />
    </>
  )
}

function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

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
        <Route path="/admin/dashboard"     element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/banners"       element={<AdminLayout><AdminBanners /></AdminLayout>} />
        <Route path="/admin/products"      element={<AdminLayout><AdminProducts /></AdminLayout>} />
        <Route path="/admin/testimonials" element={<AdminLayout><AdminTestimonials /></AdminLayout>} />
        <Route path="/admin/announcements" element={<AdminLayout><AdminAnnouncements /></AdminLayout>} />
        <Route path="/admin/contact" element={<AdminLayout><AdminContact /></AdminLayout>} />
        <Route path="/admin/contact-info"     element={<AdminLayout><AdminContactInfo /></AdminLayout>} />
        <Route path="/admin/contact-messages" element={<AdminLayout><AdminContactMessages /></AdminLayout>} />
        <Route path="/admin/featured-products" element={<AdminLayout><AdminFeaturedProducts /></AdminLayout>} />
        <Route path="/admin/videos"            element={<AdminLayout><AdminVideos /></AdminLayout>} />
        <Route path="/admin/hotels"            element={<AdminLayout><AdminHotels /></AdminLayout>} />
        <Route path="/admin/about"             element={<AdminLayout><AdminAbout /></AdminLayout>} />
        <Route path="/admin/about-slyder"      element={<AdminLayout><AdminAboutSlyder /></AdminLayout>} />
        <Route path="/admin/distributor"       element={<AdminLayout><AdminDistributor /></AdminLayout>} />
        <Route path="/admin/become-distributor" element={<AdminLayout><AdminBecomeDistributorContent /></AdminLayout>} />
        <Route path="/admin/distributor-apps"   element={<AdminLayout><AdminBecomeDistributorApps /></AdminLayout>} />
        <Route path="/admin/projects"          element={<AdminLayout><AdminProjects /></AdminLayout>} />
      </Routes>
      {!isAdmin && <Footer />}
    </>
  )
}

export default App
