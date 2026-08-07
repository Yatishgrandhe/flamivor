import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Compass, Flag, HandHeart, MessageCircle, Route } from 'lucide-react'
import { Link } from 'react-router-dom'
import './ResourcesPage.css'

const pathways = [
  {
    number: '01',
    icon: Compass,
    eyebrow: 'For curious students',
    title: 'Find your next opportunity.',
    copy: 'Explore extracurricular paths that turn a question, an interest, or a new skill into a meaningful next move.',
    link: '/extracurriculars',
    label: 'Explore opportunities',
    tone: 'moss',
  },
  {
    number: '02',
    icon: Flag,
    eyebrow: 'For emerging leaders',
    title: 'Bring Flamivor to your school.',
    copy: 'Start a chapter and create a local space where students can build, share, and lead together.',
    link: '/join',
    label: 'Start a chapter',
    tone: 'red',
  },
  {
    number: '03',
    icon: HandHeart,
    eyebrow: 'For people ready to help',
    title: 'Put your strengths to work.',
    copy: 'Contribute your time, creativity, or perspective to help widen access to hands-on learning.',
    link: '/join',
    label: 'See ways to contribute',
    tone: 'coral',
  },
  {
    number: '04',
    icon: MessageCircle,
    eyebrow: 'For a new idea',
    title: 'Start a conversation.',
    copy: 'Have a partnership idea, a question, or a need we should know about? We would genuinely like to hear it.',
    link: '/contact',
    label: 'Contact Flamivor',
    tone: 'ink',
  },
]

function PathwayCover({ pathway, featured = false }) {
  const Icon = pathway.icon
  return (
    <div className={`pathway-cover pathway-cover-${pathway.tone} ${featured ? 'pathway-cover-featured' : ''}`} aria-hidden="true">
      <span>Flamivor</span>
      <Icon size={featured ? 54 : 31} strokeWidth={1.6} />
      <strong>{pathway.number}</strong>
      <i>{pathway.eyebrow}</i>
    </div>
  )
}

export default function ResourcesPage() {
  const reducedMotion = useReducedMotion()
  const reveal = (delay = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 16 },
    whileInView: reducedMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <main className="resources-page">
      <section className="resources-hero" aria-labelledby="resources-heading">
        <div className="resources-hero-orbit" aria-hidden="true"><span /><span /><span /></div>
        <motion.div className="resources-hero-copy" initial={reducedMotion ? false : { opacity: 0, y: 20 }} animate={reducedMotion ? {} : { opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}>
          <p className="resources-eyebrow"><Route size={15} aria-hidden="true" /> The student directory</p>
          <h1 id="resources-heading">Your next step<br />starts <em>here.</em></h1>
          <p>Flamivor is more than a collection of things to read. It is a place to find an opening, lead with others, and help make learning more reachable.</p>
        </motion.div>
        <motion.figure className="resources-hero-photo" initial={reducedMotion ? false : { opacity: 0, y: 24, rotate: 2 }} animate={reducedMotion ? {} : { opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}>
          <img src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1100&q=84" alt="Students sharing a conversation outdoors" width="1100" height="825" fetchPriority="high" />
          <figcaption>One small opening can travel farther.</figcaption>
        </motion.figure>
      </section>

      <section className="resources-feature" aria-labelledby="featured-heading">
        <motion.div className="resources-feature-visual" {...reveal()}><PathwayCover pathway={pathways[0]} featured /></motion.div>
        <motion.div className="resources-feature-copy" {...reveal(0.08)}>
          <p className="resources-eyebrow"><Compass size={15} aria-hidden="true" /> {pathways[0].eyebrow}</p>
          <h2 id="featured-heading">{pathways[0].title}</h2>
          <p>{pathways[0].copy}</p>
          <Link className="resources-action" to={pathways[0].link}>{pathways[0].label} <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </motion.div>
      </section>

      <section className="resources-index" aria-labelledby="pathways-heading">
        <motion.div className="resources-index-heading" {...reveal()}>
          <div>
            <p className="resources-eyebrow">Choose a direction</p>
            <h2 id="pathways-heading">More ways to<br />move forward.</h2>
          </div>
          <p>Each route leads somewhere real. Choose the one that feels closest to where you are right now.</p>
        </motion.div>
        <div className="resource-records">
          {pathways.slice(1).map((pathway, index) => (
            <motion.article className={`resource-record resource-record-${pathway.tone}`} key={pathway.number} {...reveal(index * 0.06)}>
              <div className="resource-record-number">{pathway.number}</div>
              <PathwayCover pathway={pathway} />
              <div className="resource-record-copy">
                <p>{pathway.eyebrow}</p>
                <h3>{pathway.title}</h3>
                <span>{pathway.copy}</span>
                <Link to={pathway.link}>{pathway.label} <ArrowUpRight size={16} aria-hidden="true" /></Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="resources-note" aria-labelledby="resources-note-heading">
        <motion.div {...reveal()}>
          <p className="resources-eyebrow">Keep the door open</p>
          <h2 id="resources-note-heading">The best next step<br />is the one you take.</h2>
        </motion.div>
        <motion.div className="resources-note-copy" {...reveal(0.08)}>
          <p>There is no perfect starting point. Find an opportunity, bring an idea, or build something alongside people who care.</p>
          <Link to="/contact">Send us a note <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </motion.div>
      </section>
    </main>
  )
}
