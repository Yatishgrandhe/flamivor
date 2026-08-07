import { useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
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

function ResponsiveMotion({ children }) {
  const [compactMotion, setCompactMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(max-width: 760px)')
    const sync = () => setCompactMotion(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  return <MotionConfig reducedMotion={compactMotion ? 'always' : 'user'}>{children}</MotionConfig>
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
        exit={{ opacity: 0, y: -10, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
      >
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
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  const [showSplash, setShowSplash] = useState(() => (
    typeof window === 'undefined' || !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ))
  const dismissSplash = useCallback(() => setShowSplash(false), [])

  return (
    <ResponsiveMotion>
      <BrowserRouter>
        {showSplash && <SplashScreen onComplete={dismissSplash} />}
        <ScrollToTop />
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </BrowserRouter>
    </ResponsiveMotion>
  )
}
