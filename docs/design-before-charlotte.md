# Flamivor Design System

## 0. Research Log

- Embedded references: shortlisted Apple Education, Preply, and Mimo → picked the education editorial grammar observed in Apple Education (photographic proof, generous editorial rhythm) and Preply (bold human hero with a concise action) because Flamivor needs credibility and warmth, not generic nonprofit cards.
- Lazyweb: 2 queries, 2 screens viewed (Apple Education desktop and Preply mobile) → took a photo-first lead, a compact proof strip, asymmetric image clusters, and a simple one-column mobile reading order. These are structural findings only; no external UI is copied.
- Imagen drafts: skipped — the image-generation capability is unavailable in this workspace. Unsplash placeholders are used as requested and are clearly external placeholders.
- UI UX database: skipped — its reference bundle is unavailable in this installation.
- Evidence-led refinement: reviewed 20 current accessibility, performance, motion, responsive-content, and usability articles from W3C WAI, MDN, web.dev, Nielsen Norman Group, and The A11Y Project. Applied: motion respects reduced-motion, route animation uses a fixed normalized SVG dash pattern, touch/focus states remain clear, image boxes reserve space, type balances/pretty-wraps, route cards never share the mobile rail, and resource cards use an intentional responsive hierarchy rather than a uniform grid.
  - Sources: W3C WAI — Animation from Interactions, Target Size (Minimum), Focus Visible; MDN — `prefers-reduced-motion`, SVG `stroke-dasharray`, `<img>`, `text-wrap`, Lazy Loading; web.dev — Animations Guide, Optimize LCP, Serve Responsive Images, Optimize CLS, Learn Core Web Vitals, Accessibility, Learn Forms; Nielsen Norman Group — Ten Usability Heuristics, Mobile Content, Visual Hierarchy; The A11Y Project — Creating Valid and Accessible Links, How to Hide Content.

## 1. Atmosphere & Identity

Flamivor feels like a field journal for an education movement: optimistic, grounded, and unmistakably human. The signature is the **Path of Access** — a deliberate red thread that carries the reader from one real moment of learning to the next, punctuated by warm editorial photography rather than abstract decoration.

## 2. Color

| Role | Token | Value | Usage |
|---|---|---:|---|
| Ink | `--ink` | `#201411` | Headlines and high-emphasis body copy |
| Paper / logo white | `--paper` | `#F7EDE6` | Main page surface and brand light |
| Cream | `--cream` | `#F1E5D4` | Warm panels and image framing |
| Red | `--red` | `#8A0103` | Brand field, CTAs, route, focus ring |
| Red dark | `--red-deep` | `#5C0002` | Dark story panels and hover states |
| Red panel | `--red-panel` | `#7E1710` | Navigation and logo-backed surfaces |
| Coral | `--coral` | `#E86F51` | Warm accent and route highlights |
| Moss | `--moss` | `#355C51` | Secondary editorial accent |
| Mist | `--mist` | `#E9ECE5` | Subtle grounding surface |
| Line | `--line` | `#D9CDBC` | Dividers and low-emphasis borders |
| Muted | `--muted` | `#695F57` | Supporting copy |
| Surface | `--surface` | `#FFF9F3` | Raised resource surfaces |

The exact brand pairing is Flamivor red `#8A0103` and logo white `#F7EDE6`. Accent red is reserved for actionable or navigational elements, except for the Path of Access, where it communicates the visitor's progress through Flamivor's mission.

## 3. Typography

| Level | Size | Weight | Line height | Usage |
|---|---:|---:|---:|---|
| Display | `clamp(3.25rem, 7vw, 7.5rem)` | 700 | .91 | Hero statement |
| H1 | `clamp(2.5rem, 5vw, 5rem)` | 700 | .98 | Major story headings |
| H2 | `clamp(2rem, 3.5vw, 3.5rem)` | 700 | 1.03 | Section headings |
| Body large | `1.125rem` | 400 | 1.6 | Lead copy |
| Body | `1rem` | 400 | 1.65 | Standard copy |
| Label | `.72rem` | 700 | 1.2 | Eyebrows and metadata |

- Display / headings: `Space Grotesk, sans-serif`
- Body: `Inter, sans-serif`
- No third family; editorial contrast comes from scale, tracking, and the image treatment.

## 4. Spacing & Layout

- Base unit: 4px. Key increments: `--space-2: 8px`, `--space-4: 16px`, `--space-6: 24px`, `--space-8: 32px`, `--space-12: 48px`, `--space-16: 64px`, `--space-24: 96px`, `--space-32: 128px`.
- Content width: 1240px. Page gutter: `clamp(20px, 4vw, 64px)`.
- Desktop: an asymmetric 12-column rhythm; mobile collapses into one clear reading column. The journey’s route becomes a left rail below 760px so photos never become too narrow.

## 5. Components

### Editorial Button
- **Structure:** link + label + arrow icon.
- **Variants:** light primary, dark outline, text link.
- **States:** default, hover (2px lift / arrow nudge), focus-visible red ring, active (no lift).
- **Accessibility:** visible focus, 44px minimum target on touch layouts.
- **Motion:** 180ms transform and opacity only.

### Photo Stack
- **Structure:** wrapped responsive image with a framed foreground and two offset supporting images.
- **States:** static, hover (foreground rises 8px), reduced-motion static.
- **Accessibility:** meaningful alt text; decorative layers are aria-hidden.

### Path Step
- **Structure:** route point, step number, image, eyebrow, heading, description, inline link.
- **Variants:** left, right, mobile rail.
- **States:** in-view reveal, hover image scale, focus-visible link.
- **Motion:** static reading aid; route-level SVG motion is reserved for the home hero so the story remains calm and readable.

