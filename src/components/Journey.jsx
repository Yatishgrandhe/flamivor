import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import JourneyRoute from './JourneyRoute'
import useCompactMotion from '../hooks/useCompactMotion'
import './Journey.css'

const steps = [
  { number: '01', kicker: 'Make learning reachable', title: 'Free resources that meet students where they are.', text: 'Flashcards, study guides, mini-lessons, and learning kits are made to turn a difficult subject into a possible next step.', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1100&q=85', alt: 'Student writing notes at a desk', link: '/resources', label: 'Explore the library' },
  { number: '02', kicker: 'Build a circle of support', title: 'Peers helping peers become more confident learners.', text: 'Students connect across schools, cities, and countries to share what they know, offer perspective, and keep momentum going.', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1100&q=85', alt: 'Friends sharing a conversation outdoors', link: '/team', label: 'Meet the community' },
  { number: '03', kicker: 'Turn care into action', title: 'Local chapters that create a global ripple.', text: 'Every chapter gives young people a practical way to lead: organize resources, reach their communities, and make education feel less out of reach.', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1100&q=85', alt: 'Students collaborating in a university classroom', link: '/join', label: 'Start your chapter' },
]

export default function Journey() {
  const compactMotion = useCompactMotion()
  const reveal = (index) => ({
    initial: compactMotion ? false : { opacity: 0, y: 16 },
    whileInView: compactMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: .54, delay: index * .06, ease: [0.16, 1, .3, 1] },
  })

  return (
    <section className="journey-section" id="journey">
      <div className="journey-intro">
        <p className="journey-label">The path of access</p>
        <h2>Big change starts<br />with one open door.</h2>
        <p>We work across the moments that can change a student’s relationship with learning: access, encouragement, and agency.</p>
      </div>
      <div className="journey-layout">
        <JourneyRoute />
        <div className="journey-steps">
          {steps.map((step, index) => (
            <motion.article className={`journey-step journey-step-${index + 1}`} key={step.number} {...reveal(index)}>
              <div className="journey-node" aria-hidden="true"><span>{step.number}</span></div>
              <div className="journey-image"><img src={step.image} alt={step.alt} width="1100" height="800" loading="lazy" /></div>
              <div className="journey-copy">
                <p>{step.kicker}</p><h3>{step.title}</h3><span>{step.text}</span>
                <Link to={step.link}>{step.label} <ArrowUpRight size={17} aria-hidden="true" /></Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
