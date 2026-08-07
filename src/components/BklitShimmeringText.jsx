// Adapted from Bklit UI's MIT-licensed Shimmering Text registry component.
// https://ui.bklit.com/r/shimmering-text.json
import { motion } from 'motion/react'
import useCompactMotion from '../hooks/useCompactMotion'

export default function BklitShimmeringText({ text, active = true, className = '' }) {
  const compactMotion = useCompactMotion()
  const running = active && !compactMotion

  return (
    <span className={`bklit-shimmering-text ${className}`} aria-label={text}>
      {text.split('').map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          aria-hidden="true"
          animate={running ? { color: ['var(--bklit-text)', 'var(--bklit-highlight)', 'var(--bklit-text)'] } : { color: 'var(--bklit-text)' }}
          transition={{ duration: 0.72, delay: index * 0.028, ease: 'easeInOut' }}
        >{char === ' ' ? '\u00a0' : char}</motion.span>
      ))}
    </span>
  )
}
