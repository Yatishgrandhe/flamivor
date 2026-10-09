"use client";

import { usePathname } from "next/navigation";

export function SiteChrome({ header, footer, children }: {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const path = usePathname();
  const workspace = /^\/(dashboard|sign-in|sign-up)(\/|$)/.test(path);
  return <>{!workspace && header}{children}{!workspace && footer}</>;
}
