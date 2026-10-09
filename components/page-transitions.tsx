"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  type MouseEvent,
  useContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type TransitionPhase =
  | "idle"
  | "boot"
  | "covering"
  | "navigating"
  | "revealing"
  | "failed";
type TransitionSource =
  | "initial"
  | "link"
  | "history"
  | "programmatic"
  | "keyboard"
  | "idle";

const DESKTOP_COVER_MS = 700;
const MOBILE_COVER_MS = 560;
const REVEAL_MS = 300;
const INITIAL_FALLBACK_MS = 4_500;
const ROUTE_FALLBACK_MS = 8_000;

type PageTransitionState = {
  isTransitioning: boolean;
  revealKey: number;
};

const PageTransitionContext = createContext<PageTransitionState>({
  isTransitioning: false,
  revealKey: 0,
});

// The provider and its context hook intentionally share one Fast Refresh boundary.
// oxlint-disable-next-line react/only-export-components
export function usePageTransition() {
  return useContext(PageTransitionContext);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function coverDuration() {
  if (prefersReducedMotion()) return 0;
  return window.matchMedia("(max-width: 767px)").matches
    ? MOBILE_COVER_MS
    : DESKTOP_COVER_MS;
}

function pageName(pathname: string) {
  const segment = pathname.split("/").filter(Boolean).at(-1);
  if (!segment) return "home";
  return decodeURIComponent(segment)
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function waitForImage(image: HTMLImageElement, signal: AbortSignal) {
  if (image.complete) return Promise.resolve();
  return new Promise<void>((resolve) => {
    const done = () => resolve();
    image.addEventListener("load", done, { once: true, signal });
    image.addEventListener("error", done, { once: true, signal });
    signal.addEventListener("abort", done, { once: true });
  });
}

async function waitForInitialReadiness(signal: AbortSignal) {
  if (document.readyState !== "complete") {
    await new Promise<void>((resolve) => {
      window.addEventListener("load", () => resolve(), { once: true, signal });
    });
  }

  const criticalImages = Array.from(
    document.querySelectorAll<HTMLImageElement>(
      'img:not([loading="lazy"]), img[fetchpriority="high"]',
    ),
  );
  const fontReadiness = document.fonts?.ready ?? Promise.resolve();
  await Promise.all([
    fontReadiness,
    ...criticalImages.map((image) => waitForImage(image, signal)),
  ]);
}

async function waitForIntroAnimation(
  curtain: HTMLElement | null,
  signal: AbortSignal,
) {
  await new Promise<void>((resolve) => {
    const frame = window.requestAnimationFrame(() => resolve());
    signal.addEventListener(
      "abort",
      () => {
        window.cancelAnimationFrame(frame);
        resolve();
      },
      { once: true },
    );
  });

  if (!curtain || signal.aborted) return;
  const animations = curtain
    .getAnimations({ subtree: true })
    .map((animation) => animation.finished.catch(() => undefined));
  await Promise.all(animations);
}

export function PageTransitions({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<TransitionPhase>("boot");
  const [curtainKey, setCurtainKey] = useState(0);
  const [revealKey, setRevealKey] = useState(0);
  const [transitionKind, setTransitionKind] = useState<"initial" | "route">(
    "initial",
  );
  const [routePending, setRoutePending] = useState(false);
  const [status, setStatus] = useState("Preparing the Charlotte chapter");
  const [targetHref, setTargetHref] = useState<string | null>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const retryRef = useRef<HTMLButtonElement>(null);
  const originLinkRef = useRef<HTMLAnchorElement | null>(null);
  const pendingFocusRef = useRef<"main" | "origin" | null>(null);
  const targetRef = useRef<string | null>(null);
  const pathnameRef = useRef(pathname);
  const hrefRef = useRef<string | null>(null);
  const phaseRef = useRef(phase);
  const sourceRef = useRef<TransitionSource>("initial");
  const uncoveredPendingRouteRef = useRef(false);
  const uncoveredPathRef = useRef<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const routeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const changePhase = useCallback((next: TransitionPhase) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  useEffect(() => {
    phaseRef.current = phase;
    const reducedMotion = prefersReducedMotion();
    if (shellRef.current) {
      shellRef.current.inert = phase !== "idle" && !reducedMotion;
    }

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    if (phase !== "idle" && !reducedMotion) root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previousOverflow;
    };
  }, [phase]);

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (routeTimerRef.current) clearTimeout(routeTimerRef.current);
    timerRef.current = null;
    routeTimerRef.current = null;
  }, []);

  const finishReveal = useCallback(() => {
    clearTimers();
    changePhase("revealing");
    timerRef.current = setTimeout(() => {
      changePhase("idle");
      setRevealKey((value) => value + 1);
      setRoutePending(false);
      setTargetHref(null);
      targetRef.current = null;
      sourceRef.current = "idle";
      timerRef.current = null;
    }, prefersReducedMotion() ? 0 : REVEAL_MS);
  }, [changePhase, clearTimers]);

  useEffect(() => {
    if (prefersReducedMotion()) {
      const frame = window.requestAnimationFrame(() => {
        changePhase("idle");
        setRevealKey((value) => value + 1);
      });
      return () => window.cancelAnimationFrame(frame);
    }

    let active = true;
    const readinessController = new AbortController();
    let timeout: ReturnType<typeof setTimeout> | null = null;
    timeout = setTimeout(() => {
      if (!active) return;
      active = false;
      setStatus("The page is taking longer than expected. Opening what is ready.");
      finishReveal();
    }, INITIAL_FALLBACK_MS);

    void Promise.all([
      waitForInitialReadiness(readinessController.signal).catch(() => undefined),
      waitForIntroAnimation(curtainRef.current, readinessController.signal).catch(
        () => undefined,
      ),
    ]).then(() => {
      if (!active) return;
      if (timeout) clearTimeout(timeout);
      finishReveal();
    });

    return () => {
      active = false;
      readinessController.abort();
      if (timeout) clearTimeout(timeout);
      clearTimers();
    };
  }, [changePhase, clearTimers, finishReveal]);

  useEffect(() => {
    hrefRef.current = window.location.href;
  }, []);

  useEffect(() => {
    if (pathnameRef.current === pathname) return;
    pathnameRef.current = pathname;
    hrefRef.current = window.location.href;
    if (uncoveredPendingRouteRef.current) {
      if (pathname === uncoveredPathRef.current) {
        uncoveredPendingRouteRef.current = false;
        uncoveredPathRef.current = null;
        if (phaseRef.current === "idle") {
          pendingFocusRef.current = "main";
          setRoutePending(false);
          setTargetHref(null);
          targetRef.current = null;
        }
        return;
      }
      uncoveredPendingRouteRef.current = false;
      uncoveredPathRef.current = null;
    }
    if (sourceRef.current === "keyboard") {
      const keyboardTargetPath = targetRef.current
        ? new URL(targetRef.current).pathname
        : null;
      sourceRef.current = "idle";
      targetRef.current = null;
      if (pathname === keyboardTargetPath) {
        pendingFocusRef.current = "main";
        return;
      }
    }
    if (phaseRef.current === "idle") {
      if (prefersReducedMotion()) return;
      const frame = window.requestAnimationFrame(() => {
        if (phaseRef.current !== "idle") return;
        pendingFocusRef.current = "main";
        sourceRef.current = "programmatic";
        targetRef.current = window.location.href;
        setTargetHref(window.location.href);
        setCurtainKey((value) => value + 1);
        setTransitionKind("route");
        setStatus(`Opening ${pageName(pathname)}`);
        changePhase("covering");
        timerRef.current = setTimeout(finishReveal, coverDuration());
      });
      return () => window.cancelAnimationFrame(frame);
    }
    if (phaseRef.current === "boot") return;

    if (sourceRef.current === "history" && targetRef.current) {
      const expectedPath = new URL(targetRef.current).pathname;
      if (pathname !== expectedPath) return;
      pendingFocusRef.current = "main";
      if (phaseRef.current === "covering") return;
    }

    if (routeTimerRef.current) clearTimeout(routeTimerRef.current);
    routeTimerRef.current = null;
    setRoutePending(false);
    pendingFocusRef.current = "main";
    finishReveal();
  }, [changePhase, finishReveal, pathname]);

  useEffect(() => {
    if (phase === "covering") {
      statusRef.current?.focus({ preventScroll: true });
    }
    if (phase === "failed") {
      retryRef.current?.focus({ preventScroll: true });
    }
  }, [curtainKey, phase]);

  useEffect(() => {
    if (phase !== "idle" || !pendingFocusRef.current) return;
    const frame = window.requestAnimationFrame(() => {
      const focusTarget =
        pendingFocusRef.current === "origin" && originLinkRef.current?.isConnected
          ? originLinkRef.current
          : document.querySelector<HTMLElement>("main#main, main");
      if (focusTarget) {
        if (!focusTarget.hasAttribute("tabindex")) {
          focusTarget.setAttribute("tabindex", "-1");
        }
        focusTarget.focus({ preventScroll: true });
      }
      pendingFocusRef.current = null;
    });
    return () => window.cancelAnimationFrame(frame);
  }, [phase, pathname]);

  useEffect(() => {
    const onPopState = () => {
      const currentHref = new URL(window.location.href);
      const previousHref = hrefRef.current
        ? new URL(hrefRef.current)
        : currentHref;
      hrefRef.current = currentHref.href;
      if (
        currentHref.pathname === previousHref.pathname &&
        currentHref.search === previousHref.search
      ) {
        if (
          phaseRef.current !== "idle" &&
          sourceRef.current !== "initial"
        ) {
          clearTimers();
          setRoutePending(false);
          setTargetHref(null);
          targetRef.current = null;
          sourceRef.current = "idle";
          changePhase("idle");
        }
        return;
      }
      if (prefersReducedMotion()) return;
      const phaseAtPop = phaseRef.current;
      const canRebaseActiveRoute =
        sourceRef.current !== "initial" &&
        (phaseAtPop === "covering" ||
          phaseAtPop === "navigating" ||
          phaseAtPop === "failed");
      if (
        phaseAtPop !== "idle" &&
        !canRebaseActiveRoute
      ) {
        return;
      }
      clearTimers();
      setRoutePending(false);
      const pathChanged = currentHref.pathname !== pathnameRef.current;
      targetRef.current = window.location.href;
      setTargetHref(window.location.href);
      sourceRef.current = "history";
      setCurtainKey((value) => value + 1);
      setTransitionKind("route");
      setStatus(`Opening ${pageName(currentHref.pathname)}`);
      changePhase("covering");
      timerRef.current = setTimeout(() => {
        if (
          pathChanged &&
          currentHref.pathname === pathnameRef.current
        ) {
          pendingFocusRef.current = "main";
          finishReveal();
          return;
        }
        setRoutePending(pathChanged);
        changePhase("navigating");
        if (pathChanged) {
          routeTimerRef.current = setTimeout(() => {
            setStatus("This page is taking longer than expected.");
            changePhase("failed");
          }, ROUTE_FALLBACK_MS);
        } else {
          finishReveal();
        }
      }, coverDuration());
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [changePhase, clearTimers, finishReveal]);

  useEffect(() => clearTimers, [clearTimers]);

  const beginNavigation = (event: MouseEvent<HTMLDivElement>) => {
    if (
      event.defaultPrevented ||
      phaseRef.current !== "idle" ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const source = event.target;
    if (!(source instanceof Element)) return;
    const link = source.closest<HTMLAnchorElement>("a[href]");
    if (
      !link ||
      link.target ||
      link.hasAttribute("download") ||
      link.relList.contains("external") ||
      link.hasAttribute("data-no-transition")
    ) {
      return;
    }

    const destination = new URL(link.href, window.location.href);
    const current = new URL(window.location.href);
    const isInternal = destination.origin === current.origin;
    const isHashOnly =
      destination.pathname === current.pathname &&
      destination.search === current.search &&
      destination.hash !== current.hash;
    const hasRouteChange = destination.pathname !== current.pathname;
    if (!isInternal || isHashOnly || !hasRouteChange) return;

    if (event.detail === 0) {
      sourceRef.current = "keyboard";
      targetRef.current = destination.href;
      return;
    }

    event.preventDefault();
    originLinkRef.current = link;
    sourceRef.current = "link";
    setTransitionKind("route");
    setCurtainKey((value) => value + 1);
    targetRef.current = destination.href;
    setTargetHref(destination.href);
    setStatus(`Opening ${pageName(destination.pathname)}`);
    changePhase("covering");
    timerRef.current = setTimeout(() => {
      changePhase("navigating");
      setRoutePending(true);
      routeTimerRef.current = setTimeout(() => {
        setStatus("This page is taking longer than expected.");
        changePhase("failed");
      }, ROUTE_FALLBACK_MS);

      try {
        router.push(
          `${destination.pathname}${destination.search}${destination.hash}`,
          { scroll: true },
        );
      } catch {
        if (routeTimerRef.current) clearTimeout(routeTimerRef.current);
        routeTimerRef.current = null;
        setRoutePending(false);
        setStatus("That page could not be opened.");
        changePhase("failed");
      }
    }, coverDuration());
  };

  const retryNavigation = () => {
    if (!targetRef.current) return;
    const target = new URL(targetRef.current);
    setStatus(`Opening ${pageName(target.pathname)}`);
    changePhase("navigating");
    setRoutePending(true);
    if (routeTimerRef.current) clearTimeout(routeTimerRef.current);
    routeTimerRef.current = setTimeout(() => {
      setStatus("This page is still taking longer than expected.");
      changePhase("failed");
    }, ROUTE_FALLBACK_MS);
    router.push(`${target.pathname}${target.search}${target.hash}`, {
      scroll: true,
    });
  };

  const recoverNavigation = () => {
    clearTimers();
    if (routePending) {
      uncoveredPendingRouteRef.current = true;
      uncoveredPathRef.current = targetRef.current
        ? new URL(targetRef.current).pathname
        : null;
      pendingFocusRef.current = "main";
      setRoutePending(false);
      changePhase("idle");
      return;
    }

    pendingFocusRef.current = originLinkRef.current?.isConnected
      ? "origin"
      : "main";
    sourceRef.current = "idle";
    setTargetHref(null);
    targetRef.current = null;
    changePhase("idle");
  };

  const active = phase !== "idle";

  return (
    <PageTransitionContext.Provider
      value={{ isTransitioning: active, revealKey }}
    >
      <div
        ref={shellRef}
        className="page-transition-shell"
        data-transition-phase={phase}
        onClickCapture={beginNavigation}
        aria-busy={active || undefined}
      >
        {children}
      </div>
      {active ? (
        <div
          ref={curtainRef}
          key={curtainKey}
          className="page-transition-curtain"
          data-phase={phase}
          data-kind={transitionKind}
        >
          <div className="page-transition-roundel" aria-hidden="true">
            <svg className="page-transition-rings" viewBox="0 0 100 100">
              <circle
                className="page-transition-ring page-transition-ring-outer"
                cx="50"
                cy="50"
                r="47"
                pathLength="1"
              />
              <circle
                className="page-transition-ring page-transition-ring-inner"
                cx="50"
                cy="50"
                r="41"
                pathLength="1"
              />
            </svg>
            <Image
              className="page-transition-mark"
              src="/images/flamivor-logo-approved.png"
              width={252}
              height={166}
              alt=""
              priority
              unoptimized
            />
          </div>
          <p className="page-transition-location">CHARLOTTE</p>
          <p
            ref={statusRef}
            className="page-transition-status"
            role={phase === "failed" ? "alert" : "status"}
            aria-live={phase === "failed" ? "assertive" : "polite"}
            tabIndex={-1}
          >
            {status}
          </p>
          {phase === "failed" ? (
            <div className="page-transition-actions">
              <button ref={retryRef} type="button" onClick={retryNavigation}>
                Try again
              </button>
              <button type="button" onClick={recoverNavigation}>
                {routePending ? "Continue without animation" : "Stay on this page"}
              </button>
            </div>
          ) : (
            <span className="page-transition-rule" aria-hidden="true" />
          )}
          {targetHref ? (
            <span className="sr-only">Destination: {targetHref}</span>
          ) : null}
        </div>
      ) : null}
      <noscript>
        <style>{`.page-transition-curtain[data-kind="initial"]{display:none!important}`}</style>
      </noscript>
    </PageTransitionContext.Provider>
  );
}
