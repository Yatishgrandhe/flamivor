import { useRef, useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimate } from 'framer-motion'
import './Hero.css'

/* ── Particles ── */
const particles = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  dur: Math.random() * 25 + 18,
  delay: Math.random() * 12,
}))

function Particle({ p }) {
  return (
    <motion.div
      className="h-particle"
      style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
      animate={{ y: [0, -(40 + Math.random() * 60), 0], x: [0, (Math.random() * 30 - 15), 0], opacity: [0, 0.5, 0] }}
      transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
    />
  )
}

/* ── Text Scramble ── */
function useScramble(text, trigger) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const [display, setDisplay] = useState('')
  useEffect(() => {
    if (!trigger) return
    let frame = 0
    const total = text.length * 3
    const interval = setInterval(() => {
      setDisplay(text.split('').map((c, i) => {
        if (c === ' ' || c === '\n') return c
        if (frame > i * 3) return c
        return chars[Math.floor(Math.random() * chars.length)]
      }).join(''))
      frame++
      if (frame > total) clearInterval(interval)
    }, 30)
    return () => clearInterval(interval)
  }, [trigger, text])
  return display || text
}

/* ── Magnetic Button ── */
function MagneticBtn({ children, ...props }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const handleMouse = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.15)
    y.set((e.clientY - cy) * 0.15)
  }, [x, y])

  const reset = useCallback(() => { x.set(0); y.set(0) }, [x, y])

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      {...props}
    >
      {children}
    </motion.button>
  )
}

/* ── Counter ── */
function Counter({ to, suffix = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const counted = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !counted.current) {
        counted.current = true
        const dur = 2000; const start = performance.now()
        const step = (now) => {
          const progress = Math.min((now - start) / dur, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setVal(Math.floor(eased * to))
          if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [to])
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>
}

/* ── Hero ── */
const statsData = [
  { num: 10, sfx: '+', label: 'Chapters' },
  { num: 14, sfx: '+', label: 'Countries' },
  { num: 200, sfx: '+', label: 'Volunteers' },
  { num: 50000, sfx: '+', label: 'Reached' },
]

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
}
const fadeUp = {
  hidden: { y: 60, opacity: 0, filter: 'blur(8px)' },
  visible: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  const ref = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 250])
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.94])
  const sy = useSpring(y1, { stiffness: 40, damping: 20 })

  useEffect(() => { setTimeout(() => setScrolled(true), 300) }, [])

  const title = useScramble('Flamivor Research', scrolled)
  const subtitle = useScramble('Resource Initiative', scrolled)

  return (
    <section ref={ref} className="hero-page">
      {/* Mesh Background */}
      <motion.div className="hero-mesh" style={{ y: sy, opacity, scale }}>
        <div className="mesh-gradient mesh-1" />
        <div className="mesh-gradient mesh-2" />
        <div className="mesh-gradient mesh-3" />
        <div className="hero-grid-overlay" />
        {particles.map(p => <Particle key={p.id} p={p} />)}
      </motion.div>

      {/* Decorative Lines */}
      <div className="hero-deco-lines">
        <motion.div className="deco-line dl-1"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }} />
        <motion.div className="deco-line dl-2"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.3, ease: [0.16, 1, 0.3, 1] }} />
      </div>

      {/* Content */}
      <motion.div className="hero-center" style={{ opacity }}>
        <motion.div variants={stagger} initial="hidden" animate="visible" className="hero-stack">

          <motion.div variants={fadeUp} className="hero-badge">
            <span className="badge-dot" />
            Free for every student, always
          </motion.div>

          <motion.h1 variants={fadeUp} className="hero-title">
            {title}<br />
            <span className="hero-gradient">{subtitle}</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="hero-sub">
            Bridging the digital divide for underserved youth — equipping students
            with STEM resources, peer mentorship, and mental wellness strategies
            to thrive without burning out.
          </motion.p>

          <motion.div variants={fadeUp} className="hero-actions">
            <MagneticBtn as="a" href="/join" className="hero-btn-primary">
              Get Involved
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </MagneticBtn>
            <Link to="/resources" className="hero-btn-ghost">Explore Resources</Link>
          </motion.div>

          <motion.div variants={fadeUp} className="hero-stats-row">
            {statsData.map((s, i) => (
              <div key={i} className="hero-stat-item">
                <span className="hero-stat-val"><Counter to={s.num} suffix={s.sfx} /></span>
                <span className="hero-stat-lbl">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div className="hero-scroll" style={{ opacity }} animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
        <div className="scroll-track"><div className="scroll-dot" /></div>
      </motion.div>
    </section>
  )
}
