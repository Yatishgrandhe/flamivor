import { useEffect } from 'react'
import './SplashScreen.css'

export default function SplashScreen({ onComplete }) {
  useEffect(() => {
    const completeTimer = window.setTimeout(onComplete, 1260)
    return () => window.clearTimeout(completeTimer)
  }, [onComplete])

  return (
    <div className="splash" role="status" aria-label="Loading Flamivor">
      <div className="splash-bg" />
      <div className="splash-content">
        <div className="splash-logo-wrap">
          <img src="/flamivor-logo.png" alt="Flamivor logo" className="splash-logo" />
        </div>
        <div className="splash-line" />
        <p className="splash-tagline">Research &amp; Resource Initiative</p>
      </div>
    </div>
  )
}
