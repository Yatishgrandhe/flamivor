import { motion } from 'motion/react'
import { ArrowUpRight, Route } from 'lucide-react'
import useCompactMotion from '../hooks/useCompactMotion'
import './ResourcesPage.css'

const resources = [
  {
    number: '01',
    eyebrow: 'Chemistry focus',
    title: 'Study Flashcards',
    copy: 'Built for quick recall without losing the why. These visual prompts make key chemistry concepts easier to revisit, share, and remember.',
    image: 'https://static.wixstatic.com/media/01afaa_28f339f2acbb41eab59c985e82bc7ecd~mv2.png',
    alt: 'Flamivor Chemistry Resources study flashcards cover',
  },
  {
    number: '02',
    eyebrow: 'Biology quick study',
    title: 'Mini Lessons',
    copy: 'Concise, easy-to-understand lesson summaries designed for quick revision and self-study.',
    image: 'https://static.wixstatic.com/media/01afaa_8ab67555fcaf48d0a665f929a0217876~mv2.png',
    alt: 'Flamivor Biology Resources mini lessons cover',
  },
  {
    number: '03',
    eyebrow: 'Physics deep dive',
    title: 'Study Guides',
    copy: 'Comprehensive guides that break down complex topics into digestible, student-friendly content.',
    image: 'https://static.wixstatic.com/media/01afaa_018ede2ec32541e18cb927efe317c46c~mv2.png',
    alt: 'Flamivor Physics Resources study guides cover',
  },
  {
    number: '04',
    eyebrow: 'Math practice kit',
    title: 'Educational Kits',
    copy: 'Curated learning kits delivered to partner schools and communities in need.',
    image: 'https://static.wixstatic.com/media/01afaa_d806a3a38260410089a1177657cc3b74~mv2.png',
    alt: 'Flamivor Math Resources educational kits cover',
  },
]

function ResourceCover({ resource, featured = false }) {
  return (
    <figure className={`resource-cover ${featured ? 'resource-cover-featured' : ''}`}>
      <img src={resource.image} alt={resource.alt} width="1080" height="1080" loading={featured ? 'eager' : 'lazy'} />
    </figure>
  )
}

export default function ResourcesPage() {
  const compactMotion = useCompactMotion()
  const reveal = (delay = 0) => ({
    initial: compactMotion ? false : { opacity: 0, y: 16 },
    whileInView: compactMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <main className="resources-page">
      <section className="resources-hero" aria-labelledby="resources-heading">
        <div className="resources-hero-orbit" aria-hidden="true"><span /><span /><span /></div>
        <motion.div className="resources-hero-copy" initial={compactMotion ? false : { opacity: 0, y: 20 }} animate={compactMotion ? {} : { opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}>
          <p className="resources-eyebrow"><Route size={15} aria-hidden="true" /> The study shelf</p>
          <h1 id="resources-heading">Free study tools<br />made to <em>share.</em></h1>
          <p>Clear, student-made learning materials for the moments when a lesson needs another way in.</p>
        </motion.div>
        <motion.figure className="resources-hero-photo" initial={compactMotion ? false : { opacity: 0, y: 24, rotate: 2 }} animate={compactMotion ? {} : { opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}>
          <img src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1100&q=84" alt="Students sharing a conversation outdoors" width="1100" height="825" fetchPriority="high" />
          <figcaption>Tools for the next question you bring.</figcaption>
        </motion.figure>
      </section>

      <section className="resources-feature" aria-labelledby="featured-heading">
        <motion.div className="resources-feature-visual" {...reveal()}><ResourceCover resource={resources[0]} featured /></motion.div>
        <motion.div className="resources-feature-copy" {...reveal(0.08)}>
          <p className="resources-eyebrow">{resources[0].eyebrow}</p>
          <h2 id="featured-heading">{resources[0].title}</h2>
          <p>{resources[0].copy}</p>
          <p className="resource-availability">Availability for this chemistry set <strong>Links coming soon</strong></p>
        </motion.div>
      </section>

      <section className="resources-index" aria-labelledby="pathways-heading">
        <motion.div className="resources-index-heading" {...reveal()}>
          <div>
            <p className="resources-eyebrow">Browse the shelf</p>
            <h2 id="pathways-heading">Pick the format that<br />meets you there.</h2>
          </div>
          <p>Every resource is designed to be clear, shareable, and free. New links will appear here as each collection opens.</p>
        </motion.div>
        <div className="resource-records">
          {resources.slice(1).map((resource, index) => (
            <motion.article className="resource-record" key={resource.number} {...reveal(index * 0.06)}>
              <div className="resource-record-number">{resource.number}</div>
              <ResourceCover resource={resource} />
              <div className="resource-record-copy">
                <p>{resource.eyebrow}</p>
                <h3>{resource.title}</h3>
                <span>{resource.copy}</span>
                <small>Links coming soon <ArrowUpRight size={14} aria-hidden="true" /></small>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="resources-note" aria-labelledby="resources-note-heading">
        <motion.div {...reveal()}>
          <p className="resources-eyebrow">Keep learning open</p>
          <h2 id="resources-note-heading">A study tool should<br />never be out of reach.</h2>
        </motion.div>
        <motion.div className="resources-note-copy" {...reveal(0.08)}>
          <p>We are building this shelf with students, one useful resource at a time. Need something specific for your studies?</p>
          <a href="mailto:flamivor@gmail.com">Tell us what would help <ArrowUpRight size={18} aria-hidden="true" /></a>
        </motion.div>
      </section>
    </main>
  )
}
