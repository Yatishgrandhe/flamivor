import { forwardRef } from 'react'

const desktopPath = 'M60 0 C18 120 102 190 60 332 S18 540 60 664 S103 856 60 1000'
const tabletPath = 'M44 0 C22 168 67 245 44 332 S22 540 44 664 S67 856 44 1000'
const mobilePath = 'M54.545 0 L54.545 1000'

const RoutePair = forwardRef(function RoutePair({ className, path }, ref) {
  return (
    <>
      <path className={`${className} journey-route__guide`} d={path} pathLength="100" />
      <path ref={ref} className={`${className} journey-route__active`} d={path} pathLength="100" strokeDasharray="100" strokeDashoffset="100" />
    </>
  )
})

export default function JourneyRoute({ desktopRef, tabletRef, mobileRef }) {
  return (
    <div className="journey-route" aria-hidden="true">
      <svg viewBox="0 0 120 1000" preserveAspectRatio="none" focusable="false">
        <RoutePair className="journey-route__desktop" path={desktopPath} ref={desktopRef} />
        <RoutePair className="journey-route__tablet" path={tabletPath} ref={tabletRef} />
        <RoutePair className="journey-route__mobile" path={mobilePath} ref={mobileRef} />
      </svg>
    </div>
  )
}
