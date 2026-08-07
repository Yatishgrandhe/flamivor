import { motion } from 'motion/react'
import Gallery from '../components/Gallery'
import useCompactMotion from '../hooks/useCompactMotion'
import './PageHeader.css'

export default function GalleryPage() {
  const compactMotion = useCompactMotion()
  return (
    <>
      <section className="gallery-page-hero" aria-labelledby="gallery-page-heading">
        <div className="gallery-page-hero-index" aria-hidden="true"><span>Field</span><strong>01–06</strong><i /></div>
        <motion.div className="gallery-page-hero-copy"
          initial={compactMotion ? false : { opacity: 0, y: 24 }} animate={compactMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <p>Archive / 2026</p>
          <h1 id="gallery-page-heading">Gallery<br />&amp; <em>Press.</em></h1>
        </motion.div>
        <motion.p className="gallery-page-hero-note" initial={compactMotion ? false : { opacity: 0, y: 16 }} animate={compactMotion ? {} : { opacity: 1, y: 0 }} transition={{ duration: .5, delay: .12, ease: [0.16, 1, .3, 1] }}>Partner schools, recognition, and small moments that show learning in motion.</motion.p>
      </section>
      <Gallery />
    </>
  )
}
