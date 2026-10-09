import { Link } from 'react-router-dom'
import { ArrowRight, BookOpenCheck, Lightbulb, Orbit, Wrench } from 'lucide-react'
import './AboutPage.css'

const chapters = [
  {
    number: '01',
    title: 'Curiosity needs room.',
    copy: 'Fatima Tu Zahra’s journey into STEM began in her childhood living room: mixing household chemicals into slime and testing how the physical world worked.',
    Icon: Lightbulb,
  },
  {
    number: '02',
    title: 'Memorization is not enough.',
    copy: 'Traditional school revealed a systemic flaw. Science transformed from a hands-on adventure into passive textbook memorization—and natural curiosity began to disappear.',
    Icon: BookOpenCheck,
  },
  {
    number: '03',
    title: 'Make something useful.',
    copy: 'During a severe local power outage, Fatima used a discarded plastic bottle, cardboard, and a piece of thread to engineer a functioning fan on the spot.',
    Icon: Wrench,
  },
]

function StoryMarker({ number, title, copy, Icon, index }) {
  return (
    <article className={`story-marker story-marker-${index + 1}`}>
      <span className="story-marker-number">{number}</span>
      <div className="story-marker-icon" aria-hidden="true"><Icon size={23} /></div>
      <h3>{title}</h3>
      <p>{copy}</p>
    </article>
  )
}

export default function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero" aria-labelledby="about-heading">
        <div className="about-hero-copy">
          <p className="about-eyebrow"><Orbit size={15} aria-hidden="true" /> Our why</p>
          <h1 id="about-heading">Learning should feel<br />like an <em>open door.</em></h1>
          <p>Flamivor is a youth-led education movement building practical pathways for every young person to explore, make, and lead.</p>
        </div>
        <div className="about-hero-stamp">
          <span>Access travels</span><strong>farther<br />when shared.</strong>
        </div>
      </section>

      <section className="about-manifesto" aria-labelledby="manifesto-heading">
        <p className="about-manifesto-label">A practical promise</p>
        <h2 id="manifesto-heading">We meet students where their curiosity begins—not where a textbook ends.</h2>
        <div className="about-manifesto-copy">
          <p>Flamivor pairs hands-on projects with passionate mentorship to make learning feel real again. We bridge the K–12 continuum through a growing global network of student-led chapters.</p>
          <p>Our work is rooted in the belief that access to learning should not depend on background, location, or the ability to pay.</p>
        </div>
      </section>

      <section className="about-story" id="our-story" aria-labelledby="story-heading">
        <div className="about-story-heading">
          <p className="about-eyebrow">Our story / A field note</p>
          <h2 id="story-heading">A spark, a blackout,<br />a better way forward.</h2>
        </div>
        <div className="story-thread" aria-hidden="true"><span /></div>
        <div className="story-markers">
          {chapters.map((chapter, index) => <StoryMarker key={chapter.number} {...chapter} index={index} />)}
        </div>
        <div className="about-story-close">
          <p>The fan was more than a quick solution. It made one thing clear: true learning doesn’t belong in a vacuum, and practical engineering can solve real-world problems.</p>
          <p>Seeing millions of students lose their natural curiosity to dry lectures, Fatima founded Flamivor—a name blending <strong>flame</strong> for the spark of curiosity with <strong>vigor</strong> for the passion to drive change. Today, Flamivor connects student-led chapters around the world so young minds can move past rote memorization and step into their potential as active global innovators.</p>
        </div>
      </section>

      <section className="about-method" aria-labelledby="method-heading">
        <div className="about-method-title"><p className="about-eyebrow">How access takes shape</p><h2 id="method-heading">Think. Build.<br /><em>Share.</em></h2></div>
        <ol>
          <li><span>01</span><div><strong>Think</strong><p>Start with the question a learner already carries.</p></div></li>
          <li><span>02</span><div><strong>Build</strong><p>Turn ideas into projects that touch the real world.</p></div></li>
          <li><span>03</span><div><strong>Share</strong><p>Pass what works through peers, chapters, and communities.</p></div></li>
        </ol>
      </section>

      <section className="about-team-invite">
        <div><p className="about-eyebrow">The people in the room</p><h2>Meet the students<br />behind the movement.</h2></div>
        <Link to="/team" className="about-team-link">Meet our team <ArrowRight size={18} aria-hidden="true" /></Link>
      </section>
    </main>
  )
}
