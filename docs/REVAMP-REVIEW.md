# Flamivor Charlotte redesign review, October 8, 2026

## Outcome
Live production: https://flamivor-charlotte.vercel.app/ . Final deployment completed successfully. Delivered page verified at 1440×900 and 390×844: logo and hero images loaded, navbar RGB 138/1/3, one H1, no horizontal overflow. Desktop motion active; mobile motion disabled. Screenshots saved in output/revamp-qa/home-live-desktop.jpg and home-live-mobile.jpg.

Campaign/publication direction replaces the collage template. Official supplied logo file remains unchanged. CHARLOTTE is now real text. Colors remain #8A0103 and #F2EFE5. New hero art is an explicitly illustrative papercraft phoenix emerging from books; it is not a replacement mark.

Four GPT-6 Luna specialist roles reviewed direction, secondary pages, functional flows, and independent quality. Root integrated the shared system and repaired findings. Final design review also inspected actual saved screenshots.

## Changes
- Replaced accumulated CSS overrides with one coherent shared design system.
- Locally hosted Anton display typography with Manrope prose and Space Grotesk labels.
- New homepage with concrete chapter purpose, three contribution paths, usable guides, confirmed local roster and open Treasurer role.
- Rebuilt About, People, Join, Privacy and styled resources/articles/member/auth surfaces.
- Search plus category filters, reset/empty state and live result count.
- Guide save intent persists through sign-in; authenticated member component makes one idempotent save attempt and announces its result. No false completion labels.
- Desktop choreography: differential hero planes; mission lift; route line drawn through contribution chapters; publication cover entrances; closing typography. Mobile, touch, reduced-motion natural flow.

## QA evidence
Screenshots: output/revamp-qa/home-desktop.jpg, home-mobile.jpg, participation-desktop.jpg, team-desktop.jpg, team-mobile.jpg, join-desktop.jpg, join-mobile.jpg, resources-desktop.jpg. Final deployment screenshot captured separately after publishing.
1440×900 public and member pages inspected; 390×844 all eight public routes inspected; 360×640, 768×1024 and 1280×720 checked home/team/join/resources. Zero horizontal overflow. Public pages have one h1. No broken images observed after loading. Member heading appears after Clerk connects.
Mobile menu opens, Escape closes after transition, focus returns to trigger. Search bridge gives one result, unmatched term zero, reset then Mentorship gives one. Article saving handoff reaches members with slug and sign-in preserves redirect URL.
Mobile home: motion disabled, no pins. Desktop home: motion active, hero and route line visibly change during scrolling.

## Findings and repairs
Major: low opacity meaningful headings fell below contrast during scroll. Repaired by eliminating text opacity animation. Header focus ring now cream on burgundy. Charlotte caption is real text. Shared class hooks reconciled for join, resources, members. Stable error-message list keys and Set lookup for bookmarks.
The screenshot where a participation heading is partly above the viewport is an ordinary scrolled position, not a pinned or obscured state. No section pins are used. Anchor offset follows sticky header. Meaningful controls remain in normal flow.

## Inclusive task walkthroughs
Student: free guide in one click, search/filter without account, readable article.
Volunteer: home Lead path to dedicated Join volunteer anchor, official form clearly external.
Partner: Join partner path and supplied Instagram.
Keyboard/mobile: menu focus trap and Escape exercised; visible high-contrast focus styles, full navigation and 44–48px controls.
Signed-out member: intent preserved through sign-in UI; public content stays usable.

## Limits and service state
Clerk remains a development instance pending custom-domain production setup. Authenticated browser test passed using a temporary Clerk development user: email verification, automatic guide save after sign-in, first profile success feedback, profile and bookmark persistence after reload, and already-saved notice. Temporary test account and records were removed. Backend identity isolation was tested in the earlier build; backend code did not change. Real phone hardware, OS reduced-motion preference and Lighthouse/react-scan runtime scores weren't measured. No numerical performance claim is made. Static React Doctor scan returned ok with known client-only form, stock Button export and bounded transactional Convex-await warnings; those are documented, not hidden. Final build, TypeScript and lint pass without warnings. Next patched to 16.4.0; npm audit reports zero vulnerabilities. Desktop-to-mobile resize without reload removes transforms and active motion. Fresh repaired-scroll screenshot: output/revamp-qa/participation-final-desktop.jpg.
