import { motion } from 'framer-motion'
import Resources from '../components/Resources'
import './PageHeader.css'

export default function ResourcesPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-bg" />
        <motion.div className="page-header-content"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <h1>Resources</h1>
          <p>Free, original study materials — flashcards, mini-lessons, and study guides created by students, for students.</p>
        </motion.div>
      </div>
      <Resources />
    </>
  )
}
