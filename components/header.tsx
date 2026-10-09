"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu } from "lucide-react";
import { Brand } from "./brand";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";
import { site } from "@/lib/site";
const links = [
  ["Our mission", "/about"],
  ["Our people", "/team"],
  ["Field guide", "/resources"],
];
export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" aria-label="Flamivor Charlotte home">
          <Brand />
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {links.map(([label, url]) => (
            <Link
              href={url}
              key={url}
              aria-current={path === url ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link className="member-link" href="/dashboard">
            Member space
          </Link>
          <Button asChild variant="inverse" className="join-nav">
            <a href={site.form} target="_blank" rel="noreferrer">
              Get involved <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
            </a>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mobile-menu"
                aria-label="Open navigation"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Flamivor Charlotte</SheetTitle>
                <SheetDescription>
                  Find your place in the chapter.
                </SheetDescription>
              </SheetHeader>
              <nav className="mobile-nav" aria-label="Mobile navigation">
                {[
                  ["Home", "/"],
                  ...links,
                  ["Get involved", "/join"],
                  ["Member space", "/dashboard"],
                ].map(([label, url]) => (
                  <Link key={url} href={url} onClick={() => setOpen(false)}>
                    {label}
                    <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
