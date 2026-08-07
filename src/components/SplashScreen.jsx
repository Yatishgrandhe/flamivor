import { useState, useEffect } from 'react'
import './SplashScreen.css'

export default function SplashScreen({ onComplete }) {
  const [hidden, setHidden] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setExiting(true), 900)
    const t2 = setTimeout(() => { setHidden(true); onComplete() }, 1250)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onComplete])

  if (hidden) return null

  return (
    <div className={`splash ${exiting ? 'splash-exit' : ''}`} role="status" aria-label="Loading Flamivor">
      <div className="splash-bg" />
      <div className="splash-content">
        <div className="splash-logo-wrap">
          <img src="/flamivor-logo.png" alt="Flamivor" className="splash-logo" />
        </div>
        <div className="splash-line" />
        <p className="splash-tagline">Research &amp; Resource Initiative</p>
      </div>
    </div>
  )
}
