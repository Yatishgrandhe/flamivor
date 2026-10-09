import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
export function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: React.ReactNode; description: string }) {
  return <section className="page-heading shell"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-description">{description}</p></section>;
}
export function Invite() {
  return <section className="invitation"><div className="shell invitation-inner"><div><h2>Let's build<br />what's next.</h2></div><div className="invite-bottom"><p>Share what you know.<br />Explore what you don&apos;t.<br />Help Charlotte move forward.</p><Button asChild variant="inverse"><a href={site.form} target="_blank" rel="noreferrer">Get involved <ArrowUpRight data-icon="inline-end" aria-hidden="true" /></a></Button></div></div></section>;
}
export function TextLink({href, children}: {href: string; children: React.ReactNode}) {return <Link className="text-link" href={href}>{children}<ArrowUpRight size={20} aria-hidden="true" /></Link>;}
