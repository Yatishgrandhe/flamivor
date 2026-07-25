import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './SplashScreen.css'

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState('enter') // enter → hold → exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 600)
    const t2 = setTimeout(() => setPhase('exit'), 1800)
    const t3 = setTimeout(() => onComplete(), 2600)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="splash-bg" />

          <motion.div
            className="splash-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={phase === 'hold' ? { scale: 1, opacity: 1 } : phase === 'exit' ? { scale: 1.05, opacity: 0 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src="/logo.jpg" alt="Flamivor" className="splash-logo" />
            <motion.div
              className="splash-line"
              initial={{ scaleX: 0 }}
              animate={phase === 'hold' ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.p
              className="splash-tagline"
              initial={{ opacity: 0, y: 10 }}
              animate={phase === 'hold' ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Research & Resource Initiative
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
