import { motion } from 'framer-motion'
import './JoinUs.css'

const roles = [
  {
    title: 'General Volunteer',
    desc: 'Join our volunteer team and help shape the future of accessible education. Volunteers contribute in areas like content creation (flashcards, study guides), social media support, outreach, and research. No prior experience required — just a passion for education.',
    perks: ['Certificate of Contribution', 'Flexible Remote Hours', 'Work at your own pace', 'Global Impact'],
    link: 'https://docs.google.com/forms/d/e/1FAIpQLSd0wjV73RN4RSCrDU7RhLd31gw8ZBoHiQbI1q9L0dhKdeOCjg/viewform?usp=header',
    linkLabel: 'Apply Here',
  },
  {
    title: 'Chapter Founder',
    desc: "Lead a local or school-based chapter of Flamivor. You will recruit a team (Outreach, Research, Media, Design, HR), coordinate educational content creation and distribution, maintain communication with Flamivor's core team, and uphold respectful conduct.",
    perks: ["Founder's Certificate", 'Official chapter Instagram', 'Direct support from core team', 'Real local impact'],
    link: 'https://docs.google.com/forms/d/e/1FAIpQLSeI2Aw8Bd6rMCMt6VJL02WpN9aY6w0g9n7pdupkuyCgy_gJ_g/viewform?usp=dialog',
    linkLabel: 'Apply Here',
  },
  {
    title: 'Executive Positions',
    desc: 'Join our executive team and help lead the future of accessible education. Executives manage core organizational operations — C-suite strategy, department management, creative design, and volunteer coordination.',
    perks: ['Executive Title & Certificate', 'Hands-on Leadership', 'Networking & Collaboration', 'Resume & Portfolio Builder'],
    link: 'https://docs.google.com/forms/d/e/1FAIpQLSei33hS90nZBKNibIjMA456mYkTLNGVYcI4THY4NxnLo1HWPg/viewform?usp=header',
    linkLabel: 'Apply Here',
  },
  {
    title: 'Social Media Internships',
    desc: 'Create short-form video content, develop original ideas for 3 Instagram Reels per week, OR design visually stunning educational graphics, social media assets, and branded materials.',
    perks: ['Certificate of Completion', 'Portfolio-worthy work', 'Remote & flexible hours'],
    links: [
      { link: 'https://docs.google.com/forms/d/e/1FAIpQLScqgxV-gJGhL2HBcbi0NF9ipnThZPnZ2iq1rhQZj_bskiNybA/viewform?usp=dialog', label: 'Apply for Reels Internship' },
      { link: 'https://docs.google.com/forms/d/e/1FAIpQLScOSZq50rdFlC1N8h7FOLCKNwQ1TK8iL7XVTTxv2NnZLnl1Vg/viewform?usp=header', label: 'Apply for Graphics Internship' },
    ],
  },
]

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const item = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function JoinUs() {
  return (
    <section id="join">
      <div className="section-inner">
        <motion.div className="section-label" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          Join Us
        </motion.div>
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Help us empower<br />students globally
        </motion.h2>
        <motion.p className="section-desc" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          Prevent financial barriers from hindering educational journeys whilst providing original study materials, mini-lessons, and educational flashcards.
        </motion.p>

        <motion.div className="join-grid" variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          {roles.map((r, i) => (
            <motion.div key={i} className="join-card" variants={item} whileHover={{ y: -6, transition: { duration: 0.2 } }}>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
              <div className="perks">
                {r.perks.map((p, j) => <span key={j} className="perk">{p}</span>)}
              </div>
              {r.link && (
                <a href={r.link} target="_blank" rel="noopener noreferrer" className="btn-primary join-btn">{r.linkLabel} →</a>
              )}
              {r.links && r.links.map((l, j) => (
                <a key={j} href={l.link} target="_blank" rel="noopener noreferrer" className={j === 0 ? 'btn-primary join-btn' : 'btn-secondary join-btn'} style={j > 0 ? { marginTop: 12 } : {}}>
                  {l.label} →
                </a>
              ))}
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="cta-banner" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ marginTop: 48 }}>
          <h2>Want to make a difference?</h2>
          <p>Join our volunteer team — no experience needed, just passion.</p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSd0wjV73RN4RSCrDU7RhLd31gw8ZBoHiQbI1q9L0dhKdeOCjg/viewform?usp=header" target="_blank" rel="noopener noreferrer" className="btn-primary">Volunteer with Us →</a>
        </motion.div>
      </div>
    </section>
  )
}
