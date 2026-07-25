import { motion } from 'framer-motion'
import './Footer.css'

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#home" className="footer-logo">
              <img src="/logo.png" alt="Flamivor" />
              <span>Flamivor</span>
            </a>
            <p>A youth-led initiative dedicated to empowering young people through education and advancing UN SDGs 4 and 10.</p>
          </div>
          <div className="footer-col">
            <h4>Navigate</h4>
            <a href="#home">Home</a>
            <a href="#impact">Impact</a>
            <a href="#team">Team</a>
            <a href="#about">About Us</a>
          </div>
          <div className="footer-col">
            <h4>Get Involved</h4>
            <a href="#join">Join Us</a>
            <a href="#resources">Resources</a>
            <a href="#extracurriculars">Extracurriculars</a>
            <a href="#gallery">Gallery & Press</a>
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
