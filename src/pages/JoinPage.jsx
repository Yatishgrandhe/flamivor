import { motion } from 'framer-motion'
import JoinUs from '../components/JoinUs'
import './PageHeader.css'

export default function JoinPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-bg" />
        <motion.div className="page-header-content"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <h1>Join Us</h1>
          <p>Help us empower students globally and prevent financial barriers from hindering their educational journeys.</p>
        </motion.div>
      </div>
      <JoinUs />
    </>
  )
}
