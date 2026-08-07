import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import './Navbar.css'

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Impact', to: '/impact' },
  { label: 'Team', to: '/team' },
  { label: 'Resources', to: '/resources' },
  { label: 'Extracurriculars', to: '/extracurriculars' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => { setMenuOpen(false) }, [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="nav-inner">
        <NavLink to="/" className="nav-logo">
          <img src="/flamivor-logo.png" alt="Flamivor" />
        </NavLink>

        <div className="nav-links">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => isActive ? 'active' : ''} end>
              {l.label}
            </NavLink>
          ))}
          <NavLink to="/join" className="nav-cta" end>Join Us</NavLink>
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" aria-expanded={menuOpen} aria-controls="mobile-navigation">
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {links.map(l => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => isActive ? 'active' : ''} end>
                {l.label}
              </NavLink>
            ))}
            <NavLink to="/join" className="mobile-cta" end>Join Us</NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