### Proof Tile
- **Structure:** figure, short label, number.
- **States:** default and in-view opacity/translate reveal.
- **Accessibility:** content stays readable with animation disabled.

### Loading Screen

- **Structure:** a brief, brand-backed entrance using the supplied wordmark, route line, and mission label.
- **States:** fades away after the first editorial beat; reduced-motion visitors skip it entirely.
- **Accessibility:** status is announced without blocking reading order or retaining focus after the page is available.

### Async Submit State

- **Structure:** a single submit label swaps among ready, sending, success, and error states without changing the button footprint.
- **States:** ready, sending, success, and error use plain text that does not change the button footprint. A local envelope morph may acknowledge genuine success, but never substitutes the status text.
- **Accessibility:** the button exposes `aria-busy` while sending, success is announced as a status, and failure is announced as an alert.

### Navigation Drawer

- **Structure:** a labelled `nav` landmark with a Menu button and a compact link list below 900px.
- **States:** closed, open, active route, keyboard focus, and Escape close.
- **Accessibility:** the button exposes `aria-expanded` and `aria-controls`; Escape closes the drawer and returns focus to the Menu button. The drawer's landmark is explicitly labelled “Main navigation”.

### Gallery Dialog

- **Structure:** a photo contact sheet opens a native modal dialog with a descriptive image, caption, and close button.
- **States:** resting, hover/focus affordance, open, close, and reduced-motion static.
- **Accessibility:** each thumbnail is a labelled button; the native dialog traps focus, closes with Escape, and restores focus to its triggering thumbnail.

### Impact Data State

- **Structure:** an editorial report shell with a clear loading, empty, or error panel; chart modules mount only when source-verified data is supplied.
- **States:** pending verification, verified report, and unavailable/error. No figures are rendered from placeholder data.
- **Accessibility:** the state is plain-language text with `role="status"`; charts must include a tabular/plain-language alternative and keyboard-accessible legend/tooltip before being enabled.

### Story Ledger

- **Structure:** an editorial statement, a reserved visual thread, and a sequence of numbered narrative markers. The thread moves into a vertical rail on mobile and never crosses readable content.
- **States:** static as a reading aid; each marker may use a single opacity/translate entrance.
- **Accessibility:** marker order in the DOM follows the story; the thread is decorative and hidden from assistive technology.

### Portrait Placeholder

- **Structure:** a branded, clearly labelled frame with initials and a small “Portrait arriving soon” caption.
- **States:** static placeholder, then replaced by a real portrait with a descriptive alt text when photography is available.
- **Accessibility:** never imply that a placeholder is a photograph or invent a person’s likeness.

### Resource Index

- **Structure:** an uncomplicated shelf of branded resource covers, each followed only by its course title and availability.
- **States:** “coming soon” is plain text, not a fake button or unavailable link.
- **Accessibility:** meaningful alt text, semantic `figure`/`figcaption`, and titles/availability remain readable without the supporting imagery.

- **Structure:** a distinct utility hero, category filter, native scroll-snap cards, and a catalog status ring sourced directly from the four published resource records.
- **States:** all categories, a selected category, and a clear “coming soon” state. Selection changes the visible shelf only; it never implies that an unavailable resource can be opened.
- **Accessibility:** the category control is a labelled button group with a visible pressed state; the status ring exposes its 0 available / 4 catalogued summary in plain text and is paired with a screen-reader table.
- **Motion:** selection is an immediate semantic state change. The carousel becomes native horizontal scroll-snap on small screens; it has no auto-advance behavior.

### Opportunity Board

- **Structure:** a visually led open-call hero, a compact category legend, and chronological-style opportunity records with clear destination links and deadlines.
- **States:** each record strengthens its image crop and title rule on hover; external destinations are labelled by an arrow and remain keyboard accessible.
- **Accessibility:** category colour is never the only identifier; every record keeps date, place, audience, and destination in text.

## 6. Motion & Interaction

| Type | Duration | Easing | Usage |
|---|---:|---|---|
| Micro | 180ms | `cubic-bezier(.2,.8,.2,1)` | Buttons and image hover |

Only small interaction affordances use transform or opacity transitions. There are no automated SVG scenes, CSS keyframes, Motion/Framer Motion, GSAP, parallax, canvas, WebGL, particles, cursor-following effects, or scroll hijacking.

- Category filters, navigation, gallery dialog, and form status use plain semantic DOM states. The gallery dialog centers the selected image within its viewport-safe modal area.

## 7. Depth & Surface

Strategy: **mixed editorial material.** Paper and cream create the base layers; image frames use a hard offset shadow (`8px 8px 0 var(--ink)`) sparingly, while the deep-red panel uses a subtle shadow and tonal gradient. There are no glass cards or generic soft shadows.

## 8. Accessibility Constraints & Accepted Debt

### Constraints

- WCAG 2.2 AA target: 4.5:1 body contrast, a clear focus outline, keyboard-operable menu and CTAs, and 44px touch targets where controls are used.
- Motion is meaningful (progress and hierarchy) and opt-out friendly through `prefers-reduced-motion`.
- Images use descriptive alt text; Unsplash photos are placeholders and must be replaced with Flamivor-owned photography before a final brand launch.

### Accepted Debt

| Item | Location | Why accepted | Owner / Exit |
|---|---|---|---|
| Placeholder photography | Hero and Path of Access | Requested temporary Unsplash imagery | Replace with program photography before launch |
| Team portraits | Team page | Team photography and bios are not yet supplied | Replace labelled placeholders with approved portraits and biographies next week |
| Verified impact dataset | Impact page | Existing headline figures are not accompanied by a traceable source | Add a reviewed dataset and then enable the chart module with its source/date before publication |
