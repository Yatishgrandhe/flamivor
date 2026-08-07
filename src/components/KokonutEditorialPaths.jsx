// Adapted from Kokonut UI's MIT-licensed Background Paths component.
// https://github.com/kokonut-labs/kokonutui
import { motion } from 'motion/react'
import useCompactMotion from '../hooks/useCompactMotion'

const paths = [
  'M 1200 350 C 820 180, 560 560, 180 340 S -300 220, -720 420',
  'M 1280 470 C 900 260, 620 690, 220 490 S -270 340, -760 520',
  'M 1180 260 C 840 90, 520 440, 130 250 S -320 150, -760 300',
  'M 1250 590 C 900 400, 580 760, 170 600 S -300 470, -720 650',
  'M 1160 140 C 790 20, 520 300, 110 160 S -310 80, -720 210',
]

export default function KokonutEditorialPaths() {
  const compactMotion = useCompactMotion()

  return (
    <div className="kokonut-editorial-paths" aria-hidden="true">
      <svg viewBox="-760 0 2040 760" fill="none" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="flamivor-path-gradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="var(--coral)" stopOpacity="0" />
            <stop offset=".48" stopColor="var(--red)" stopOpacity=".42" />
            <stop offset="1" stopColor="var(--coral)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {paths.map((path, index) => (
          <motion.path
            key={path}
            d={path}
            stroke="url(#flamivor-path-gradient)"
            strokeLinecap="round"
            strokeWidth={index === 1 ? 2 : 1.2}
            initial={compactMotion ? false : { opacity: 0, y: 16 }}
            animate={compactMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </svg>
    </div>
  )
}
