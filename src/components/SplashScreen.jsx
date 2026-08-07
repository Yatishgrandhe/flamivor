import { animate } from 'animejs'
import { useEffect, useRef, useState } from 'react'
import './SplashScreen.css'

export default function SplashScreen({ onComplete }) {
  const [hidden, setHidden] = useState(false)
  const overlayRef = useRef(null)
  const logoRef = useRef(null)
  const lineRef = useRef(null)
  const taglineRef = useRef(null)

  useEffect(() => {
    const animations = [
      animate(logoRef.current, { opacity: [0, 1], scale: [0.82, 1], duration: 520, ease: 'out(4)' }),
      animate(lineRef.current, { scaleX: [0, 1], duration: 440, delay: 140, ease: 'out(4)' }),
      animate(taglineRef.current, { opacity: [0, 1], y: [8, 0], duration: 390, delay: 250, ease: 'out(3)' }),
    ]
    const exitTimer = setTimeout(() => {
      animations.push(animate(overlayRef.current, { opacity: [1, 0], duration: 340, ease: 'in(3)' }))
    }, 900)
    const completeTimer = setTimeout(() => { setHidden(true); onComplete() }, 1260)
    return () => { clearTimeout(exitTimer); clearTimeout(completeTimer); animations.forEach(animation => animation.cancel()) }
  }, [onComplete])

  if (hidden) return null

  return (
    <div className="splash" ref={overlayRef} role="status" aria-label="Loading Flamivor">
      <div className="splash-bg" />
      <div className="splash-content">
        <div className="splash-logo-wrap" ref={logoRef}>
          <img src="/flamivor-logo.png" alt="Flamivor" className="splash-logo" />
        </div>
        <div className="splash-line" ref={lineRef} />
        <p className="splash-tagline" ref={taglineRef}>Research &amp; Resource Initiative</p>
      </div>
    </div>
  )
}
