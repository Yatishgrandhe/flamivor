import { motion } from 'framer-motion'
import Gallery from '../components/Gallery'
import './PageHeader.css'

export default function GalleryPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-bg" />
        <motion.div className="page-header-content"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <h1>Gallery & Press</h1>
          <p>Partner schools, recognition, and media coverage.</p>
        </motion.div>
      </div>
      <Gallery />
    </>
  )
}
