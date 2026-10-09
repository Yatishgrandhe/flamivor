import { useMemo, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, BookOpenCheck, Search } from 'lucide-react'
import BklitResourceStatus from '../components/BklitResourceStatus'
import './ResourcesPage.css'

const resources = [
  {
    title: 'Study Flashcards',
    category: 'Recall',
    status: 'Coming soon',
    image: 'https://static.wixstatic.com/media/01afaa_28f339f2acbb41eab59c985e82bc7ecd~mv2.png',
    alt: 'Flamivor Chemistry Resources study flashcards cover',
  },
  {
    title: 'Mini Lessons',
    category: 'Explain',
    status: 'Coming soon',
    image: 'https://static.wixstatic.com/media/01afaa_8ab67555fcaf48d0a665f929a0217876~mv2.png',
    alt: 'Flamivor Biology Resources mini lessons cover',
  },
  {
    title: 'Study Guides',
    category: 'Plan',
    status: 'Coming soon',
    image: 'https://static.wixstatic.com/media/01afaa_018ede2ec32541e18cb927efe317c46c~mv2.png',
    alt: 'Flamivor Physics Resources study guides cover',
  },
  {
    title: 'Educational Kits',
    category: 'Make',
    status: 'Coming soon',
    image: 'https://static.wixstatic.com/media/01afaa_d806a3a38260410089a1177657cc3b74~mv2.png',
    alt: 'Flamivor Math Resources educational kits cover',
  },
]

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const categories = ['All', ...resources.map((resource) => resource.category)]
  const visibleResources = useMemo(() => (
    selectedCategory === 'All' ? resources : resources.filter((resource) => resource.category === selectedCategory)
  ), [selectedCategory])

  return (
    <main className="resources-page" aria-label="Resources">
      <section className="resources-hero" aria-labelledby="resources-heading">
        <div className="resources-hero-copy">
          <p className="resources-eyebrow"><BookOpenCheck size={15} aria-hidden="true" /> The open library</p>
          <h1 id="resources-heading">Study tools that make the next step <em>clearer.</em></h1>
          <p>Flamivor’s student-made collection is being assembled as a practical library: small tools to explain, recall, plan, and make.</p>
          <a href="#resource-catalog" className="resources-scroll-link">Browse the catalog <ArrowDownRight size={18} aria-hidden="true" /></a>
        </div>
        <BklitResourceStatus resources={resources} />
      </section>

      <section className="resources-shelf" id="resource-catalog" aria-labelledby="catalog-heading">
        <div className="resources-shelf-heading">
          <div><p className="resources-eyebrow">Find your foothold</p><h2 id="catalog-heading">A small library,<br />made to travel.</h2></div>
          <p>Every collection below is listed as it is currently available. We will link each item once it is ready for learners to use.</p>
        </div>
        <div className="resource-filter" role="group" aria-label="Filter resource collections">
          <Search size={16} aria-hidden="true" />
          {categories.map((category) => {
            const selected = category === selectedCategory
            return <button key={category} type="button" aria-pressed={selected} className={selected ? 'is-selected' : ''} onClick={() => setSelectedCategory(category)}>
              <span>{category}</span>
            </button>
          })}
        </div>
        <div className="resources-cover-grid kokonut-carousel-cards" aria-live="polite">
          {visibleResources.map((resource) => (
            <figure className="resource-shelf-card" key={resource.title}>
              <div className="resource-cover-wrap"><img src={resource.image} alt={resource.alt} width="1080" height="1080" loading="lazy" /><span>{resource.category}</span></div>
              <figcaption>
                <strong>{resource.title}</strong>
                <small>{resource.status}</small>
                <p>Listed in Flamivor’s resource catalog.</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="resource-catalog-note">Availability is shown plainly so learners never arrive at a tool that is not ready yet. <ArrowUpRight size={15} aria-hidden="true" /></p>
      </section>
    </main>
  )
}
