import { motion } from 'framer-motion'
import './Resources.css'

const resources = [
  { img: 'https://static.wixstatic.com/media/01afaa_28f339f2acbb41eab59c985e82bc7ecd~mv2.png', title: 'Study Flashcards', desc: 'Original, visually engaging flashcards covering key concepts across multiple subjects.' },
  { img: 'https://static.wixstatic.com/media/01afaa_8ab67555fcaf48d0a665f929a0217876~mv2.png', title: 'Mini Lessons', desc: 'Concise, easy-to-understand lesson summaries designed for quick revision and self-study.' },
  { img: 'https://static.wixstatic.com/media/01afaa_018ede2ec32541e18cb927efe317c46c~mv2.png', title: 'Study Guides', desc: 'Comprehensive guides that break down complex topics into digestible, student-friendly content.' },
  { img: 'https://static.wixstatic.com/media/01afaa_d806a3a38260410089a1177657cc3b74~mv2.png', title: 'Educational Kits', desc: 'Curated learning kits delivered to partner schools and communities in need.' },
]

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Resources() {
  return (
    <section id="resources">
      <div className="section-inner">
        <motion.div className="section-label" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          Resources
        </motion.div>
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Digital Resource Library
        </motion.h2>
        <motion.p className="section-desc" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          Free, original study materials — flashcards, mini-lessons, and study guides created by students, for students.
        </motion.p>

        <motion.div style={{ marginBottom: 40 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }}>
          <a href="https://linktr.ee/flamivor" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '1.05rem', padding: '16px 36px' }}>
            Access All Resources on Linktree →
          </a>
        </motion.div>

        <motion.div className="resources-grid" variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          {resources.map((r, i) => (
            <motion.div key={i} className="resource-card" variants={item} whileHover={{ y: -6, transition: { duration: 0.2 } }}>
              <div className="resource-img-wrap">
                <img src={r.img} alt={r.title} loading="lazy" />
              </div>
              <div className="resource-body">
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
                <a href="https://linktr.ee/flamivor" target="_blank" rel="noopener noreferrer" className="resource-link">View on Linktree →</a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
