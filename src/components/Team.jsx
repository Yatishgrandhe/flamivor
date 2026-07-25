import { motion } from 'framer-motion'
import './Team.css'

const team = [
  { name: 'Fatima Tu Zahra', role: 'Founder & Chief Executive Officer', initials: 'FT' },
  { name: 'Ahmad Faisal', role: 'President', initials: 'AF' },
  { name: 'Maira Faisal', role: 'Co-President', initials: 'MF' },
  { name: 'Annie Jiao', role: 'Brand Strategy & Design Lead', initials: 'AJ' },
]

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }
const item = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Team() {
  return (
    <section id="team">
      <div className="section-inner">
        <motion.div className="section-label" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          Our Team
        </motion.div>
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
          Meet the people behind<br />the mission
        </motion.h2>
        <motion.p className="section-desc" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
          Students, volunteers, and leaders united by one mission — making learning free and accessible for all.
        </motion.p>

        <motion.div className="team-grid" variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          {team.map((m, i) => (
            <motion.div key={i} className="team-card" variants={item} whileHover={{ y: -8, transition: { duration: 0.25 } }}>
              <div className="team-avatar">{m.initials}</div>
              <h3>{m.name}</h3>
              <p className="role">{m.role}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="team-cta" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
          <p>Want to join our leadership team?</p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSei33hS90nZBKNibIjMA456mYkTLNGVYcI4THY4NxnLo1HWPg/viewform" target="_blank" rel="noopener noreferrer" className="btn-primary">Become an Executive Member →</a>
        </motion.div>
      </div>
    </section>
  )
}
