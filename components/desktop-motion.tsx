"use client";

import { useEffect } from "react";
import { usePageTransition } from "@/components/page-transitions";

/** Subtle desktop scroll motion, scoped to the homepage and cleared on route changes. */
export function DesktopMotion() {
  const { isTransitioning, revealKey } = usePageTransition();

  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let dispose: (() => void) | undefined;
    let generation = 0;

    async function setup() {
      const current = ++generation;
      dispose?.();
      dispose = undefined;

      // The route curtain owns the reveal. Create scroll triggers only after it
      // has cleared, so their initial positions cannot be measured under it.
      if (!media.matches || isTransitioning || revealKey === 0) return;

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (
        current !== generation ||
        !media.matches ||
        isTransitioning ||
        revealKey === 0
      ) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      const scope = document.querySelector<HTMLElement>("#home-content");
      if (!scope) return;

      const ctx = gsap.context(() => {
        const gallery = scope.querySelector(".welcome-gallery");
        const mainPhoto = scope.querySelector(".welcome-photo-inner");
        if (gallery && mainPhoto) {
          gsap.fromTo(mainPhoto, { y: 20 }, {
            y: -20, ease: "none",
            scrollTrigger: { trigger: gallery, start: "top bottom", end: "bottom top", scrub: 0.6 },
          });
          scope.querySelectorAll(".welcome-photo-side").forEach((photo, index) => {
            gsap.fromTo(photo, { y: index === 0 ? 20 : -16 }, {
              y: index === 0 ? -20 : 16, ease: "none",
              scrollTrigger: { trigger: gallery, start: "top bottom", end: "bottom top", scrub: 0.7 },
            });
          });
        }
        const features = scope.querySelector(".participation-features");
        if (features) {
          gsap.fromTo(features, { y: 24 }, {
            y: 0, ease: "none",
            scrollTrigger: { trigger: features, start: "top 90%", end: "top 50%", scrub: 0.5 },
          });
        }

      }, scope);

      document.documentElement.dataset.desktopMotion = "active";
      dispose = () => {
        ctx.revert();
        delete document.documentElement.dataset.desktopMotion;
      };

      // The loader waits for the initial photography and fonts; this refresh
      // catches their final layout before scroll positions are used.
      requestAnimationFrame(() => {
        if (current === generation) ScrollTrigger.refresh();
      });
    }

    void setup();
    media.addEventListener("change", setup);
    return () => {
      ++generation;
      media.removeEventListener("change", setup);
      dispose?.();
    };
  }, [isTransitioning, revealKey]);

  return null;
}
