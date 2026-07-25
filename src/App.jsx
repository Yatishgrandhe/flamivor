import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Impact from './components/Impact'
import About from './components/About'
import Team from './components/Team'
import Resources from './components/Resources'
import Extracurriculars from './components/Extracurriculars'
import Gallery from './components/Gallery'
import JoinUs from './components/JoinUs'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Impact />
      <About />
      <Team />
      <Resources />
      <Extracurriculars />
      <Gallery />
      <JoinUs />
      <Contact />
      <Footer />
    </>
  )
}
