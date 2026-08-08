import Contact from '../components/Contact'
import SvgMotionScene from '../components/SvgMotionScene'
import './PageHeader.css'

export default function ContactPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-bg" />
        <SvgMotionScene scene="contact" className="contact-header-svg-scene" />
        <div className="page-header-content">
          <h1>Contact</h1>
          <p>Have questions, want to collaborate, or just want to say hello? We'd love to hear from you.</p>
        </div>
      </div>
      <Contact />
    </>
  )
}
