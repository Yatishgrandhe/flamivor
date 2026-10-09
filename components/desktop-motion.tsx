"use client";

import { useEffect } from "react";
import { usePageTransition } from "@/components/page-transitions";

/** Desktop-only scroll motion, scoped to the homepage and cleared on route changes. */
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
        const communityHero = scope.querySelector(".community-hero");
        const heroPhoto = scope.querySelector(".hero-photo-parallax");
        if (communityHero && heroPhoto) {
          gsap.fromTo(
            heroPhoto,
            { y: 36 },
            {
              y: -36,
              ease: "none",
              scrollTrigger: {
                trigger: communityHero,
                start: "top 96px",
                end: "bottom top",
                scrub: 0.5,
              },
            },
          );
        }

        const mission = scope.querySelector(".mission-section");
        const missionPhoto = scope.querySelector(".mission-photo");
        if (mission && missionPhoto) {
          gsap.fromTo(
            missionPhoto,
            { y: 36 },
            {
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: mission,
                start: "top 85%",
                end: "center 50%",
                scrub: 0.5,
              },
            },
          );
        }

        scope.querySelectorAll<HTMLElement>(".journey-chapter").forEach((chapter) => {
          const display = chapter.querySelector<HTMLElement>(".journey-display h3");
          const copy = chapter.querySelector<HTMLElement>(".journey-copy");
          const scrollTrigger = {
            trigger: chapter,
            start: "top 85%",
            end: "top 45%",
            scrub: 0.4,
          };

          if (display) {
            gsap.fromTo(
              display,
              { y: 20 },
              { y: 0, ease: "none", scrollTrigger },
            );
          }
          if (copy) {
            gsap.fromTo(
              copy,
              { y: 24 },
              { y: 0, ease: "none", scrollTrigger },
            );
          }
        });

        scope
          .querySelectorAll<HTMLElement>(".home-guide-entry")
          .forEach((entry, index) => {
            gsap.fromTo(
              entry,
              { y: 24 },
              {
                y: 0,
                duration: 0.6,
                delay: index * 0.1,
                ease: "power2.out",
                immediateRender: false,
                scrollTrigger: {
                  trigger: entry,
                  start: "top 88%",
                  once: true,
                },
              },
            );
          });

        const peopleImage = scope.querySelector(".people-image");
        const peoplePhoto = peopleImage?.querySelector("img");
        if (peopleImage && peoplePhoto) {
          gsap.fromTo(
            peoplePhoto,
            { scale: 1.06 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: peopleImage,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            },
          );
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
