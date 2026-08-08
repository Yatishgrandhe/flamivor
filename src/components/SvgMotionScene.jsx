import { useEffect, useRef, useState } from 'react'
import './SvgMotionScene.css'

const artwork = {
  home: <><path className="scene-draw" d="M18 151V55h58v58h50c27 0 37 12 58 29 35 29 67 3 94-21 30-27 72-19 101 10 22 22 47 31 79 24l54-12" /><path className="scene-draw scene-detail" d="M33 151h70M47 70h1" /><circle className="scene-spark" cx="18" cy="151" r="4" /></>,
  about: <><path className="scene-draw scene-morph-source" d="M90 180V83C90 37 116 16 150 16s60 21 60 67v97Z" /><path className="scene-draw scene-detail" d="M69 180h162M130 180v-50h40v50" /><path className="scene-morph-target" d="M47 180V83C47 37 92 16 150 16s103 21 103 67v97Z" /></>,
  impact: <><path className="scene-draw" d="M145 143a37 37 0 1 1-26 11" /><path className="scene-draw" d="M171 190a73 73 0 1 1 48-78" /><path className="scene-draw scene-outer" d="M190 211a108 108 0 1 1 70-126" /><circle className="scene-spark" cx="190" cy="211" r="4" /></>,
  team: <><path className="scene-draw" d="M15 160c44-50 62-82 96-61 27 17 21 65 59 58 27-5 28-62 66-68 30-5 40 36 72 47 31 11 56-14 77-43" /><circle className="scene-node scene-node-1" cx="111" cy="99" r="5" /><circle className="scene-node scene-node-2" cx="170" cy="157" r="5" /><circle className="scene-node scene-node-3" cx="308" cy="136" r="5" /></>,
  resources: <><path className="scene-draw" d="M55 35h105v132H55zM78 69h58M78 92h44" /><path className="scene-draw" d="M77 23h105v132H77" /><path className="scene-draw" d="M147 23v58l-16-12-16 12V23" /></>,
  extracurriculars: <><path className="scene-draw" d="M28 174V80h55v94M116 174V49h62v125M212 174V93h55v81M55 142c34-28 49-17 92-37 40-18 58-21 92 14" /><path className="scene-detail" d="M42 174h42M131 174h49M226 174h42" /></>,
  gallery: <><path className="scene-draw scene-morph-source" d="M42 58h93v67H42z" /><path className="scene-draw" d="M110 33h106v72H110zM74 121h109v76H74z" /><path className="scene-morph-target" d="M20 24h260v160H20z" /></>,
  contact: <><path className="scene-draw scene-morph-source" d="M32 55h216v134H32zM34 58l106 77L246 58M32 188l72-67m144 67-72-67" /><path className="scene-morph-target" d="M34 126l61 52 137-139M32 40h216v150H32z" /></>,
  join: <><path className="scene-draw scene-route-one" d="M21 51c54 0 72 50 132 81" /><path className="scene-draw scene-route-two" d="M21 131h132" /><path className="scene-draw scene-route-three" d="M21 211c54 0 72-50 132-81" /><circle className="scene-final" cx="174" cy="131" r="27" /><circle className="scene-spark scene-spark-one" cx="21" cy="51" r="4" /><circle className="scene-spark scene-spark-two" cx="21" cy="131" r="4" /><circle className="scene-spark scene-spark-three" cx="21" cy="211" r="4" /></>,
}

const pathsFor = (root, selector = '.scene-draw') => Array.from(root.querySelectorAll(selector))

export default function SvgMotionScene({ scene, className = '', ready = true, state = 'idle' }) {
  const rootRef = useRef(null)
  const hasPlayed = useRef(false)
  const hasMorphed = useRef(false)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root || !ready) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.disconnect()
      }
    }, { rootMargin: '0px 0px 120px' })
    observer.observe(root)
    return () => observer.disconnect()
  }, [ready])

  useEffect(() => {
    const root = rootRef.current
    if (!root || !inView || hasPlayed.current) return undefined
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isStatic = window.matchMedia('(max-width: 480px)').matches
    const isCompact = window.matchMedia('(max-width: 767px)').matches
    if (isReduced || isStatic) return undefined

    let cancelled = false
    let scope
    void Promise.all([import('animejs'), import('animejs/svg')]).then(([anime, svg]) => {
      if (cancelled || !root) return
      const { animate, createScope } = anime
      const { createDrawable, createMotionPath, morphTo } = svg
      scope = createScope({ root }).add(() => {
        const drawings = pathsFor(root)
        const drawables = drawings.flatMap((path) => createDrawable(path))
        const animations = drawables.map((drawable, index) => animate(drawable, {
          draw: ['0 0', '0 1'], duration: 760, delay: index * 145, ease: 'out(4)',
        }))
        if (!isCompact) {
          if (scene === 'home' || scene === 'impact') {
            const path = root.querySelector(scene === 'impact' ? '.scene-outer' : '.scene-draw')
            const spark = root.querySelector('.scene-spark')
            if (path && spark) animations.push(animate(spark, { opacity: [0, 1], ...createMotionPath(path), duration: 640, delay: 760, ease: 'inOut(2)' }))
          }
          if (scene === 'join') {
            ;['one', 'two', 'three'].forEach((name, index) => {
              const path = root.querySelector(`.scene-route-${name}`)
              const spark = root.querySelector(`.scene-spark-${name}`)
              if (path && spark) animations.push(animate(spark, { opacity: [0, 1], ...createMotionPath(path), duration: 510, delay: 760 + index * 300, ease: 'inOut(2)' }))
            })
          }
          if (scene === 'about') {
            const source = root.querySelector('.scene-morph-source')
            const target = root.querySelector('.scene-morph-target')
            if (source && target) animations.push(animate(source, { d: morphTo(target), duration: 560, delay: 860, ease: 'out(3)' }))
          }
        }
        if (scene === 'team') root.querySelectorAll('.scene-node').forEach((node, index) => animations.push(animate(node, { opacity: [0, 1], scale: [0, 1], duration: 220, delay: 510 + index * 180, ease: 'out(3)' })))
        return () => animations.forEach((animation) => animation.revert())
      })
      hasPlayed.current = true
    })
    return () => {
      cancelled = true
      scope?.revert()
    }
  }, [inView, scene])

  useEffect(() => {
    const root = rootRef.current
    if (!root || state !== 'sent' && state !== 'expanded' || hasMorphed.current) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 767px)').matches) return undefined
    let cancelled = false
    let scope
    void Promise.all([import('animejs'), import('animejs/svg')]).then(([anime, svg]) => {
      if (cancelled || !root) return
      scope = anime.createScope({ root }).add(() => {
        const source = root.querySelector('.scene-morph-source')
        const target = root.querySelector('.scene-morph-target')
        if (!source || !target) return undefined
        const animation = anime.animate(source, { d: svg.morphTo(target), duration: 560, ease: 'out(3)' })
        return () => animation.revert()
      })
      hasMorphed.current = true
    })
    return () => { cancelled = true; scope?.revert() }
  }, [state])

  return <div ref={rootRef} className={`svg-motion-scene svg-motion-scene--${scene} ${className}`} aria-hidden="true">
    <svg viewBox="0 0 300 240" preserveAspectRatio="xMidYMid meet" focusable="false" role="presentation">{artwork[scene]}</svg>
  </div>
}
