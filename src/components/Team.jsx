import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Sparkles, UsersRound } from 'lucide-react'
import './Team.css'

const team = [
  { name: 'Fatima Tu Zahra', role: 'Founder & Chief Executive Officer', initials: 'FT', lead: true },
  { name: 'Ahmad Faisal', role: 'President', initials: 'AF' },
  { name: 'Maira Faisal', role: 'Co-President', initials: 'MF' },
  { name: 'Annie Jiao', role: 'Brand Strategy & Design Lead', initials: 'AJ' },
]

function PortraitPlaceholder({ initials, name, priority = false }) {
  return (
    <div className="portrait-placeholder" aria-label={`${name} portrait placeholder`}>
      <span className="portrait-thread" aria-hidden="true" />
      <span className="portrait-initials" aria-hidden="true">{initials}</span>
      <span className="portrait-caption">Portrait arriving soon</span>
      {priority && <span className="portrait-corner" aria-hidden="true">01</span>}
    </div>
  )
}

export default function Team() {
  return (
    <main className="team-page">
      <section className="team-intro" aria-labelledby="team-heading">
        <div className="team-intro-rule" aria-hidden="true"><span /></div>
        <div className="team-intro-copy">
          <p className="team-eyebrow"><Sparkles size={14} aria-hidden="true" /> The people carrying the flame</p>
          <h1 id="team-heading">Young people<br /><em>making room</em> for more.</h1>
          <p className="team-intro-lede">Flamivor is built by students and early-career leaders who believe access grows when learning is shared.</p>
        </div>
        <aside className="team-intro-note">
          <span>Field note / 2026</span>
          <p>Our portraits are being gathered alongside the stories that make this work personal.</p>
        </aside>
      </section>

      <section className="team-founder" aria-labelledby="founder-heading">
        <div className="team-founder-portrait">
          <PortraitPlaceholder initials={team[0].initials} name={team[0].name} priority />
        </div>
        <div className="team-founder-copy">
          <p className="team-section-label">Starting with a question</p>
          <h2 id="founder-heading">“What if learning felt like discovery again?”</h2>
          <p>That question sits at the centre of Flamivor. It began with Fatima Tu Zahra’s instinct to test, build, and share—and grew into a global student-led movement for practical, free learning.</p>
          <div className="team-founder-meta">
            <strong>{team[0].name}</strong>
            <span>{team[0].role}</span>
          </div>
          <Link to="/about#our-story" className="team-text-link">Read the founding story <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="team-directory" aria-labelledby="directory-heading">
        <div className="team-directory-heading">
          <div>
            <p className="team-section-label">The directory</p>
            <h2 id="directory-heading">The team behind<br />the next chapter.</h2>
          </div>
          <p>Real faces and fuller introductions will join this page soon. Until then, meet the names and roles keeping Flamivor moving.</p>
        </div>

        <div className="team-grid">
          {team.slice(1).map((member, index) => (
            <article className="team-member" key={member.name}>
              <PortraitPlaceholder initials={member.initials} name={member.name} />
              <div className="team-member-copy">
                <span className="team-member-number">0{index + 2}</span>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="team-join">
        <div className="team-join-icon" aria-hidden="true"><UsersRound size={25} /></div>
        <div>
          <p className="team-section-label">There is room for you here</p>
          <h2>Bring your curiosity<br />to the circle.</h2>
        </div>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSei33hS90nZBKNibIjMA456mYkTLNGVYcI4THY4NxnLo1HWPg/viewform" target="_blank" rel="noopener noreferrer" className="team-join-link">Become an executive member <ArrowUpRight size={18} aria-hidden="true" /></a>
      </section>
    </main>
  )
}
