# Flamivor Charlotte: 2026 redesign contract

## 0. Audit and research
Existing-project redesign under user-directed creative authority. Four GPT-6 Luna roles: design audit, secondary pages, functional flows, independent quality review. Existing live homepage inspected: repeated slogans, competing paper stamps, oversized section sequence, weak local specificity, conflicting CSS overrides. Remove those patterns rather than recolor them. Frontend routing, designpowers review, Scroll Craft 0.3.1 and imagegen guidance applied. The frontend bundle's named redesign-skill.md is absent; audit-first process and loaded router substitute. Existing factual content and source provenance retained in docs/RESEARCH.md.

## 1. Direction and visitor journey
A bold student publication and chapter campaign. Cream and burgundy, condensed display typography, crisp print rules, tangible paper phoenix illustration and large asymmetric compositions. The image represents learning and the brand's phoenix; it is explicitly illustrative. No invented documentary imagery, impact metrics, testimonials, dates or programs.
Journey: recognize Charlotte's student movement → understand the work we are building → choose learner / volunteer / partner path → use a real free guide → meet actual leaders → join via official form.
Primary action: Get involved. Audience: curious students, volunteers, local collaborators. Public resources require no login.

## 2. Tokens
Brand red --red #8A0103; cream --paper #F2EFE5. Ink is red; reversed ink is cream. --muted mixes red at 72% with cream, --line mixes red at 24% with cream, --surface mixes red at 4% with cream. Header background exactly red to match the supplied logo. No new hue. Depth is physical image lighting, offset shadows on publication artifacts and ink rules. No glass, gradients in text, neon or gratuitous shapes.

## 3. Type and spacing
Display: locally hosted Anton, weight 400. Supporting display / labels: existing Space Grotesk 500/600/700; body Manrope 400/500/600/700. Three purposeful roles, no fourth font. Display upper case, .94 line-height, -.025em tracking. Hero clamp(76px, 10vw, 156px); page headings clamp(56px,8vw,112px); h2 clamp(42px,6vw,80px); h3 28–36px. Body 16px /1.65; lead 18–20px/1.55; label 11px/.12em tracking; meta 12px. Mobile hero 72–92px according width, readable unbroken words. 4px rhythm: 8/12/16/20/24/32/40/48/56/64/80/96/112. Shell max1440, gutter clamp20 to64. Breakpoints 640/768/1024. Header96px desktop80mobile. Scroll marginheader+24px.

## 4. Composition
Hero burgundy, cream display left, sculptural paper phoenix right, direct chapter proposition below heading. One clear image, no floating fake sticky notes/stamps/ghost CLT. Mission cream split editorial block. Participation section three distinct roles with red chapter headings; desktop scroll line and progressive chapter emphasis, no hidden/colliding links. Resources physical field-guide covers with original line diagrams; local team compact named roster. Footer oversized location typography and complete navigation. Secondary pages use spacious PageHeader plus numbered/rule-based editorial rows; cards only where they help resource selection or member forms.

## 5. Shared primitives and class contract
Header/Brand: official full logo, real CHARLOTTE text underneath, cream/red nav, active page, mobile Sheet with focus trap and Escape. Footer: brand, mission sentence, local Instagram, complete navigation.
PageHeader: .page-heading.shell, .eyebrow, h1, .page-description. Section headings .section-heading. TextLink .text-link arrow and underline. Invite .invitation / .invitation-inner / .invite-bottom, one meaningful close. Buttons:48px, solid red/cream variants, visible focus, arrow hover, disabled/pending.
Secondary pages may retain .story-grid, .story-main, .story-aside, .principle-grid, .principle, .team-grid, .leader-card, .leader-monogram, .open-role, .join-paths, .join-path, .form-callout, .privacy-copy and .page-content. Add .editorial-section, .editorial-row, .row-index, .section-intro, .chapter-note when helpful. Root owns all CSS.
Resource: .resource-grid, .resource-card, .resource-cover, .resource-meta, .resource-copy, .resource-filters, .filter-button, .resource-search, .resource-toolbar, .resource-empty; title+description search, categoryfilter, clear state and results announcement. Articles: .article-shell, .article-header, .article-body, .article-step, .article-actions, readable measure, print layout.
Members: .member-shell, .member-heading, .member-grid, .member-panel, .member-bookmarks, .status-message; profile retains owner-only Convex persistence. Save guide intent completes after sign-in and announces result. Confirmation for clearing own data. Errors preserve input. No false saved states.

## 6. Motion and signature
Desktop only >=1024px, fine pointer, no reduced-motion preference. Scroll Craft distinct-scene grammar: independent hero image and typography planes, drawn route line through participation, selective publication-cover reveals, closing typographic lift. The route line is the signature: it connects Learn, Lead and Inspire as local contributions. Peak participation has largest meaningful change, no empty long pins. All text and links usable without JS. GSAP context cleanup on navigation and media changes. Mobile/touch/reduced motion natural flow, no scroll animation listeners, pins, parallax or reveal offsets. Transform/opacity/SVG stroke only. Hover max200ms. Do not force smooth document scrolling.

## 7. Accessibility and task checks
Skip link, one h1, sequential headings, visible focus, semantic buttons/links, labelled search/forms, error/success live regions, AA contrast, >=44px targets. Keyboard users never encounter concealed interactive cards. Mobile menu Escape returns focus. Printed guide omits navigation. Check360/390/768/1280/1440, shorter laptop720height; test intermediate desktop scroll, breakpoint cleanup, reduced motion and route transitions. Verify mobile no effects. Existing shadcn toolkit and dev-only React tooling retained.

## 8. Facts, services and accepted limits
Local leaders: Yatish Grandhe President; Shaurya Gautham Vice President; Joshita Madarapu Social Media Manager; Tanvi Musale Operations Director. Treasurer open. Preserve exact form/Instagram from lib/site.ts. Convex production exists; Clerk currently uses development instance and production setup requires custom domain. Do not claim production auth completed. No fake bios/photos or event schedules. Browser sizes emulate phones; actual phone hardware testing is separate. No known blocking design/accessibility debt accepted; fix issues found in QA before delivery.
