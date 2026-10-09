import { Link } from 'react-router-dom'
import { ArrowRight, BookOpenCheck, Palette, UsersRound } from 'lucide-react'
import './HomePaths.css'

const paths = [
  { number: '01', icon: BookOpenCheck, title: 'Learn something that clicks.', copy: 'Start with a clear, student-made explanation and bring the question you still have.', link: '/resources', label: 'Find a study tool' },
  { number: '02', icon: UsersRound, title: 'Make space in your community.', copy: 'Bring Flamivor’s shared-learning mindset to your school, city, or local network.', link: '/join', label: 'Explore chapter leadership' },
  { number: '03', icon: Palette, title: 'Put your skills to work.', copy: 'Help create, design, research, organise, or tell the story of accessible learning.', link: '/join', label: 'See ways to contribute' },
]

export default function HomePaths() {
  return <>
    <section className="home-paths" aria-labelledby="home-paths-heading">
      <div className="home-paths-heading"><p className="home-paths-eyebrow">Start where you are</p><h2 id="home-paths-heading">One movement.<br />Three ways in.</h2><p>Flamivor is built for the learner looking for a foothold and the young person ready to build one for someone else.</p></div>
      <div className="home-path-list">{paths.map(({ number, icon: Icon, title, copy, link, label }) => <article className="home-path" key={number}><div className="home-path-number">{number}</div><div className="home-path-icon"><Icon size={22} aria-hidden="true" /></div><div><h3>{title}</h3><p>{copy}</p><Link to={link}>{label} <ArrowRight size={16} aria-hidden="true" /></Link></div></article>)}</div>
    </section>
    <section className="home-invitation"><div className="home-invitation-image"><img src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=84" alt="Students collaborating around a table" loading="lazy" /></div><div className="home-invitation-copy"><p className="home-paths-eyebrow">A note from the movement</p><h2>Curiosity grows<br />when it is shared.</h2><p>We are growing a global network of students who make learning more practical, more generous, and easier to pass on.</p><Link to="/about">Meet the story behind Flamivor <ArrowRight size={17} aria-hidden="true" /></Link></div></section>
  </>
}
