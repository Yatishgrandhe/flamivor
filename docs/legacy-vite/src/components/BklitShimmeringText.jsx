export default function BklitShimmeringText({ text, className = '' }) {
  return (
    <span className={`bklit-shimmering-text ${className}`} aria-label={text}>
      {text.split('').map((char, index) => (
        <span key={`${char}-${index}`} aria-hidden="true">{char === ' ' ? '\u00a0' : char}</span>
      ))}
    </span>
  )
}
