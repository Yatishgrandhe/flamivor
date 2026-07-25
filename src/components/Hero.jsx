import { useRef, useEffect, useState } from 'react'
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
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}
const fadeUp = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 80])
  const sy = useSpring(y, { stiffness: 50, damping: 20 })

  return (
    <section ref={ref} className="hero-section">
      {/* Background */}
      <div className="hero-bg">
        <div className="hero-noise" />
        <div className="hero-gradient-orb hero-orb-1" />
        <div className="hero-gradient-orb hero-orb-2" />
        <div className="hero-gradient-orb hero-orb-3" />
        <div className="hero-grid-pattern" />
      </div>

      <motion.div className="hero-wrapper" style={{ opacity, y: sy }}>
        <div className="hero-layout">
          {/* Left — Type-First */}
          <motion.div className="hero-left" variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={fadeUp} className="hero-eyebrow">
              <span className="eyebrow-dot" />
              Free for every student, always
            </motion.div>

            <motion.h1 variants={fadeUp} className="hero-heading">
              Empowering the<br />
              <span className="hero-heading-accent">next generation</span><br />
              through education
            </motion.h1>

            <motion.p variants={fadeUp} className="hero-body">
              Flamivor bridges the digital divide — providing free STEM resources,
              peer mentorship, and wellness strategies so every student can thrive.
            </motion.p>

            <motion.div variants={fadeUp} className="hero-actions">
              <Link to="/join" className="hero-cta-primary">
                Get Involved
                <ArrowRight size={16} />
              </Link>
              <Link to="/resources" className="hero-cta-secondary">
                Explore Resources
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — Stats + Visual */}
          <motion.div className="hero-right" variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={fadeUp} className="hero-visual-card">
              <div className="visual-card-inner">
                <img src="/logo.jpg" alt="Flamivor" className="hero-visual-logo" />
                <div className="visual-card-glow" />
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="hero-stats-grid">
              {statsData.map((s, i) => {
                const Icon = s.icon
                return (
                  <div key={i} className="hero-stat-box">
                    <Icon size={18} className="stat-box-icon" />
                    <span className="stat-box-num">{s.num}</span>
                    <span className="stat-box-label">{s.label}</span>
                  </div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
