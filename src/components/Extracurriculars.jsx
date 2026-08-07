import { motion } from 'motion/react'
import { Calendar, MapPin, User } from 'lucide-react'
import './Extracurriculars.css'

const tagClass = { Debate: 'tag-debate', Sports: 'tag-sports', Academic: 'tag-academic', Service: 'tag-service' }
const tagLabel = { Debate: 'Debate & Public Speaking', Sports: 'Sports', Academic: 'Academic Olympiads', Service: 'Community Service' }

const opportunities = [
  { title: 'National Speech & Debate Tournament', tag: 'Debate', desc: 'The largest academic competition in the USA. Over 150,000 students compete in formats including Lincoln-Douglas, Policy, Public Forum.', deadline: 'Apr 1, 2026', when: 'June 2026 — USA', who: 'Grades 6–12', link: 'https://www.speechanddebate.org/' },
  { title: 'Asia Pacific Schools & Juniors Debate Championships', tag: 'Debate', desc: 'Fast-paced team debates for school and junior students across the Asia-Pacific region. Students develop critical thinking and argumentation skills.', deadline: 'Via national body', when: '2026 — Asia Pacific', who: 'Secondary school', link: 'https://www.instagram.com/p/DK6HANpzhO9/' },
  { title: 'ISF World School Games', tag: 'Sports', desc: "The world's largest multi-sport event for school-age athletes. Countries compete across team and individual sports in an Olympics-style format.", deadline: 'Via national federation', when: '2026 — International', who: 'Secondary school', link: 'https://www.isfsports.org/' },
  { title: 'Duke of Edinburgh International Award', tag: 'Service', desc: 'A globally recognised youth achievement framework for ages 14–24. Complete challenges in volunteering, physical activity, and skill-building.', deadline: 'Rolling', when: 'Global (130+ countries)', who: 'Ages 14–24', link: 'https://www.dukeofed.org/' },
  { title: 'I-SWEEEP — International Science Fair', tag: 'Academic', desc: 'A globally recognised youth achievement framework for ages 14–24. Complete challenges in volunteering, physical activity, skill-building.', deadline: 'Rolling', when: 'Ongoing — self-paced', who: 'Global (130+ countries)', link: 'https://stemsos.org/categories/stemculture/isweeephsef.html' },
  { title: 'THIMUN: The Hague International MUN', tag: 'Service', desc: "One of the world's oldest and most prestigious Model UN conferences, held annually in The Hague. Thousands of students from 100+ countries.", deadline: 'Rolling (school)', when: 'Jan 2027 — The Hague', who: 'Secondary school', link: 'https://thehague.thimun.org/' },
  { title: 'Regeneron ISEF by Society for Science', tag: 'Academic', desc: "The world's largest international pre-college science competition, open to students globally. Winners from affiliated regional fairs qualify.", deadline: 'Via regional fair', when: 'May 2027 — USA', who: 'Grades 9–12 (14–18)', link: 'https://www.societyforscience.org/isef/' },
  { title: 'HOSA: Future Health Professionals (ILC)', tag: 'Service', desc: 'US-based but internationally open health sciences organisation. Students compete across 60+ healthcare events at the annual ILC.', deadline: 'Mar 1, 2026', when: 'June 17–20, 2026 — Indy', who: 'High school & college', link: 'https://hosa.org/ilc/' },
  { title: 'World Schools Debating Championships', tag: 'Debate', desc: 'The most prestigious international schools debate competition — 70+ nations compete annually. Uses World Schools format.', deadline: 'Via national body', when: 'July 2026 — Nairobi', who: 'Secondary school', link: 'https://www.wsdcdebating.org/' },
  { title: 'Asian Schools Debating Championship', tag: 'Debate', desc: 'Premier debate championship for Asian secondary school students. 2026 edition held in Vietnam. Covers Asian Parliamentary format.', deadline: 'May 30, 2026', when: 'June 21–24, 2026 — Vietnam', who: 'Secondary school', link: 'https://www.facebook.com/p/Vietnam-Asian-Schools-Debating-Championship-2026-61572219136437/' },
]

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }
const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export default function Extracurriculars() {
  return (
    <section id="extracurriculars">
      <div className="section-inner">
        <motion.div className="section-label" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          Opportunities
        </motion.div>
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Extracurricular<br />Opportunities
        </motion.h2>
        <motion.p className="section-desc" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          Community service, debate competitions, sports championships, and academic olympiads — curated by Flamivor students, for Flamivor students.
        </motion.p>

        <motion.div className="extra-grid" variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          {opportunities.map((o, i) => (
            <motion.div key={i} className="extra-card" variants={item} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
              <span className={`extra-tag ${tagClass[o.tag]}`}>{tagLabel[o.tag]}</span>
              <h3>{o.title}</h3>
              <p className="desc">{o.desc}</p>
              <div className="extra-meta">
                <span><Calendar size={12} /> {o.deadline}</span>
                <span><MapPin size={12} /> {o.when}</span>
                <span><User size={12} /> {o.who}</span>
              </div>
              <a href={o.link} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ width: 'fit-content', padding: '10px 22px', fontSize: '0.82rem' }}>Learn More →</a>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="cta-banner" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ marginTop: 48 }}>
          <h2>Know an Opportunity? Share it!</h2>
          <p>Help us expand our curated list of opportunities for students worldwide.</p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSd0wjV73RN4RSCrDU7RhLd31gw8ZBoHiQbI1q9L0dhKdeOCjg/viewform?usp=header" target="_blank" rel="noopener noreferrer" className="btn-primary">Submit an Opportunity →</a>
        </motion.div>
      </div>
    </section>
  )
}
