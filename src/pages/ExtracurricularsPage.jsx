import { motion } from 'framer-motion'
import Extracurriculars from '../components/Extracurriculars'
import './PageHeader.css'

export default function ExtracurricularsPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-bg" />
        <motion.div className="page-header-content"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <h1>Extracurriculars</h1>
          <p>Community service, debate competitions, sports championships, and academic olympiads — curated by Flamivor students.</p>
        </motion.div>
      </div>
      <Extracurriculars />
    </>
  )
}
