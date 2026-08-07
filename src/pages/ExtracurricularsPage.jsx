import { motion } from 'motion/react'
import { ArrowUpRight, Atom, CalendarDays, HeartHandshake, MapPin, Mic2, Trophy, UsersRound } from 'lucide-react'
import useCompactMotion from '../hooks/useCompactMotion'
import './ExtracurricularsPage.css'

const tracks = [
  { label: 'Debate & public speaking', icon: Mic2 }, { label: 'Sports', icon: Trophy },
  { label: 'Academic olympiads', icon: Atom }, { label: 'Community service', icon: HeartHandshake },
]
const opportunities = [
  ['National Speech & Debate Tournament', 'Debate', 'The largest academic competition in the USA. Over 150,000 students compete in formats including Lincoln-Douglas, Policy, and Public Forum.', 'Apr 1, 2026', 'June 2026 — USA', 'Grades 6–12', 'https://www.speechanddebate.org/'],
  ['Asia Pacific Schools & Juniors Debate Championships', 'Debate', 'Fast-paced team debates for school and junior students across the Asia-Pacific region. Students develop critical thinking and argumentation skills.', 'Via national body', '2026 — Asia Pacific', 'Secondary school', 'https://www.instagram.com/p/DK6HANpzhO9/'],
  ['ISF World School Games', 'Sports', 'The world’s largest multi-sport event for school-age athletes. Countries compete across team and individual sports in an Olympics-style format.', 'Via national federation', '2026 — International', 'Secondary school', 'https://www.isfsports.org/'],
  ['Duke of Edinburgh International Award', 'Service', 'A globally recognised youth achievement framework for ages 14–24. Complete challenges in volunteering, physical activity, and skill-building.', 'Rolling', 'Global (130+ countries)', 'Ages 14–24', 'https://www.dukeofed.org/'],
  ['I-SWEEEP — International Science Fair', 'Academic', 'A global science fair experience for students interested in solving questions through research, experimentation, and scientific communication.', 'Rolling', 'Ongoing — self-paced', 'Global (130+ countries)', 'https://stemsos.org/categories/stemculture/isweeephsef.html'],
  ['THIMUN: The Hague International MUN', 'Service', 'One of the world’s oldest and most prestigious Model UN conferences, held annually in The Hague with students from 100+ countries.', 'Rolling (school)', 'Jan 2027 — The Hague', 'Secondary school', 'https://thehague.thimun.org/'],
  ['Regeneron ISEF by Society for Science', 'Academic', 'The world’s largest international pre-college science competition, open to students globally. Winners from affiliated regional fairs qualify.', 'Via regional fair', 'May 2027 — USA', 'Grades 9–12 (14–18)', 'https://www.societyforscience.org/isef/'],
  ['HOSA: Future Health Professionals (ILC)', 'Service', 'A health sciences organisation where students compete across 60+ healthcare events at the annual International Leadership Conference.', 'Mar 1, 2026', 'June 17–20, 2026 — Indy', 'High school & college', 'https://hosa.org/ilc/'],
  ['World Schools Debating Championships', 'Debate', 'The most prestigious international schools debate competition. More than 70 nations compete annually using the World Schools format.', 'Via national body', 'July 2026 — Nairobi', 'Secondary school', 'https://www.wsdcdebating.org/'],
  ['Asian Schools Debating Championship', 'Debate', 'A premier debate championship for Asian secondary school students. The 2026 edition is held in Vietnam using Asian Parliamentary format.', 'May 30, 2026', 'June 21–24, 2026 — Vietnam', 'Secondary school', 'https://www.facebook.com/p/Vietnam-Asian-Schools-Debating-Championship-2026-61572219136437/'],
]

export default function ExtracurricularsPage() {
  const compactMotion = useCompactMotion()
  const enter = (delay = 0) => ({ initial: compactMotion ? false : { opacity: 0, y: 18 }, whileInView: compactMotion ? {} : { opacity: 1, y: 0 }, viewport: { once: true, amount: .16 }, transition: { duration: .5, delay, ease: [0.16, 1, .3, 1] } })
  return <main className="opportunity-page">
    <section className="opportunity-hero" aria-labelledby="opportunity-heading">
      <motion.div className="opportunity-hero-copy" initial={compactMotion ? false : { opacity: 0, y: 20 }} animate={compactMotion ? {} : { opacity: 1, y: 0 }} transition={{ duration: .65, ease: [0.16, 1, .3, 1] }}><p className="opportunity-eyebrow">The opportunity board</p><h1>Find the room<br />where you <em>belong.</em></h1><p>Competitions, service, sports, and academic experiences curated by Flamivor students for the next thing you want to try.</p></motion.div>
      <motion.figure className="opportunity-hero-image" initial={compactMotion ? false : { opacity: 0, scale: .96 }} animate={compactMotion ? {} : { opacity: 1, scale: 1 }} transition={{ duration: .7, delay: .1, ease: [0.16, 1, .3, 1] }}><img src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=84" alt="Students planning together outdoors" fetchPriority="high" /><figcaption>Open calls / updated 2026</figcaption></motion.figure>
    </section>
    <section className="opportunity-tracks" aria-labelledby="track-heading"><div><p className="opportunity-eyebrow">Four ways in</p><h2 id="track-heading">Choose a direction.<br />Keep your curiosity.</h2></div><div className="opportunity-track-list">{tracks.map(({ label, icon: Icon }) => <div key={label}><Icon size={20} aria-hidden="true" /><span>{label}</span></div>)}</div></section>
    <section className="opportunity-list" aria-labelledby="opportunity-list-heading"><div className="opportunity-list-heading"><p className="opportunity-eyebrow">The open calls</p><h2 id="opportunity-list-heading">Worth putting<br />on your calendar.</h2><p>Deadlines and eligibility can change—always confirm details with the host organisation before you apply.</p></div><div className="opportunity-records">{opportunities.map(([title, tag, desc, deadline, when, who, link], index) => <motion.article className="opportunity-record" key={title} {...enter(index * .035)}><div className="opportunity-record-number">{String(index + 1).padStart(2, '0')}</div><div className="opportunity-record-copy"><span>{tag}</span><h3>{title}</h3><p>{desc}</p><div className="opportunity-meta"><span><CalendarDays size={14} aria-hidden="true" /> {deadline}</span><span><MapPin size={14} aria-hidden="true" /> {when}</span><span><UsersRound size={14} aria-hidden="true" /> {who}</span></div></div><a href={link} target="_blank" rel="noopener noreferrer" className="opportunity-link">Visit opportunity <ArrowUpRight size={18} aria-hidden="true" /></a></motion.article>)}</div></section>
    <section className="opportunity-submit"><div><p className="opportunity-eyebrow">Keep the board growing</p><h2>Know an opening<br />we should share?</h2></div><a href="https://docs.google.com/forms/d/e/1FAIpQLSd0wjV73RN4RSCrDU7RhLd31gw8ZBoHiQbI1q9L0dhKdeOCjg/viewform?usp=header" target="_blank" rel="noopener noreferrer">Submit an opportunity <ArrowUpRight size={18} aria-hidden="true" /></a></section>
  </main>
}
