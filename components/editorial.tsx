import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
export function PageHeader({ title, description }: { eyebrow?: string; title: React.ReactNode; description: string }) {
  return <section className="page-heading shell"><h1>{title}</h1><p className="page-description">{description}</p></section>;
}
export function Invite() {
  return <section className="invitation shell"><div className="invitation-inner"><div><h2>Make room for what comes next.</h2></div><div className="invite-bottom"><p>Help build more ways for Charlotte students to learn, share skills, and take part.</p><Button asChild><a href={site.form} target="_blank" rel="noreferrer">Get involved <ArrowUpRight data-icon="inline-end" aria-hidden="true" /></a></Button></div></div></section>;
}
export function TextLink({href, children}: {href: string; children: React.ReactNode}) {return <Link className="text-link" href={href}>{children}<ArrowUpRight size={20} aria-hidden="true" /></Link>;}
