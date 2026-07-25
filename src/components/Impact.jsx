import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BookOpen, Globe, Users, Smartphone, GraduationCap, School, Library, Mic, Banknote, Package } from 'lucide-react'
import './Impact.css'

const stats = [
  { number: '10+', label: 'Flamivor Chapters', icon: School },
  { number: '14+', label: 'Countries Reached', icon: Globe },
  { number: '200+', label: 'Volunteers & Interns', icon: Users },
  { number: '50K+', label: 'People Reached', icon: Smartphone },
  { number: '50+', label: 'Students Directly Supported', icon: GraduationCap },
  { number: '4', label: 'Schools Partnered With', icon: School },
  { number: '20+', label: 'Resources Created', icon: Library },
  { number: '2', label: 'Workshops Conducted', icon: Mic },
  { number: '10K+', label: 'Money Raised (PKR)', icon: Banknote },
  { number: '50+', label: 'Educational Kits Delivered', icon: Package },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Impact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="impact">
      <div className="section-inner">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Impact
        </motion.div>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Making a difference,<br />one student at a time
        </motion.h2>
        <motion.p
          className="section-desc"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          From Pakistan to 14+ countries, Flamivor is building a global movement of accessible education.
        </motion.p>

        <motion.div
          className="stats-grid"
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {stats.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div key={i} className="stat-card" variants={item} whileHover={{ y: -6, transition: { duration: 0.2 } }}>
                <div className="stat-icon"><Icon size={22} /></div>
                <div className="stat-number">{s.number}</div>
                <div className="stat-label">{s.label}</div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
