import { useState, useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
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
  const menuButtonRef = useRef(null)

  useEffect(() => { setMenuOpen(false) }, [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      aria-label="Main navigation"
    >
      <div className="nav-inner">
        <NavLink to="/" className="nav-logo">
          <img src="/flamivor-logo.png" alt="Flamivor logo" width="144" height="60" />
        </NavLink>

        <div className="nav-links">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => isActive ? 'active' : ''} end>
              {({ isActive }) => <>{isActive && <span className="nav-active-indicator" />}{l.label}</>}
            </NavLink>
          ))}
          <NavLink to="/join" className="nav-cta" end>Join Us</NavLink>
        </div>

        <button ref={menuButtonRef} className="hamburger" onClick={() => setMenuOpen(open => !open)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation">
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
        </button>
      </div>

      {menuOpen && (
          <nav
            id="mobile-navigation"
            className="mobile-menu"
            aria-label="Main navigation"
          >
            {links.map(l => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => isActive ? 'active' : ''} end>
                {l.label}
              </NavLink>
            ))}
            <NavLink to="/join" className="mobile-cta" end>Join Us</NavLink>
          </nav>
      )}
    </nav>
  )
}
