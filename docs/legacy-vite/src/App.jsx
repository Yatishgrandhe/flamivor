import { useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import TeamPage from './pages/TeamPage'
import GalleryPage from './pages/GalleryPage'
import ResourcesPage from './pages/ResourcesPage'
import ImpactPage from './pages/ImpactPage'
import JoinPage from './pages/JoinPage'
import ExtracurricularsPage from './pages/ExtracurricularsPage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import SplashScreen from './components/SplashScreen'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function SiteRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/impact" element={<ImpactPage />} />
      <Route path="/join" element={<JoinPage />} />
      <Route path="/extracurriculars" element={<ExtracurricularsPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  )
}

export default function App() {
  const [showSplash, setShowSplash] = useState(() => (
    typeof window === 'undefined' || !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ))
  const dismissSplash = useCallback(() => setShowSplash(false), [])

  return (
    <BrowserRouter>
      {showSplash && <SplashScreen onComplete={dismissSplash} />}
      <ScrollToTop />
      <Navbar />
      <SiteRoutes />
      <Footer />
    </BrowserRouter>
  )
}
