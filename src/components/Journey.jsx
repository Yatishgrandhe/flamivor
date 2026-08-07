import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import JourneyRoute from './JourneyRoute'
import './Journey.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const steps = [
  { number: '01', kicker: 'Make learning reachable', title: 'Free resources that meet students where they are.', text: 'Flashcards, study guides, mini-lessons, and learning kits are made to turn a difficult subject into a possible next step.', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1100&q=85', alt: 'Student writing notes at a desk', link: '/resources', label: 'Explore the library' },
  { number: '02', kicker: 'Build a circle of support', title: 'Peers helping peers become more confident learners.', text: 'Students connect across schools, cities, and countries to share what they know, offer perspective, and keep momentum going.', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1100&q=85', alt: 'Friends sharing a conversation outdoors', link: '/team', label: 'Meet the community' },
  { number: '03', kicker: 'Turn care into action', title: 'Local chapters that create a global ripple.', text: 'Every chapter gives young people a practical way to lead: organize resources, reach their communities, and make education feel less out of reach.', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1100&q=85', alt: 'Students collaborating in a university classroom', link: '/join', label: 'Start your chapter' },
]

export default function Journey() {
  const sectionRef = useRef(null)
  const desktopPathRef = useRef(null)
  const tabletPathRef = useRef(null)
  const mobilePathRef = useRef(null)

  useGSAP(() => {
    const section = sectionRef.current
    const cards = gsap.utils.toArray('.journey-step')
    const nodes = gsap.utils.toArray('.journey-node')
    const paths = [desktopPathRef.current, tabletPathRef.current, mobilePathRef.current]
    const media = gsap.matchMedia()

    const refresh = () => ScrollTrigger.refresh()
    const images = section.querySelectorAll('img')
    images.forEach((image) => image.addEventListener('load', refresh, { once: true }))
    document.fonts?.ready.then(refresh)

    const revealCards = () => {
      cards.forEach((card, index) => {
        gsap.from(card, {
          autoAlpha: 0,
          y: 16,
          duration: .54,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 82%', once: true, fastScrollEnd: true },
        })
        gsap.from(nodes[index], {
          opacity: .45,
          scale: .82,
          duration: .46,
          ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 76%', once: true, fastScrollEnd: true },
        })
      })
    }

    const setupRoute = (path) => {
      gsap.set(path, { strokeDasharray: 100, strokeDashoffset: 100 })
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 68%',
          end: 'bottom 62%',
          scrub: .7,
          invalidateOnRefresh: true,
        },
      })
      revealCards()
    }

    media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => setupRoute(desktopPathRef.current))
    media.add('(min-width: 768px) and (max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => setupRoute(tabletPathRef.current))
    media.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => setupRoute(mobilePathRef.current))
    media.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(paths, { strokeDashoffset: 0 })
      gsap.set([...cards, ...nodes], { clearProps: 'all' })
    })

    return () => {
      images.forEach((image) => image.removeEventListener('load', refresh))
      media.revert()
    }
  }, { scope: sectionRef })

  return (
    <section className="journey-section" id="journey" ref={sectionRef}>
      <div className="journey-intro">
        <p className="journey-label">The path of access</p>
        <h2>Big change starts<br />with one open door.</h2>
        <p>We work across the moments that can change a student’s relationship with learning: access, encouragement, and agency.</p>
      </div>
      <div className="journey-layout">
        <JourneyRoute desktopRef={desktopPathRef} tabletRef={tabletPathRef} mobileRef={mobilePathRef} />
        <div className="journey-steps">
          {steps.map((step, index) => (
            <article className={`journey-step journey-step-${index + 1}`} key={step.number}>
              <div className="journey-node" aria-hidden="true"><span>{step.number}</span></div>
              <div className="journey-image"><img src={step.image} alt={step.alt} width="1100" height="800" loading="lazy" /></div>
              <div className="journey-copy">
                <p>{step.kicker}</p><h3>{step.title}</h3><span>{step.text}</span>
                <Link to={step.link}>{step.label} <ArrowUpRight size={17} aria-hidden="true" /></Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
