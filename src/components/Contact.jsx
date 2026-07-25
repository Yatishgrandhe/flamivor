import { useState } from 'react'
import { motion } from 'framer-motion'
import './Contact.css'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    e.target.reset()
  }

  return (
    <section id="contact">
      <div className="section-inner">
        <motion.div className="section-label" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          Contact
        </motion.div>
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Get in touch
        </motion.h2>
        <motion.p className="section-desc" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          Have questions, want to collaborate, or just want to say hello? We'd love to hear from you.
        </motion.p>

        <div className="contact-grid">
          <motion.div className="contact-info" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <a href="https://linktr.ee/flamivor" target="_blank" rel="noopener noreferrer" className="contact-item">
              <div className="contact-icon">🔗</div>
              <div><h4>Linktree</h4><p>linktr.ee/flamivor</p></div>
            </a>
            <a href="mailto:flamivor@gmail.com" className="contact-item">
              <div className="contact-icon">✉️</div>
              <div><h4>Email Us</h4><p>flamivor@gmail.com</p></div>
            </a>
            <div className="social-links">
              <a href="https://www.instagram.com/flamivor/" target="_blank" rel="noopener noreferrer" className="social-link" title="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.tiktok.com/music/original-sound-7523180191519116048?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="social-link" title="TikTok">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.01a6.34 6.34 0 1 0 5.45 6.29V9.55a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.38z"/></svg>
              </a>
              <a href="https://www.youtube.com/@flamivor" target="_blank" rel="noopener noreferrer" className="social-link" title="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
            <div className="partnership-note">
              <p>For partnerships and sponsorships</p>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSeLPLP4FSD4uCjOPoj21jlzAnbhY0SVKP6NQ1VK4vo5bkZhUQ/viewform" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-flex', marginTop: 8 }}>Fill Partnership Form →</a>
            </div>
          </motion.div>

          <motion.div className="contact-form" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <h3>Send us a message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group"><label>First Name</label><input type="text" required /></div>
                <div className="form-group"><label>Last Name</label><input type="text" required /></div>
              </div>
              <div className="form-group"><label>Email</label><input type="email" required /></div>
              <div className="form-group"><label>Message</label><textarea required /></div>
              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Send Message →</button>
              {submitted && <p className="form-success">Thanks for submitting!</p>}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
