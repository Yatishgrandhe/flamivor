import { useEffect } from 'react'
import { motion } from 'motion/react'
import './SplashScreen.css'

export default function SplashScreen({ onComplete }) {
  useEffect(() => {
    const completeTimer = window.setTimeout(onComplete, 1260)
    return () => window.clearTimeout(completeTimer)
  }, [onComplete])

  return (
    <motion.div className="splash" role="status" aria-label="Loading Flamivor" initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: .34, delay: .9, ease: [0.7, 0, .84, 0] }}>
      <div className="splash-bg" />
      <div className="splash-content">
        <motion.div className="splash-logo-wrap" initial={{ opacity: 0, scale: .82 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .52, ease: [0.16, 1, .3, 1] }}>
          <img src="/flamivor-logo.png" alt="Flamivor logo" className="splash-logo" />
        </motion.div>
        <motion.div className="splash-line" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: .44, delay: .14, ease: [0.16, 1, .3, 1] }} />
        <motion.p className="splash-tagline" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .39, delay: .25, ease: [0.16, 1, .3, 1] }}>Research &amp; Resource Initiative</motion.p>
      </div>
    </motion.div>
  )
}
