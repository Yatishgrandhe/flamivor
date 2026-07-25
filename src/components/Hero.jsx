import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, Globe, Users, BookOpen, Heart } from 'lucide-react'
import './Hero.css'

const statsData = [
  { icon: Globe, num: '14+', label: 'Countries' },
  { icon: Users, num: '200+', label: 'Volunteers' },
  { icon: BookOpen, num: '20+', label: 'Resources' },
  { icon: Heart, num: '50K+', label: 'Lives Touched' },
]

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useSpring(useTransform(scrollYProgress, [0, 0.5], [0, 60]), { stiffness: 50, damping: 20 })

  return (
    <section ref={ref} className="hero-section">
      <div className="hero-bg">
        <div className="hero-noise" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-grid" />
      </div>

      <motion.div className="hero-wrapper" style={{ y }}>
        <motion.div className="hero-content" variants={stagger} initial="hidden" animate="visible">

          <motion.div variants={fadeUp} className="hero-eyebrow">
            <span className="eyebrow-dot" />
            Free for every student, always
          </motion.div>

          <motion.h1 variants={fadeUp} className="hero-heading">
            Education is a right.
            <br />
            <span className="hero-heading-gradient">Not a privilege.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="hero-body">
            Flamivor bridges the digital divide — providing free STEM resources,
            peer mentorship, and wellness strategies so every student can thrive,
            regardless of background or geography.
          </motion.p>

          <motion.div variants={fadeUp} className="hero-actions">
            <Link to="/join" className="hero-cta-primary">
              Join the Movement
              <ArrowRight size={16} />
            </Link>
            <Link to="/resources" className="hero-cta-secondary">
              Explore Resources
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="hero-stats-row">
            {statsData.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={i} className="hero-stat">
                  <Icon size={16} className="hero-stat-icon" />
                  <span className="hero-stat-num">{s.num}</span>
                  <span className="hero-stat-label">{s.label}</span>
                </div>
              )
            })}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
