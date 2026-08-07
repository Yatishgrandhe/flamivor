import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowDownRight, ArrowRight, Sparkles } from 'lucide-react'
import './Hero.css'

const proof = [
  ['14+', 'countries connected'],
  ['200+', 'young volunteers'],
  ['50K+', 'people reached'],
]

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const mediaY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 72]), { stiffness: 70, damping: 24 })
  const copyY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -44]), { stiffness: 70, damping: 24 })

  return (
    <section ref={ref} className="hero-section hero-editorial">
      <div className="hero-topography" aria-hidden="true" />
      <motion.div className="hero-copy" style={{ y: copyY }}>
        <div className="hero-kicker"><Sparkles size={14} aria-hidden="true" /> Education should travel farther</div>
        <h1>Open the <em>way</em><br />to learning.</h1>
        <p>
          Flamivor is a youth-led movement creating free resources, peer mentorship, and practical wellness support for students everywhere.
        </p>
        <div className="hero-actions">
          <Link to="/resources" className="editorial-button">Explore free resources <ArrowRight size={17} aria-hidden="true" /></Link>
          <a href="#journey" className="hero-text-link">See how it works <ArrowDownRight size={18} aria-hidden="true" /></a>
        </div>
      </motion.div>

      <motion.div className="hero-media" style={{ y: mediaY }}>
        <div className="hero-photo hero-photo-main">
          <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=85" alt="Students participating in a classroom lesson" fetchPriority="high" />
        </div>
        <div className="hero-photo hero-photo-small" aria-hidden="true">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=700&q=80" alt="" />
        </div>
        <div className="hero-stamp" aria-label="Flamivor makes education accessible">
          <span>Made for</span><strong>every<br />learner</strong>
        </div>
        <div className="hero-route-mark" aria-hidden="true"><span /></div>
      </motion.div>

      <div className="hero-proof" aria-label="Flamivor impact">
        {proof.map(([number, label]) => <div key={label}><strong>{number}</strong><span>{label}</span></div>)}
      </div>
    </section>
  )
}
