import { ArrowDownRight, FileCheck2 } from 'lucide-react'
import './ImpactPage.css'

export default function ImpactPage() {
  return (
    <main className="impact-page">
      <section className="impact-hero" aria-labelledby="impact-heading">
        <div className="impact-hero-copy">
          <p className="impact-eyebrow">Impact / Field report</p>
          <h1 id="impact-heading">A spark becomes<br />a <em>signal.</em></h1>
          <p>Every resource shared, chapter started, and kit delivered turns one student’s curiosity into collective momentum.</p>
        </div>
        <div className="impact-big-proof">
          <span>Reporting status</span><FileCheck2 size={34} aria-hidden="true" /><p>Verified data coming soon</p>
        </div>
        <a className="impact-scroll-cue" href="#impact-ledger">Read the numbers <ArrowDownRight size={17} aria-hidden="true" /></a>
      </section>

      <section className="impact-constellation" aria-labelledby="constellation-heading">
        <div className="impact-constellation-heading">
          <p className="impact-eyebrow">The access network</p>
          <h2 id="constellation-heading">Built by young people,<br />carried through care.</h2>
        </div>
        <div className="impact-chapter-list impact-data-state" role="status">
          <strong>Data coming soon</strong>
          <p>Flamivor is preparing a source-checked impact report. We will publish figures, dates, definitions, and the supporting chart only once they can be responsibly verified.</p>
        </div>
      </section>

      <section className="impact-closing"><div><p className="impact-eyebrow">Still in motion</p><h2>Access is not a finish line.<br />It is something we <em>pass on.</em></h2></div><a href="mailto:flamivor@gmail.com">Partner with Flamivor <ArrowDownRight size={18} aria-hidden="true" /></a></section>
    </main>
  )
}
