import { motion } from 'motion/react'
import { ArrowDownRight, FileCheck2, Globe2, HeartHandshake, School, UsersRound } from 'lucide-react'
import useCompactMotion from '../hooks/useCompactMotion'
import './ImpactPage.css'

const evidenceAreas = [
  { label: 'Access', note: 'Resources and practical learning materials shared with students.', icon: Globe2 },
  { label: 'Support', note: 'Peer mentorship and hands-on academic support where it is needed.', icon: HeartHandshake },
  { label: 'Partnership', note: 'Work developed alongside educators, schools, and communities.', icon: School },
  { label: 'Participation', note: 'Students and volunteers contributing their skills to the movement.', icon: UsersRound },
]

export default function ImpactPage() {
  const compactMotion = useCompactMotion()
  const enter = (delay = 0) => ({ initial: compactMotion ? false : { opacity: 0, y: 20 }, whileInView: compactMotion ? {} : { opacity: 1, y: 0 }, viewport: { once: true, amount: .18 }, transition: { duration: .55, delay, ease: [0.16, 1, .3, 1] } })

  return (
    <main className="impact-page">
      <section className="impact-hero" aria-labelledby="impact-heading">
        <div className="impact-hero-atlas" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <motion.div className="impact-hero-copy" initial={compactMotion ? false : { opacity: 0, y: 20 }} animate={compactMotion ? {} : { opacity: 1, y: 0 }} transition={{ duration: .65, ease: [0.16, 1, .3, 1] }}>
          <p className="impact-eyebrow">Impact / Field report</p>
          <h1 id="impact-heading">A spark becomes<br />a <em>signal.</em></h1>
          <p>Every resource shared, chapter started, and kit delivered turns one student’s curiosity into collective momentum.</p>
        </motion.div>
        <motion.div className="impact-big-proof" initial={compactMotion ? false : { opacity: 0, scale: .94 }} animate={compactMotion ? {} : { opacity: 1, scale: 1 }} transition={{ duration: .7, delay: .14, ease: [0.16, 1, .3, 1] }}>
          <span>Reporting status</span><FileCheck2 size={34} aria-hidden="true" /><p>Verified data coming soon</p>
        </motion.div>
        <a className="impact-scroll-cue" href="#impact-ledger">Read the numbers <ArrowDownRight size={17} aria-hidden="true" /></a>
      </section>

      <section className="impact-constellation" aria-labelledby="constellation-heading">
        <div className="impact-constellation-heading">
          <p className="impact-eyebrow">The access network</p>
          <h2 id="constellation-heading">Built by young people,<br />carried through care.</h2>
        </div>
        <div className="impact-chapter-list impact-data-state" role="status">
          <strong>Data coming soon</strong>
          <p>Flamivor is preparing a source-checked impact report. We will publish figures, dates, definitions, and the supporting chart only once they can be responsibly verified.</p>
        </div>
      </section>

      <section className="impact-ledger" id="impact-ledger" aria-labelledby="ledger-heading">
        <div className="impact-ledger-intro"><p className="impact-eyebrow">The impact ledger</p><h2 id="ledger-heading">Proof that<br /><em>travels.</em></h2><p>These are the moments of access that add up: one connection, one workshop, one shared resource at a time.</p><div className="impact-raised"><strong>Next</strong><span>Source-checked figures and a plain-language report</span></div></div>
        <div className="impact-outcomes">
          {evidenceAreas.map(({ label, note, icon: Icon }, index) => (
            <motion.article className="impact-outcome" key={label} {...enter(index * .055)}>
              <div className="impact-outcome-top"><span>0{index + 1}</span><Icon size={20} aria-hidden="true" /></div>
              <strong aria-hidden="true">—</strong><h3>{label}</h3><p>{note}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="impact-closing"><div><p className="impact-eyebrow">Still in motion</p><h2>Access is not a finish line.<br />It is something we <em>pass on.</em></h2></div><a href="mailto:flamivor@gmail.com">Partner with Flamivor <ArrowDownRight size={18} aria-hidden="true" /></a></section>
    </main>
  )
}
