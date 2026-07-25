import { useState, useEffect } from 'react'
import './SplashScreen.css'

export default function SplashScreen({ onComplete }) {
  const [hidden, setHidden] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setExiting(true), 2000)
    const t2 = setTimeout(() => { setHidden(true); onComplete() }, 2600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onComplete])

  if (hidden) return null

  return (
    <div className={`splash ${exiting ? 'splash-exit' : ''}`}>
      <div className="splash-bg" />
      <div className="splash-content">
        <div className="splash-logo-wrap">
          <img src="/logo.jpg" alt="Flamivor" className="splash-logo" />
        </div>
        <div className="splash-line" />
        <p className="splash-tagline">Research &amp; Resource Initiative</p>
      </div>
    </div>
  )
}
