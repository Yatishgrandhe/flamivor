import { motion } from 'framer-motion'
import Team from '../components/Team'
import './PageHeader.css'

export default function TeamPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-bg" />
        <motion.div className="page-header-content"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <h1>Our Team</h1>
          <p>Students, volunteers, and leaders united by one mission — making learning free and accessible for all.</p>
        </motion.div>
      </div>
      <Team />
    </>
  )
}
