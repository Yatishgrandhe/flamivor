# Redesign verification plan

Use a fresh production build and inspect the deployed preview in real Chrome. Cover `/`, `/about`, `/team`, `/join`, `/resources`, one resource detail, `/members`, `/sign-in`, `/sign-up`, `/privacy`, and the not-found page.

Check layout at 360×640, 375×812, 768×1024, 1280×800, and 1440×900. On every route, check for horizontal overflow, clipped headings or controls, broken images, usable page spacing below the sticky header, and a visible keyboard focus indicator. Confirm the approved mark is legible with a separate CHARLOTTE label beneath it, and that the only brand fills are exact `#8A0103` and `#F2EFE5`.

Exercise the navigation with keyboard and pointer: skip link, current-page state, mobile menu open/close via Escape and link selection, every internal destination, and the external chapter form link. On `/resources`, change each filter and verify the result count and card links update. On a resource detail page, verify print and save actions; stop at the sign-in prompt and do not create or change member data during this pass.

Inspect desktop scroll motion at 1280×800 and 1440×900 with normal motion enabled, then repeat with reduced motion. Verify the hero and participation sequence remain readable and keyboard-reachable during normal scrolling. On touch-sized and mobile viewports, scroll every page and confirm content remains in natural flow with no scroll-triggered movement. In reduced-motion mode, confirm all decorative animation stops without hiding content.

For `/members`, inspect signed-out loading and sign-in/sign-up redirects without submitting forms or changing saved data. Check labels, fieldset legend, pending/status announcements by source and accessibility tree, and recovery text. Finish with a console and network pass for uncaught errors, missing assets, and unexpected third-party requests.

## Independent review result — 2026-10-08

The supplied desktop and mobile captures show a coherent cream-and-burgundy identity, the approved mark with Charlotte beneath it, readable layouts, and no visible clipping in the captured portions. The initial participation capture showed the “Lead” heading faded during scroll. The fresh `participation-final-desktop.jpg` now shows both “Learn” and “Lead” at full contrast, confirming the issue is resolved in the rendered state. Current `DesktopMotion` source uses translation for meaningful headings and no longer applies page-lifetime `will-change`.

The route, viewport, and interaction checks listed above were reported by the implementation lead; I did not independently rerun the full browser suite. The lead reports no overflow or broken images across the expanded 360×640, 390×844, 768×1024, 1280×720, and 1440×900 checks, plus successful menu focus return, resource search/filter/reset, desktop-to-mobile motion cleanup, and authenticated save/profile/bookmark persistence with test data removed afterward. Build, typecheck, lint, and zero npm audit findings were also reported by the lead. I found no major open source or visual defect; the contrast concern is resolved in the fresh rendered capture.
