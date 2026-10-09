# October 9 public redesign

## Direction contract

THESIS: Learning is a human exchange. Show the people and practical ways to take part rather than repeating poster slogans. Shorten the public journey while preserving useful resources and real leadership.

OWN-WORLD: Approved cream ground and burgundy ink/header, unchanged phoenix mark, softly proportioned Literata display and Manrope body, photography with plainly visible stock credits, generous margins and restrained rules. No uppercase display wall, badge strip or hard-offset shadows.

STORY: A visitor understands this is Charlotte's youth-led education chapter, sees the work being developed, chooses a learning/volunteering/partner path, reads a guide or uses the real membership form.

FIRST VIEWPORT: Compact red navigation above a cream opening. A clear 60–68px ordinary-case headline and generous documentary photograph share the opening, with a direct chapter introduction. The quieter overhead study photograph appears in the following mission section, not inset in the first viewport. One burgundy Get involved action; public-guide link stays visible. Natural stacked phone flow, 42–48px headline, no scroll choreography.

FORM: Community photo journal, grounded candidate 7, seed 31d2196e. Grounded systems considered: university prospectus, school resource shelf, city noticeboard, mentor letter, community bulletin, open-day program and photo journal. Photo journal earns the subject through a concise, human reading sequence. Brodovitch spread is competitive for image/text balance but weaker for direct chapter clarity; keep its discipline of asymmetric image proportion. Information-noise sleeve, accretion disk, alien understory and HyperCard lose both identification and clarity; keep only their respective hierarchy, attention, progression and direct affordance disciplines, not their motifs. Darkroom is competitive for photographic pacing but weaker for participation clarity; retain one restrained photographic motion moment. Exact user colors override catalog palettes. Proceed with a code-built preview using verified real photos; the optional direction question remains open, and no workflow default is stored from silence.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance


## October 9 finish review

**Verdict: ship the public redesign.** Independent review found the warm photo-journal direction coherent and materially clearer than the rejected poster treatment. No material visual defect remains in the reviewed scope. The overhead study photo sits in the next mission section rather than the opening; the hero still supplies direct Charlotte chapter context.

**Raster evidence:** production-mode viewport captures are in `output/redesign/`: `desktop.jpg` (1280×720), `mobile.jpg` (390×844), `team-mobile.jpg`, `resources-mobile.jpg`, `join-desktop.jpg`, `join-mobile.jpg`, and `about-mobile.jpg`. The `desktop-full.jpg` and `mobile-full.jpg` captures are excluded because their capture timing was invalid. These are browser viewport captures; physical phone behavior was not tested.

**Image and mark provenance:** the site photos are the credited illustrative stock assets defined in `lib/photos.ts`: Brooke Cagle / Unsplash (collaboration), Jaykumar Bherwani / Unsplash (study), and Vitaly Gariev / Unsplash (classroom). They are not presented as Flamivor members or events. The approved phoenix mark remains the existing `public/images/flamivor-logo-approved.png`; it was not redrawn or recolored. The exact brand colors remain in `app/globals.css`.

**QA evidence:** production build, typecheck, lint, and detect checks passed. Viewport overflow checks passed at 360, 390, 768, and 1280px. Menu Escape returns focus; resource filtering updates results; desktop scroll motion is active at desktop width and cleared below 1024px; mobile scroll animation is absent. Member auth and persistence flows remain real and unchanged.

**Limits:** review evidence is raster and viewport based, with no physical handset test. Clerk still uses its development instance; production Clerk setup requires the configured custom domain and credentials. Deployment remains pending parent confirmation.
