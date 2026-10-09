import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
export function Footer() {
  return <footer className="site-footer"><div className="shell"><div className="footer-top"><Link href="/" className="footer-wordmark">FLAMIVOR<span>CHARLOTTE</span></Link><p>Youth-led education.<br />Rooted in our city.</p><nav aria-label="Footer navigation"><Link href="/about">Our mission</Link><Link href="/team">Our people</Link><Link href="/resources">Field guide</Link><Link href="/join">Get involved</Link><Link href="/members">Member space</Link></nav><a className="instagram-link" href={site.instagram} target="_blank" rel="noreferrer">Follow the chapter<ArrowUpRight size={20} aria-hidden="true" /><span>@flamivor.charlotte</span></a></div><div className="footer-city" aria-hidden="true">CHARLOTTE.</div><div className="footer-bottom"><span>© {new Date().getFullYear()} Flamivor Charlotte</span><span>North Carolina, United States</span><Link href="/privacy">Privacy & your information</Link></div></div></footer>;
}
