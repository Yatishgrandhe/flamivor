"use client";
import { useEffect } from "react";
/** Scroll Craft scene score, scoped to React and removed on mobile or route changes. */
export function DesktopMotion() {
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let dispose: (() => void) | undefined;
    let generation = 0;
    async function setup() {
      const current = ++generation;
      dispose?.(); dispose = undefined;
      if (!media.matches) return;
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (current !== generation || !media.matches) return;
      gsap.registerPlugin(ScrollTrigger);
      const scope = document.querySelector("#home-content");
      if (!scope) return;
      const ctx = gsap.context(() => {
        gsap.to(".phoenix-scene img", {y:-90,rotation:4,scale:1.04,ease:"none",scrollTrigger:{trigger:".campaign-hero",start:"top 96px",end:"bottom top",scrub:0.6}});
        gsap.to(".campaign-copy h1", {y:28,ease:"none",scrollTrigger:{trigger:".campaign-hero",start:"top 96px",end:"bottom top",scrub:0.6}});
        gsap.from(".mission-emphasis",{y:24,scrollTrigger:{trigger:".mission-content",start:"top 78%",end:"center 50%",scrub:true}});
        gsap.from(".journey-line span",{scaleY:0,ease:"none",scrollTrigger:{trigger:".participation-journey",start:"top 65%",end:"bottom 55%",scrub:0.4}});
        gsap.utils.toArray<HTMLElement>(".journey-chapter").forEach((chapter) => {
          gsap.from(chapter.querySelector(".journey-display h3"),{x:-48,ease:"none",scrollTrigger:{trigger:chapter,start:"top 85%",end:"top 40%",scrub:.4}});
          gsap.from(chapter.querySelector(".journey-copy"),{y:40,ease:"none",scrollTrigger:{trigger:chapter,start:"top 85%",end:"top 40%",scrub:.4}});
        });
        gsap.from(".resource-card",{y:48,rotation:2,stagger:.08,duration:.7,scrollTrigger:{trigger:".resource-grid",start:"top 85%",once:true}});
        gsap.from(".invitation h2",{y:60,ease:"none",scrollTrigger:{trigger:".invitation",start:"top 90%",end:"top 45%",scrub:.4}});
      },scope);
      document.documentElement.dataset.desktopMotion="active";
      dispose=()=>{ctx.revert();delete document.documentElement.dataset.desktopMotion;};
    }
    void setup(); media.addEventListener("change",setup);
    return()=>{++generation;media.removeEventListener("change",setup);dispose?.();};
  },[]);
  return null;
}
