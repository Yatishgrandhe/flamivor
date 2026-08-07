import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Globe, Brain, Handshake } from 'lucide-react'
import { Link } from 'react-router-dom'
import './About.css'

const features = [
  { icon: BookOpen, title: 'Free Study Materials', desc: 'Original flashcards, study guides, and mini-lessons created by students, for students.' },
  { icon: Globe, title: 'Global Reach', desc: '10+ chapters across 14+ countries, building a worldwide network of peer mentorship.' },
  { icon: Brain, title: 'Mental Wellness', desc: 'Strategies to help students thrive academically without burning out.' },
  { icon: Handshake, title: 'Peer Mentorship', desc: 'Connecting students with mentors who understand their challenges firsthand.' },
]

export default function About() {
  return (
    <section id="about">
      <div className="section-inner">
        <div className="about-grid">
          <motion.div
            className="about-visual"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="about-visual-glow" />
            <h3>What We Do</h3>
            <p>A youth-led initiative dedicated to empowering young people through education and advancing UN SDGs 4 and 10 in Pakistan and beyond. We create free study materials, mini-lessons, and educational flashcards — making quality learning resources accessible to every student, regardless of their background.</p>
            <div className="about-badge">UN SDGs 4 & 10</div>
            <Link to="/about" className="about-story-link">Read our story <ArrowRight size={16} aria-hidden="true" /></Link>
          </motion.div>
          <div className="about-features">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={i}
                  className="about-feature"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                >
                  <div className="about-feature-icon"><Icon size={24} /></div>
                  <div>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
