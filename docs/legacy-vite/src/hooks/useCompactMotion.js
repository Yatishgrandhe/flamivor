import { useEffect, useState } from 'react'

const compactQuery = '(max-width: 760px)'
const reducedQuery = '(prefers-reduced-motion: reduce)'

function getMotionPreference() {
  if (typeof window === 'undefined') return false
  return window.matchMedia(compactQuery).matches || window.matchMedia(reducedQuery).matches
}

// Mobile keeps the visual hierarchy but avoids transform-heavy entrances. This
// explicit hook complements MotionConfig, whose useReducedMotion hook only
// reflects the operating-system preference rather than an app width policy.
export default function useCompactMotion() {
  const [compactMotion, setCompactMotion] = useState(getMotionPreference)

  useEffect(() => {
    const compact = window.matchMedia(compactQuery)
    const reduced = window.matchMedia(reducedQuery)
    const sync = () => setCompactMotion(compact.matches || reduced.matches)
    sync()
    compact.addEventListener('change', sync)
    reduced.addEventListener('change', sync)
    return () => {
      compact.removeEventListener('change', sync)
      reduced.removeEventListener('change', sync)
    }
  }, [])

  return compactMotion
}
