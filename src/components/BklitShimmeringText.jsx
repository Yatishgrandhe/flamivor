// Adapted from Bklit UI's MIT-licensed Shimmering Text registry component.
// https://ui.bklit.com/r/shimmering-text.json
import { motion } from 'motion/react'
import useCompactMotion from '../hooks/useCompactMotion'

export default function BklitShimmeringText({ text, active = true, duration = 0.8, className = '' }) {
  const compactMotion = useCompactMotion()
  const running = active && !compactMotion

  return (
    <span className={`bklit-shimmering-text ${className}`} aria-label={text}>
      {text.split('').map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          aria-hidden="true"
          initial={{ color: 'var(--bklit-text)' }}
          animate={running ? { color: ['var(--bklit-text)', 'var(--bklit-highlight)', 'var(--bklit-text)'] } : { color: 'var(--bklit-text)' }}
          transition={running ? {
            duration,
            repeat: Infinity,
            repeatType: 'loop',
            repeatDelay: text.length * 0.05,
            delay: (index * duration) / text.length,
            ease: 'easeInOut',
          } : { duration: duration * 0.5, ease: 'easeOut' }}
        >{char === ' ' ? '\u00a0' : char}</motion.span>
      ))}
    </span>
  )
}
