import './ResourcesPage.css'

const resources = [
  {
    title: 'Study Flashcards',
    image: 'https://static.wixstatic.com/media/01afaa_28f339f2acbb41eab59c985e82bc7ecd~mv2.png',
    alt: 'Flamivor Chemistry Resources study flashcards cover',
  },
  {
    title: 'Mini Lessons',
    image: 'https://static.wixstatic.com/media/01afaa_8ab67555fcaf48d0a665f929a0217876~mv2.png',
    alt: 'Flamivor Biology Resources mini lessons cover',
  },
  {
    title: 'Study Guides',
    image: 'https://static.wixstatic.com/media/01afaa_018ede2ec32541e18cb927efe317c46c~mv2.png',
    alt: 'Flamivor Physics Resources study guides cover',
  },
  {
    title: 'Educational Kits',
    image: 'https://static.wixstatic.com/media/01afaa_d806a3a38260410089a1177657cc3b74~mv2.png',
    alt: 'Flamivor Math Resources educational kits cover',
  },
]

export default function ResourcesPage() {
  return (
    <main className="resources-page" aria-label="Resources">
      <section className="resources-shelf">
        <div className="resources-cover-grid">
          {resources.map((resource) => (
            <figure className="resource-shelf-card" key={resource.title}>
              <img src={resource.image} alt={resource.alt} width="1080" height="1080" loading="lazy" />
              <figcaption>
                <strong>{resource.title}</strong>
                <small>Coming soon</small>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  )
}
