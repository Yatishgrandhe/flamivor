import Image from "next/image";
export function Brand({ footer = false }: { footer?: boolean }) {
  return <span className={`brand ${footer ? "brand-footer" : ""}`}><span className="brand-image"><Image src="/images/flamivor-logo-approved.png" width={252} height={166} alt="Flamivor phoenix logo" priority={!footer} /></span><span className="brand-location">CHARLOTTE</span></span>;
}
