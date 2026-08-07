// Adapted from Kokonut UI's free Shape Hero composition.
// https://kokonutui.com/
import { motion } from 'motion/react'
import useCompactMotion from '../hooks/useCompactMotion'

export default function KokonutShapeHero() {
  const compactMotion = useCompactMotion()

  return (
    <div className="kokonut-shape-hero" aria-hidden="true">
      <motion.span className="kokonut-shape-ring ring-one" initial={compactMotion ? false : { opacity: 0, scale: .92 }} animate={compactMotion ? {} : { opacity: 1, scale: 1 }} transition={{ duration: .7, ease: [0.16, 1, .3, 1] }} />
      <motion.span className="kokonut-shape-ring ring-two" initial={compactMotion ? false : { opacity: 0, scale: 1.06 }} animate={compactMotion ? {} : { opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .08, ease: [0.16, 1, .3, 1] }} />
      <motion.span className="kokonut-shape-dot" initial={compactMotion ? false : { opacity: 0, y: 10 }} animate={compactMotion ? {} : { opacity: 1, y: 0 }} transition={{ duration: .45, delay: .35, ease: [0.16, 1, .3, 1] }} />
    </div>
  )
}
