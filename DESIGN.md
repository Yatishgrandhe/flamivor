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
- **Motion:** each step reveals on entry; the SVG route draws with scroll progress through the exact centre of every node. The section owns no scroll; the document does.

### Proof Tile
- **Structure:** figure, short label, number.
- **States:** default and in-view opacity/translate reveal.
- **Accessibility:** content stays readable with animation disabled.

### Loading Screen

- **Structure:** a brief, brand-backed entrance using the supplied wordmark, route line, and mission label.
- **States:** fades away after the first editorial beat; reduced-motion visitors skip it entirely.
- **Accessibility:** status is announced without blocking reading order or retaining focus after the page is available.

### Story Ledger

- **Structure:** an editorial statement, a reserved visual thread, and a sequence of numbered narrative markers. The thread moves into a vertical rail on mobile and never crosses readable content.
- **States:** static as a reading aid; each marker may use a single opacity/translate entrance.
- **Accessibility:** marker order in the DOM follows the story; the thread is decorative and hidden from assistive technology.

### Portrait Placeholder

- **Structure:** a branded, clearly labelled frame with initials and a small “Portrait arriving soon” caption.
- **States:** static placeholder, then replaced by a real portrait with a descriptive alt text when photography is available.
- **Accessibility:** never imply that a placeholder is a photograph or invent a person’s likeness.

### Impact Ledger

- **Structure:** a dark editorial report with one leading proof figure, grouped outcome entries, and a quiet geographic/connection field used only as context.
- **States:** outcome entries reveal with opacity/translate on entry; hover may lift a linked entry by 4px and strengthen its rule.
- **Accessibility:** figures always include their plain-language label; the connection field is decorative and hidden from assistive technology.

### Resource Index

- **Structure:** a featured resource spread followed by numbered, linked resource records; metadata explains availability without presenting unavailable items as controls.
- **States:** active resource links use a transform-only arrow nudge; “coming soon” items are text, not fake buttons.
- **Accessibility:** image regions have fixed aspect ratios and meaningful alt text; titles and availability are readable without the supporting imagery.

### Opportunity Board

- **Structure:** a visually led open-call hero, a compact category legend, and chronological-style opportunity records with clear destination links and deadlines.
- **States:** each record strengthens its image crop and title rule on hover; external destinations are labelled by an arrow and remain keyboard accessible.
- **Accessibility:** category colour is never the only identifier; every record keeps date, place, audience, and destination in text.

## 6. Motion & Interaction

| Type | Duration | Easing | Usage |
|---|---:|---|---|
| Micro | 180ms | `cubic-bezier(.2,.8,.2,1)` | Buttons and image hover |
| Entry | 600ms | `cubic-bezier(.16,1,.3,1)` | Hero and in-view reveals |
| Scroll | tied to scroll | linear | Hero media drift and route drawing |

Only opacity and transform animate. All non-essential effects are disabled under `prefers-reduced-motion`; content remains visible and the route stays fully drawn.

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
