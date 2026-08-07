import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, BookMarked, FileText, Layers3, PackageOpen, Sparkles } from 'lucide-react'
import './ResourcesPage.css'

const resources = [
  { id: '01', type: 'Revision deck', icon: Layers3, image: 'https://static.wixstatic.com/media/01afaa_28f339f2acbb41eab59c985e82bc7ecd~mv2.png', title: 'Study Flashcards', desc: 'Original, visually engaging flashcards covering key concepts across multiple subjects.', accent: 'red' },
  { id: '02', type: 'Quick study', icon: Sparkles, image: 'https://static.wixstatic.com/media/01afaa_8ab67555fcaf48d0a665f929a0217876~mv2.png', title: 'Mini Lessons', desc: 'Concise, easy-to-understand lesson summaries designed for quick revision and self-study.', accent: 'moss' },
  { id: '03', type: 'Deep dive', icon: FileText, image: 'https://static.wixstatic.com/media/01afaa_018ede2ec32541e18cb927efe317c46c~mv2.png', title: 'Study Guides', desc: 'Comprehensive guides that break down complex topics into digestible, student-friendly content.', accent: 'coral' },
  { id: '04', type: 'Physical learning', icon: PackageOpen, image: 'https://static.wixstatic.com/media/01afaa_d806a3a38260410089a1177657cc3b74~mv2.png', title: 'Educational Kits', desc: 'Curated learning kits delivered to partner schools and communities in need.', accent: 'ink' },
]

export default function ResourcesPage() {
  const reducedMotion = useReducedMotion()
  const enter = (delay = 0) => ({ initial: reducedMotion ? false : { opacity: 0, y: 18 }, whileInView: reducedMotion ? {} : { opacity: 1, y: 0 }, viewport: { once: true, amount: .2 }, transition: { duration: .55, delay, ease: [0.16, 1, .3, 1] } })
  const featured = resources[0]
  const FeaturedIcon = featured.icon
  return (
    <main className="resources-page">
      <section className="resources-hero" aria-labelledby="resources-heading">
        <motion.div className="resources-hero-copy" initial={reducedMotion ? false : { opacity: 0, y: 20 }} animate={reducedMotion ? {} : { opacity: 1, y: 0 }} transition={{ duration: .65, ease: [0.16, 1, .3, 1] }}>
          <p className="resources-eyebrow"><BookMarked size={15} aria-hidden="true" /> The open shelf</p>
          <h1 id="resources-heading">Made to be<br /><em>passed around.</em></h1>
          <p>Free study tools made by students, for the moments when a clear explanation can change what feels possible.</p>
        </motion.div>
        <motion.div className="resources-hero-index" initial={reducedMotion ? false : { opacity: 0, x: 18 }} animate={reducedMotion ? {} : { opacity: 1, x: 0 }} transition={{ duration: .6, delay: .1, ease: [0.16, 1, .3, 1] }} aria-label="Resource library index"><span>Library index</span><strong>04</strong><p>formats<br />for learning</p></motion.div>
      </section>

      <section className="resources-feature" aria-labelledby="featured-heading">
        <motion.figure className="resources-feature-image" {...enter()}><img src={featured.image} alt="A preview of Flamivor study flashcards" loading="eager" /><figcaption>Featured format / {featured.id}</figcaption></motion.figure>
        <motion.div className="resources-feature-copy" {...enter(.1)}><p className="resources-eyebrow"><FeaturedIcon size={15} aria-hidden="true" /> Start here</p><h2 id="featured-heading">Study Flashcards</h2><p>Built for quick recall without losing the why. These visual prompts make key concepts easier to revisit, share, and remember.</p><div className="resource-availability"><span>Availability</span><strong>Links coming soon</strong></div></motion.div>
      </section>

      <section className="resources-index" aria-labelledby="resource-index-heading">
        <div className="resources-index-heading"><div><p className="resources-eyebrow">Browse the shelf</p><h2 id="resource-index-heading">Pick the format<br />that meets you there.</h2></div><p>Every resource is designed to be clear, shareable, and free. New links will appear here as each collection opens.</p></div>
        <div className="resource-records">{resources.slice(1).map((resource, index) => { const Icon = resource.icon; return <motion.article className={`resource-record resource-record-${resource.accent}`} key={resource.id} {...enter(index * .08)}><div className="resource-record-number">{resource.id}</div><div className="resource-record-image"><img src={resource.image} alt={`Preview of Flamivor ${resource.title}`} loading="lazy" /></div><div className="resource-record-copy"><p><Icon size={15} aria-hidden="true" /> {resource.type}</p><h3>{resource.title}</h3><span>{resource.desc}</span><div className="resource-record-status">Links coming soon <ArrowRight size={16} aria-hidden="true" /></div></div></motion.article> })}</div>
      </section>

      <section className="resources-request"><div><p className="resources-eyebrow">Need something specific?</p><h2>Tell us what would<br />make learning easier.</h2></div><a href="mailto:flamivor@gmail.com">Request a resource <ArrowRight size={18} aria-hidden="true" /></a></section>
    </main>
  )
}
