"use client";

import { usePageTransition } from "@/components/page-transitions";

export function PageEntrance({ children }: { children: React.ReactNode }) {
  const { isTransitioning, revealKey } = usePageTransition();
  return <div className="page-entrance" data-revealed={!isTransitioning && revealKey > 0}>{children}</div>;
}
