import { motion } from 'framer-motion'
import Impact from '../components/Impact'
import './PageHeader.css'

export default function ImpactPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-bg" />
        <motion.div className="page-header-content"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <h1>Our Impact</h1>
          <p>From Pakistan to 14+ countries, Flamivor is building a global movement of accessible education.</p>
        </motion.div>
      </div>
      <Impact />
    </>
  )
}
