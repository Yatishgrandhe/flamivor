import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, Globe2, HeartHandshake, PackageCheck, School, UsersRound } from 'lucide-react'
import './ImpactPage.css'

const chapters = [
  ['10+', 'student-led chapters'],
  ['14+', 'countries reached'],
  ['200+', 'volunteers & interns'],
]

const outcomes = [
  { number: '50K+', label: 'people reached', note: 'A growing audience for free, student-built learning.', icon: Globe2 },
  { number: '50+', label: 'students directly supported', note: 'Practical academic support where it is needed most.', icon: HeartHandshake },
  { number: '4', label: 'partner schools', note: 'Working alongside educators and local communities.', icon: School },
  { number: '20+', label: 'resources created', note: 'Study tools made to be shared, revisited, and adapted.', icon: UsersRound },
  { number: '2', label: 'workshops conducted', note: 'Hands-on spaces for learners to try and build.', icon: PackageCheck },
  { number: '50+', label: 'educational kits delivered', note: 'Physical learning materials delivered with care.', icon: PackageCheck },
]

export default function ImpactPage() {
  const reducedMotion = useReducedMotion()
  const enter = (delay = 0) => ({ initial: reducedMotion ? false : { opacity: 0, y: 20 }, whileInView: reducedMotion ? {} : { opacity: 1, y: 0 }, viewport: { once: true, amount: .18 }, transition: { duration: .55, delay, ease: [0.16, 1, .3, 1] } })

  return (
    <main className="impact-page">
      <section className="impact-hero" aria-labelledby="impact-heading">
        <div className="impact-hero-atlas" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <motion.div className="impact-hero-copy" initial={reducedMotion ? false : { opacity: 0, y: 20 }} animate={reducedMotion ? {} : { opacity: 1, y: 0 }} transition={{ duration: .65, ease: [0.16, 1, .3, 1] }}>
          <p className="impact-eyebrow">Impact / Field report 2026</p>
          <h1 id="impact-heading">A spark becomes<br />a <em>signal.</em></h1>
          <p>Every resource shared, chapter started, and kit delivered turns one student’s curiosity into collective momentum.</p>
        </motion.div>
        <motion.div className="impact-big-proof" initial={reducedMotion ? false : { opacity: 0, scale: .94 }} animate={reducedMotion ? {} : { opacity: 1, scale: 1 }} transition={{ duration: .7, delay: .14, ease: [0.16, 1, .3, 1] }}>
          <span>Across our community</span><strong>50K+</strong><p>people reached</p>
        </motion.div>
        <a className="impact-scroll-cue" href="#impact-ledger">Read the numbers <ArrowDownRight size={17} aria-hidden="true" /></a>
      </section>

      <section className="impact-constellation" aria-labelledby="constellation-heading">
        <div className="impact-constellation-heading">
          <p className="impact-eyebrow">The access network</p>
          <h2 id="constellation-heading">Built by young people,<br />carried across borders.</h2>
        </div>
        <div className="impact-chapter-list">
          {chapters.map(([number, label], index) => <motion.div key={label} className="impact-chapter" {...enter(index * .08)}><strong>{number}</strong><span>{label}</span></motion.div>)}
        </div>
      </section>

      <section className="impact-ledger" id="impact-ledger" aria-labelledby="ledger-heading">
        <div className="impact-ledger-intro"><p className="impact-eyebrow">The impact ledger</p><h2 id="ledger-heading">Proof that<br /><em>travels.</em></h2><p>These are the moments of access that add up: one connection, one workshop, one shared resource at a time.</p><div className="impact-raised"><strong>10K+</strong><span>PKR raised to keep learning in motion</span></div></div>
        <div className="impact-outcomes">
          {outcomes.map(({ number, label, note, icon: Icon }, index) => (
            <motion.article className="impact-outcome" key={label} {...enter(index * .055)}>
              <div className="impact-outcome-top"><span>0{index + 1}</span><Icon size={20} aria-hidden="true" /></div>
              <strong>{number}</strong><h3>{label}</h3><p>{note}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="impact-closing"><div><p className="impact-eyebrow">Still in motion</p><h2>Access is not a finish line.<br />It is something we <em>pass on.</em></h2></div><a href="mailto:flamivor@gmail.com">Partner with Flamivor <ArrowDownRight size={18} aria-hidden="true" /></a></section>
    </main>
  )
}
