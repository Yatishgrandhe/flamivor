import { motion } from 'framer-motion'
import './Gallery.css'

export default function Gallery() {
  return (
    <section id="gallery">
      <div className="section-inner">
        <motion.div className="section-label" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          Gallery & Press
        </motion.div>
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Our Partners &<br />Recognition
        </motion.h2>

        <div className="gallery-grid">
          <motion.div className="gallery-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <div className="gallery-card-icon">🏫</div>
            <h3>Partner Schools</h3>
            <p>Including chapters and impacted schools. Gallery and press coverage coming soon — stay tuned for updates on our growing network of partner institutions.</p>
            <div className="gallery-status">Coming Soon</div>
          </motion.div>

          <motion.div className="gallery-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <div className="gallery-card-icon">🏆</div>
            <h3>Recognition</h3>
            <p>Under development. We're compiling press mentions, awards, and recognitions received by Flamivor and our volunteers.</p>
            <div className="gallery-status">Under Development</div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
