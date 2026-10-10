# Mobbin and shadcn redesign — October 10, 2026

## Direction and references

The public Mobbin education gallery was inspected in a browser:
https://mobbin.com/explore/sites/categories/education

The Sana photographic hero was opened and viewed:
https://mobbin.com/explore/sections/dc761b25-06c2-4a62-8dcb-991f3f7b95ee

Its people-first photography and open composition informed a three-photo opening for Flamivor, adapted to the actual chapter content. No reference artwork, proprietary screens, invented impact metrics, or AI photos were copied into the website. Existing real photo assets and the approved logo are preserved.

shadcn's official Radix Button, Card, Accordion, Separator and Sheet docs were consulted. Card and Accordion were added through the shadcn CLI; its generated utility imports were corrected to the existing project alias. Public actions now use the existing shadcn Button rather than the previous retro wrapper. The guide cards use CardHeader, CardTitle and CardDescription. FAQ uses Radix keyboard-operable Accordion. Mobile navigation remains a Sheet with focus return.

## Implementation

- New centered editorial opening, asymmetric photograph strip, mission, participation features, guide shelf, named leadership, FAQ and invitation.
- About, Team and Join layouts rebuilt with matching hierarchy, shell and shadcn cards.
- Auth/member styling aligned: regular Literata headings, lighter Manrope controls, consistent rounded frames and no hard offset shadows.
- Shared exact brand palette and logo preserved; Supreeth Annand remains Treasurer.
- All general membership actions retain the verified chapter form, not the treasurer form.
- Desktop photo and participation scroll motion respects pointer, width and reduced-motion gates. Mobile scroll effects are disabled.
- DESIGN.md and the local Impeccable sidecar refreshed. No new design audit suppressions added.

## Validation

Production build, lint, typecheck and diff whitespace checks passed. Logo SHA-256 unchanged: b86edf707dcef60c3aac29dab7c3c34604e42015de2ee6746e19265c6da5faf2.

Real browser checks at 375px, 768px and 1280px: no horizontal overflow; three hero photos load; mobile/tablet scroll animation gate disabled and desktop active; guide cards have equal heights in their desktop/tablet row; FAQ opens; mobile Sheet closes with Escape and restores focus; guide search reduces results correctly. Sign-in page renders without overflow. No actual member account or email flow was submitted. Existing Clerk development instance configuration remains outside this visual change.

An independent GPT-6 Luna source review identified the guide-card composition inconsistency; it was corrected. Browser QA caught an undefined font variable on secondary pages; it was corrected to the installed font families.

Supplemental React Doctor scan reported 19 existing architectural/style diagnostics (59/100); this is not a clean Doctor result. Its timer-cleanup error points to the unchanged route-transition effect: the popstate listener is removed in that effect and shared timers are cleared by the separate unmount cleanup. No diagnostic suppressions were added, and unrelated auth/backend architecture was not rewritten for this visual task.
