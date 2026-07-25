import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import SplashScreen from './components/SplashScreen'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'
import TeamPage from './pages/TeamPage'
import GalleryPage from './pages/GalleryPage'
import ResourcesPage from './pages/ResourcesPage'
import ImpactPage from './pages/ImpactPage'
import JoinPage from './pages/JoinPage'
import ExtracurricularsPage from './pages/ExtracurricularsPage'
import ContactPage from './pages/ContactPage'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/extracurriculars" element={<ExtracurricularsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </PageTransition>
    </AnimatePresence>
  )
}

export default function App() {
  const [splashDone, setSplashDone] = useState(false)
  const onSplashComplete = useCallback(() => setSplashDone(true), [])

  return (
    <BrowserRouter>
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
