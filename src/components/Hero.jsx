import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import './Hero.css'

const floatingOrbs = [
  { size: 300, x: '15%', y: '20%', delay: 0, color: 'rgba(138,1,3,0.06)' },
  { size: 400, x: '70%', y: '60%', delay: 2, color: 'rgba(179,2,5,0.04)' },
  { size: 200, x: '80%', y: '15%', delay: 4, color: 'rgba(138,1,3,0.03)' },
  { size: 250, x: '10%', y: '70%', delay: 1, color: 'rgba(179,2,5,0.05)' },
]

const particles = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 20 + 15,
  delay: Math.random() * 10,
}))

function Particle({ p }) {
  return (
    <motion.div
      className="particle"
      style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
      animate={{ y: [0, -80, 0], x: [0, Math.random() * 40 - 20, 0], opacity: [0, 0.6, 0] }}
      transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
    />
  )
}

const textReveal = {
  hidden: { y: 80, opacity: 0, filter: 'blur(10px)' },
  visible: (i) => ({
    y: 0, opacity: 1, filter: 'blur(0px)',
    transition: { duration: 0.9, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] },
  }),
}

const statsData = [
  { number: '10+', label: 'Chapters' },
  { number: '14+', label: 'Countries' },
  { number: '200+', label: 'Volunteers' },
  { number: '50K+', label: 'Reached' },
]

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scaleDown = useTransform(scrollYProgress, [0, 0.5], [1, 0.92])
  const smoothY = useSpring(yParallax, { stiffness: 50, damping: 20 })

  return (
    <section id="home" ref={ref} className="hero">
      <motion.div className="hero-bg" style={{ y: smoothY, opacity: opacityFade, scale: scaleDown }}>
        <div className="hero-grid" />
        {floatingOrbs.map((orb, i) => (
          <motion.div key={i} className="floating-orb"
            style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y, background: `radial-gradient(circle, ${orb.color}, transparent 70%)` }}
            animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0], scale: [1, 1.1, 0.95, 1] }}
            transition={{ duration: 18 + i * 4, repeat: Infinity, delay: orb.delay, ease: 'easeInOut' }}
          />
        ))}
        {particles.map(p => <Particle key={p.id} p={p} />)}
        <div className="hero-gradient-line line-1" />
        <div className="hero-gradient-line line-2" />
      </motion.div>

      <motion.div className="hero-content" style={{ opacity: opacityFade }}>
        <motion.div className="hero-badge" variants={textReveal} initial="hidden" animate="visible" custom={0}>
          <span className="pulse-dot" />
          Free for every student, always
        </motion.div>

        <motion.h1 variants={textReveal} initial="hidden" animate="visible" custom={1}>
          Flamivor Research<br />& <span className="gradient-text">Resource Initiative</span>
        </motion.h1>

        <motion.p variants={textReveal} initial="hidden" animate="visible" custom={2}>
          Bridging the digital divide for underserved youth — equipping students with STEM resources,
          peer mentorship, and mental wellness strategies to thrive without burning out.
        </motion.p>

        <motion.div className="hero-buttons" variants={textReveal} initial="hidden" animate="visible" custom={3}>
          <Link to="/join" className="btn-primary">
            <span>Get Involved</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <Link to="/resources" className="btn-secondary">Explore Resources</Link>
        </motion.div>

        <motion.div className="hero-stats" variants={textReveal} initial="hidden" animate="visible" custom={4}>
          {statsData.map((s, i) => (
            <div key={i} className="hero-stat">
              <span className="hero-stat-num">{s.number}</span>
              <span className="hero-stat-label">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div className="scroll-indicator" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ opacity: opacityFade }}>
        <div className="scroll-mouse"><div className="scroll-wheel" /></div>
      </motion.div>
    </section>
  )
}
