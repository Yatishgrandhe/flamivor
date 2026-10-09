// Adapted from Bklit UI's Ring Chart pattern.
// https://bklit.com/docs/components/ring-chart
export default function BklitResourceStatus({ resources }) {
  const total = resources.length
  const available = resources.filter((resource) => resource.status === 'Available').length
  const comingSoon = total - available
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const progress = total ? (available / total) * circumference : 0

  return (
    <aside className="resource-status" aria-labelledby="resource-status-title">
      <div className="resource-status-ring" role="img" aria-label={`${available} of ${total} listed resource collections are available now; ${comingSoon} are coming soon.`}>
        <svg viewBox="0 0 112 112" aria-hidden="true">
          <circle className="resource-status-track" cx="56" cy="56" r={radius} />
          <circle className="resource-status-value" cx="56" cy="56" r={radius} strokeDasharray={`${progress} ${circumference - progress || circumference}`} />
        </svg>
        <span><strong>{available}</strong><small>of {total}</small></span>
      </div>
      <div>
        <p className="resource-status-label">Catalog status</p>
        <h2 id="resource-status-title">Four study formats, being prepared with care.</h2>
        <dl className="resource-status-legend" aria-label="Resource catalog legend">
          <div><dt><i className="resource-status-dot available" />Available</dt><dd>{available}</dd></div>
          <div><dt><i className="resource-status-dot soon" />Coming soon</dt><dd>{comingSoon}</dd></div>
        </dl>
      </div>
      <table className="visually-hidden">
        <caption>Resource catalog status</caption>
        <tbody><tr><th>Available</th><td>{available}</td></tr><tr><th>Coming soon</th><td>{comingSoon}</td></tr></tbody>
      </table>
    </aside>
  )
}
