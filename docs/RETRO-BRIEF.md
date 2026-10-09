# Restrained retro redesign

Latest user authority: use a retro UI library, then reduce heavy bolding and prohibit AI imagery. Previous generated concepts are rejected and will not be used.

Library: https://retroui.dev redirects to https://neobrutalism.com. Official Radix Button/Card registry items installed using shadcn CLI; source targets retargeted to components/retro without overwriting member primitives. Review and adapt tokens, weights, motion and accessible target sizes. Docs: https://neobrutalism.com/docs/installation and /docs/components/button, /docs/components/card.

Research: ten official nonprofit homepages inspected for content hierarchy; six visually viewed (charity: water, Pencils of Promise, Teach for America, Khan Academy, Reading Partners, Girls Who Code). See NONPROFIT-RESEARCH.md for six independent content analyses. Learn clear purpose/action paths and useful resource-first proof; do not import global claims, brand visuals or imagery.

Direction: regular Literata with quiet Manrope; cream ground, exact red nav and actions, warm black copy. Framed real Unsplash photo below a compact editorial opening, adjacent practical-guide feature in an actual library Card. Keep current logo byte-identical. Thin outlines and very small offsets add retro detail without an aggressive poster treatment. All public pages share the vocabulary; auth and member flows preserve task clarity.

Todo
- [x] Research official sites and real retro library
- [x] Record latest correction and product truth
- [x] Build public layouts with actual retro components
- [x] Adapt desktop-only animation
- [x] Desktop/mobile interactions and visual review
- [x] Build, typecheck, lint and fresh agent review
- [x] Commit, sync, verify Ready Vercel production

## Release verification

- Production build compiled all 18 routes; typecheck and oxlint passed.
- Browser widths 360/390/768/1280/1440px had no horizontal overflow on the checked surfaces. Home, About, Team, Join, guide listing and custom sign-in were checked; home screenshots output/retro/desktop.jpg and mobile.jpg. Physical device testing was not performed.
- Public h1/h2/h3 and prose computed weight 400 (general public utility titles may use 500); retro controls 500. Original logo SHA256 b86edf707dcef60c3aac29dab7c3c34604e42015de2ee6746e19265c6da5faf2 is unchanged.
- Phone menu opens/closes; Escape returns focus. Guide search empty state/reset and category filtering work. Saving a guide carries save=study-reset through the dashboard and custom sign-in redirect. No authentication email was submitted during this UI pass.
- All three real Unsplash photographs loaded after scrolling, with no photo fallback. No generated imagery is used. Desktop GSAP movement was observed (+2px near top to -18px below); phone/tablet media state was inactive with no image transform. Branded reload curtain and route transitions were observed.
- Fresh GPT-6 Luna reviewer found no release-blocking visual issue in desktop/mobile homepage evidence. Read-only function audit confirmed existing real Clerk/Convex implementation remains intact. Production Clerk instance setup remains pending; no full account round trip was claimed.
- The primary flamivor-charlotte project had 19 Ready entries before release. A later GitHub status check exposed failures in the separate legacy flamivor project; it was missing Clerk/Convex environment configuration and still selected Vite. Restored the same application’s required production settings and corrected its framework to Next.js. Existing unrelated legacy variables were preserved. Restarted production and verified Ready, then verified the new home UI on both live aliases.

## Production evidence

UI commit: 9460da3. Primary deployment dpl_5xhFNuDeQjLVtDHA3u8uvxaPmtAb is Ready at https://flamivor-charlotte.vercel.app. Repaired legacy deployment dpl_5NTf86Uj6JoXEQSYAUpKD8dyDg2x is Ready at https://flamivor.vercel.app. No failed deployment history was deleted or hidden. A restart attempted before environment repair completed failed again; the successful restart followed verified configuration.

Native browser production captures: output/retro/production-desktop.jpg at 1280×720 and production-mobile.jpg at 390×844. Desktop heading weight is 400; navbar computes rgb(138, 1, 3), exact #8A0103. Production phone overflow is zero and desktop motion is inactive with transform none.

Impeccable triage: no anti-pattern failures; 34 advisory font-size notes remain because the detector reads a limited frontmatter ramp while the actual authored type steps and their roles are documented in DESIGN.md. They are intentional type choices, not regressions, and no new detector ignore was added. The previous narrow Space Grotesk exception for the retained member interface remains. No Anton usage remains. Sidecar schema 2 was refreshed from the actual interface and validated.
