import { useRef, useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import SvgMotionScene from './SvgMotionScene'
import './Contact.css'

const socials = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/flamivor/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@flamivor',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.01a6.34 6.34 0 1 0 5.45 6.29V9.55a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.38z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@flamivor',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
]

const formFields = [
  { name: 'firstName', label: 'First Name', type: 'text', required: true, half: true },
  { name: 'lastName', label: 'Last Name', type: 'text', required: true, half: true },
  { name: 'email', label: 'Email', type: 'email', required: true, half: false },
  { name: 'subject', label: 'Subject', type: 'text', required: true, half: false },
  { name: 'message', label: 'Message', type: 'textarea', required: true, half: false },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', subject: '', message: '', website: '',
  })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const submittingRef = useRef(false)

  const validate = () => {
    const errs = {}
    if (!formData.firstName.trim()) errs.firstName = 'Required'
    if (!formData.lastName.trim()) errs.lastName = 'Required'
    if (!formData.email.trim()) errs.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email'
    if (!formData.subject.trim()) errs.subject = 'Required'
    if (!formData.message.trim()) errs.message = 'Required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submittingRef.current) return
    if (!validate()) return
    submittingRef.current = true
    setStatus('submitting')
    setSubmitError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!response.ok) throw new Error('Unable to send your message.')
      const payload = await response.json().catch(() => ({}))
      if (!payload.ok) throw new Error(payload.error || 'Unable to send your message.')
      setStatus('success')
      setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '', website: '' })
      setTimeout(() => setStatus('idle'), 4000)
    } catch (error) {
      setSubmitError(error.message || 'Something went wrong. Please try again.')
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    } finally {
      submittingRef.current = false
    }
  }

  return (
    <section className="contact-section">
      <div className="section-inner">
        <div className="section-label">
          Contact
        </div>
        <h2 className="section-title">
          Get in touch
        </h2>
        <p className="section-desc">
          Have questions, want to collaborate, or just want to say hello? We'd love to hear from you.
        </p>

        <div className="contact-grid">
          {/* Left — Info */}
          <div className="contact-info">
            <a href="mailto:flamivor@gmail.com" className="contact-item">
              <div className="contact-icon-wrap">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div>
                <h4>Email</h4>
                <p>flamivor@gmail.com</p>
              </div>
            </a>
            <a href="https://linktr.ee/flamivor" target="_blank" rel="noopener noreferrer" className="contact-item">
              <div className="contact-icon-wrap">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </div>
              <div>
                <h4>Linktree</h4>
                <p>linktr.ee/flamivor</p>
              </div>
            </a>

            <div className="contact-socials">
              <p className="contact-socials-label">Follow us</p>
              <div className="contact-socials-row">
                {socials.map(s => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="social-link" title={s.name}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="contact-partnership">
              <p>For partnerships and sponsorships</p>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSeLPLP4FSD4uCjOPoj21jlzAnbhY0SVKP6NQ1VK4vo5bkZhUQ/viewform" target="_blank" rel="noopener noreferrer" className="btn-outline">
                Fill Partnership Form →
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <div className="contact-form-wrap">
            <SvgMotionScene scene="contact" state={status === 'success' ? 'sent' : 'idle'} className="contact-form-svg-scene" />
            <h3>Send us a message</h3>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-honeypot" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" type="text" name="website" value={formData.website} onChange={handleChange} tabIndex="-1" autoComplete="off" />
              </div>
              <div className="form-row">
                {formFields.filter(f => f.half).map(f => (
                  <div key={f.name} className={`form-group ${errors[f.name] ? 'form-error' : ''}`}>
                    <label htmlFor={f.name}>{f.label}</label>
                    <input id={f.name} type={f.type} name={f.name} value={formData[f.name]} onChange={handleChange} required={f.required} />
                    {errors[f.name] && <span className="form-error-text">{errors[f.name]}</span>}
                  </div>
                ))}
              </div>
              {formFields.filter(f => !f.half).map(f => (
                <div key={f.name} className={`form-group ${errors[f.name] ? 'form-error' : ''}`}>
                  <label htmlFor={f.name}>{f.label}</label>
                  {f.type === 'textarea' ? (
                    <textarea id={f.name} name={f.name} value={formData[f.name]} onChange={handleChange} required={f.required} rows={5} />
                  ) : (
                    <input id={f.name} type={f.type} name={f.name} value={formData[f.name]} onChange={handleChange} required={f.required} />
                  )}
                  {errors[f.name] && <span className="form-error-text">{errors[f.name]}</span>}
                </div>
              ))}
              <button type="submit" className="btn-primary form-submit" disabled={status === 'submitting'} aria-busy={status === 'submitting'}>
                <span className="form-button-state">
                  {status === 'submitting' ? 'Sending message' : status === 'success' ? <><CheckCircle size={16} /> Sent!</> : <>Send Message <Send size={14} /></>}
                </span>
              </button>
              {status === 'success' && <p className="form-success" role="status">Thanks for reaching out! We'll get back to you soon.</p>}
              {status === 'error' && <p className="form-error-msg" role="alert"><AlertCircle size={14} /> {submitError}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
