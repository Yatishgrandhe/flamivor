import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src="/logo.jpg" alt="Flamivor" />
            </Link>
            <p>A youth-led initiative dedicated to empowering young people through education and advancing UN SDGs 4 and 10.</p>
          </div>
          <div className="footer-col">
            <h4>Navigate</h4>
            <Link to="/">Home</Link>
            <Link to="/impact">Impact</Link>
            <Link to="/team">Team</Link>
          </div>
          <div className="footer-col">
            <h4>Get Involved</h4>
            <Link to="/join">Join Us</Link>
            <Link to="/resources">Resources</Link>
            <Link to="/extracurriculars">Extracurriculars</Link>
            <Link to="/gallery">Gallery & Press</Link>
          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <a href="mailto:flamivor@gmail.com">Email Us</a>
            <a href="https://linktr.ee/flamivor" target="_blank" rel="noopener noreferrer">Linktree</a>
            <a href="https://www.instagram.com/flamivor/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.youtube.com/@flamivor" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Copyright &copy; 2024–2026 Flamivor. All rights reserved.</p>
          <a href="mailto:flamivor@gmail.com">flamivor@gmail.com</a>
        </div>
      </div>
    </footer>
  )
}
