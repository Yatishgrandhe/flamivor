import Image from "next/image";

export default function Loading() {
  return (
    <main
      className="page-transition-curtain page-transition-fallback"
      data-phase="boot"
      data-kind="initial"
      aria-busy="true"
    >
      <div className="page-transition-roundel" aria-hidden="true">
        <svg className="page-transition-rings" viewBox="0 0 100 100">
          <circle
            className="page-transition-ring page-transition-ring-outer"
            cx="50"
            cy="50"
            r="47"
            pathLength="1"
          />
          <circle
            className="page-transition-ring page-transition-ring-inner"
            cx="50"
            cy="50"
            r="41"
            pathLength="1"
          />
        </svg>
        <Image
          className="page-transition-mark"
          src="/images/flamivor-logo-approved.png"
          width={252}
          height={166}
          alt=""
          priority
          unoptimized
        />
      </div>
      <p className="page-transition-location">CHARLOTTE</p>
      <p className="page-transition-status" role="status" aria-live="polite">
        Opening the Charlotte chapter
      </p>
      <span className="page-transition-rule" aria-hidden="true" />
    </main>
  );
}
