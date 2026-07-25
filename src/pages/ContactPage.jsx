import { motion } from 'framer-motion'
import Contact from '../components/Contact'
import './PageHeader.css'

export default function ContactPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-bg" />
        <motion.div className="page-header-content"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <h1>Contact</h1>
          <p>Have questions, want to collaborate, or just want to say hello? We'd love to hear from you.</p>
        </motion.div>
      </div>
      <Contact />
    </>
  )
}
