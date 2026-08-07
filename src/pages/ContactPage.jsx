import { motion } from 'motion/react'
import KokonutEditorialPaths from '../components/KokonutEditorialPaths'
import Contact from '../components/Contact'
import useCompactMotion from '../hooks/useCompactMotion'
import './PageHeader.css'

export default function ContactPage() {
  const compactMotion = useCompactMotion()
  return (
    <>
      <div className="page-header">
        <div className="page-header-bg" />
        <KokonutEditorialPaths />
        <motion.div className="page-header-content"
          initial={compactMotion ? false : { opacity: 0, y: 30 }} animate={compactMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <h1>Contact</h1>
          <p>Have questions, want to collaborate, or just want to say hello? We'd love to hear from you.</p>
        </motion.div>
      </div>
      <Contact />
    </>
  )
}
