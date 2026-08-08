import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import './Gallery.css'

const moments = [
  { src: 'https://images.unsplash.com/photo-1503428593586-e225b39bddfe?auto=format&fit=crop&w=1200&q=84', alt: 'Students listening together during an outdoor learning session', caption: 'Learning is a conversation.' },
  { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=84', alt: 'Students collaborating at a table with notebooks and laptops', caption: 'Shared work, shared momentum.' },
  { src: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=84', alt: 'Students working on a science project in a laboratory', caption: 'Questions deserve room to grow.' },
  { src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=84', alt: 'Students studying together with laptops', caption: 'Tools made to be passed on.' },
  { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=84', alt: 'A group working together around a table', caption: 'A circle makes space for more voices.' },
  { src: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=84', alt: 'Students gathering at a school event', caption: 'Every learner deserves an open door.' },
]

export default function Gallery() {
  const dialogRef = useRef(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !selected) return undefined
    if (!dialog.open) dialog.showModal()
    const close = () => setSelected(null)
    dialog.addEventListener('close', close)
    return () => dialog.removeEventListener('close', close)
  }, [selected])

  const closeDialog = () => dialogRef.current?.close()

  return (
    <section className="gallery-section" aria-labelledby="gallery-heading">
      <div className="gallery-intro">
        <div><p className="gallery-eyebrow">The field notes</p><h2 id="gallery-heading">A record of learning<br />in <em>motion.</em></h2></div>
        <p>Small moments show what accessible learning can look like: students making, asking, and sharing what they discover.</p>
      </div>
      <div className="gallery-contact-sheet">
        {moments.map((moment, index) => (
          <button key={moment.src} type="button" className={`gallery-photo gallery-photo-${index + 1}`} onClick={() => setSelected(moment)}>
            <img src={moment.src} alt={moment.alt} width="1200" height="800" loading="lazy" />
            <span><b>0{index + 1}</b>{moment.caption}<ArrowUpRight size={16} aria-hidden="true" /></span>
          </button>
        ))}
      </div>
      <div className="gallery-press-note"><p className="gallery-eyebrow">Press index</p><p>Official recognitions and partner stories are being compiled. For media or partnership enquiries, please contact the Flamivor team.</p><a href="mailto:flamivor@gmail.com">Contact Flamivor <ArrowUpRight size={17} aria-hidden="true" /></a></div>
      <dialog ref={dialogRef} className="gallery-dialog" aria-labelledby="gallery-dialog-caption">
        {selected && <div className="gallery-dialog-content"><button type="button" className="gallery-dialog-close" onClick={closeDialog} aria-label="Close image detail" autoFocus><X size={20} aria-hidden="true" /></button><img src={selected.src} alt={selected.alt} width="1200" height="800" /><p id="gallery-dialog-caption">{selected.caption}</p></div>}
      </dialog>
    </section>
  )
}
