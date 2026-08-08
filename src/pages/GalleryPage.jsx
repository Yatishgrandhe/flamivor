import Gallery from '../components/Gallery'
import SvgMotionScene from '../components/SvgMotionScene'
import './PageHeader.css'

export default function GalleryPage() {
  return (
    <>
      <section className="gallery-page-hero" aria-labelledby="gallery-page-heading">
        <div className="gallery-page-hero-index" aria-hidden="true"><span>Field</span><strong>01–06</strong><i /></div>
        <SvgMotionScene scene="gallery" className="gallery-svg-scene" />
        <div className="gallery-page-hero-copy">
          <p>Archive / 2026</p>
          <h1 id="gallery-page-heading">Gallery<br />&amp; <em>Press.</em></h1>
        </div>
        <p className="gallery-page-hero-note">Partner schools, recognition, and small moments that show learning in motion.</p>
      </section>
      <Gallery />
    </>
  )
}
