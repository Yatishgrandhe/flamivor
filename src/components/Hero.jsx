import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowDownRight, ArrowRight, Sparkles } from 'lucide-react'
import useCompactMotion from '../hooks/useCompactMotion'
import './Hero.css'

const proof = [
  ['Free', 'to access'],
  ['Student-led', 'from the start'],
  ['Hands-on', 'by design'],
]

export default function Hero() {
  const ref = useRef(null)
  const compactMotion = useCompactMotion()
  const [lcpReady, setLcpReady] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const mediaY = useSpring(useTransform(scrollYProgress, [0, 1], compactMotion ? [0, 0] : [0, 72]), { stiffness: 70, damping: 24 })
  const copyY = useSpring(useTransform(scrollYProgress, [0, 1], compactMotion ? [0, 0] : [0, -44]), { stiffness: 70, damping: 24 })

  useEffect(() => {
    if (compactMotion || !lcpReady || !ref.current) return undefined

    let disposed = false
    let scope
    void import('animejs').then(({ createScope, createTimeline, stagger, svg }) => {
      if (disposed || !ref.current) return
      scope = createScope({ root: ref.current }).add(() => {
        const path = ref.current.querySelector('.hero-learning-path__active')
        const marker = ref.current.querySelector('.hero-learning-path__marker')
        const proofTiles = ref.current.querySelectorAll('.hero-proof > div')
        if (!path || !marker) return undefined
        const [drawable] = svg.createDrawable(path)
        const motionPath = svg.createMotionPath(path)
        const timeline = createTimeline({ defaults: { ease: 'out(4)' } })
        timeline
          .add(drawable, { draw: ['0 0', '0 1'], duration: 1050 })
          .add(marker, { opacity: [0, 1], scale: [0.75, 1], ...motionPath, duration: 620 }, 220)
          .add(proofTiles, { opacity: [0, 1], translateY: [10, 0], duration: 360, delay: stagger(55) }, 610)
        return () => {
          timeline.revert()
        }
      })
    })

    return () => {
      disposed = true
      scope?.revert()
    }
  }, [compactMotion, lcpReady])

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
          <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=85" alt="Students participating in a classroom lesson" fetchPriority="high" onLoad={() => setLcpReady(true)} />
        </div>
        <div className="hero-photo hero-photo-small" aria-hidden="true">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=700&q=80" alt="" />
        </div>
        <div className="hero-stamp" aria-label="Flamivor makes education accessible">
          <span>Made for</span><strong>every<br />learner</strong>
        </div>
        <div className="hero-route-mark" aria-hidden="true"><span /></div>
      </motion.div>

      <svg className={`hero-learning-path ${lcpReady ? 'is-ready' : ''}`} viewBox="0 0 900 280" aria-hidden="true" focusable="false">
        <path className="hero-learning-path__guide" d="M0 170 C170 34 288 248 444 132 S704 46 900 118" pathLength="1" />
        <path className="hero-learning-path__active" d="M0 170 C170 34 288 248 444 132 S704 46 900 118" pathLength="1" />
        <circle className="hero-learning-path__marker" cx="444" cy="132" r="8" />
      </svg>

      <div className="hero-proof" aria-label="Flamivor impact">
        {proof.map(([number, label]) => <div key={label}><strong>{number}</strong><span>{label}</span></div>)}
      </div>
    </section>
  )
}
