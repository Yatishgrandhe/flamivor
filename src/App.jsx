import { useState, useCallback, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import SplashScreen from './components/SplashScreen'
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

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
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
  const [splashDone, setSplashDone] = useState(false)
  const onSplashComplete = useCallback(() => setSplashDone(true), [])

  return (
    <BrowserRouter>
      <ScrollToTop />
      {!splashDone && <SplashScreen onComplete={onSplashComplete} />}
      {splashDone && (
        <>
          <Navbar />
          <AnimatedRoutes />
          <Footer />
        </>
      )}
    </BrowserRouter>
  )
}
