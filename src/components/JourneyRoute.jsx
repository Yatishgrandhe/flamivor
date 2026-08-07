// The desktop and tablet route share the reserved node column, so the thread
// crosses every node's exact centre even when cards reflow or image heights vary.
const desktopPath = 'M60 0 L60 1000'
const tabletPath = 'M60 0 L60 1000'
const mobilePath = 'M54.545 0 L54.545 1000'

function RoutePair({ className, path }) {
  return (
    <>
      <path className={`${className} journey-route__guide`} d={path} pathLength="100" />
      <path className={`${className} journey-route__active`} d={path} pathLength="100" strokeDasharray="100" strokeDashoffset="0" />
    </>
  )
}

export default function JourneyRoute() {
  return (
    <div className="journey-route" aria-hidden="true">
      <svg viewBox="0 0 120 1000" preserveAspectRatio="none" focusable="false">
        <RoutePair className="journey-route__desktop" path={desktopPath} />
        <RoutePair className="journey-route__tablet" path={tabletPath} />
        <RoutePair className="journey-route__mobile" path={mobilePath} />
      </svg>
    </div>
  )
}
