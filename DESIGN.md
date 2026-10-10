---
name: Flamivor Charlotte
description: A restrained retro interface for a Charlotte youth-led education chapter.
colors:
  burgundy: "#8A0103"
  cream: "#F2EFE5"
  retro-ink: "#171714"
  muted-ink: "color-mix(in srgb, #171714 72%, #F2EFE5)"
  fine-rule: "color-mix(in srgb, #171714 24%, #F2EFE5)"
  soft-surface: "color-mix(in srgb, #171714 4%, #F2EFE5)"
typography:
  public-display:
    fontFamily: "Literata, Georgia, serif"
    fontSize: "clamp(42px, 5vw, 64px)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  public-title:
    fontFamily: "Literata, Georgia, serif"
    fontSize: "30px"
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  control:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.3
  member-title:
    fontFamily: "Space Grotesk, Arial, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: 1.2
rounded:
  sharp: "2px"
  small: "4px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "64px"
components:
  button-primary:
    backgroundColor: "{colors.burgundy}"
    textColor: "{colors.cream}"
    rounded: "{rounded.sharp}"
    height: "48px"
    padding: "12px 20px"
  button-inverse:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.retro-ink}"
    rounded: "{rounded.sharp}"
    height: "48px"
    padding: "12px 20px"
  card:
    backgroundColor: "{colors.soft-surface}"
    textColor: "{colors.retro-ink}"
    rounded: "{rounded.sharp}"
    padding: "28px"
  search-field:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.retro-ink}"
    rounded: "{rounded.small}"
    height: "52px"
    padding: "12px"
  selected-filter:
    backgroundColor: "{colors.burgundy}"
    textColor: "{colors.cream}"
    rounded: "{rounded.small}"
    height: "44px"
    padding: "10px 12px"
  header-navigation:
    backgroundColor: "{colors.burgundy}"
    textColor: "{colors.cream}"
    height: "88px"
    padding: "0 20px"
---

# Design System: Flamivor Charlotte

## Overview

**Creative North Star: “A Tactile Chapter Journal”**

The public interface pairs warm editorial type and real photography with a restrained retro component language. The pages stay open and cream-led; thin dark outlines and shallow offset shadows give selected cards and actions a physical feel. The Neobrutalism.com Radix primitives are the source for the button and card patterns, adapted to this chapter’s colors, type, and interaction needs.

Public photography is real Unsplash stock, shown without visible source labels or photographer credits at the user’s request. It is illustrative and does not represent chapter members or events. Do not use AI-generated imagery. The supplied phoenix logo stays unchanged on the burgundy header. Member and authentication screens retain their separate functional styling and real Clerk and Convex behavior.

**Key Characteristics:**
- Cream public pages with burgundy actions and header, near-black copy, rules, and component outlines.
- Literata public headings in ordinary case; Manrope for prose, controls, and navigation.
- Shallow offset shadows on selected retro components; the surrounding page remains spacious and quiet.
- Real stock photographs and factual Charlotte chapter information.

## Colors

The public palette keeps the exact chapter burgundy and cream, adding near-black for the restrained retro component treatment. Muted copy, rules, and soft surfaces are mixed from near-black and cream in the public scope.

### Primary
- **Chapter Burgundy**: public header and primary actions; the supplied logo remains unchanged against it.

### Neutral
- **Warm Cream**: public page ground, reversed action text, and inverse action fill.
- **Retro Ink**: public copy, thin component outlines, and shallow offset shadows.
- **Muted Ink**: secondary public copy, mixed from Retro Ink and Warm Cream.
- **Fine Rule**: quiet dividers, mixed from Retro Ink and Warm Cream.
- **Soft Surface**: restrained card ground, mixed from Retro Ink and Warm Cream.

**The Exact Identity Rule.** Preserve the supplied burgundy and cream values and the phoenix artwork byte-for-byte.

## Typography

**Display Font:** Literata (with Georgia, serif)
**Body Font:** Manrope (with Arial, sans-serif)
**Member UI Font:** Space Grotesk (with Arial, sans-serif)

**Character:** Literata makes the public pages feel human and editorial, with italic Literata used for brief emphasis. Manrope keeps supporting copy and controls clear. Space Grotesk remains in the member and authentication surfaces.

### Hierarchy
- **Public display** (Literata 400, `clamp(42px, 5vw, 64px)` desktop; `clamp(38px, 10.5vw, 48px)` on the home hero at phone width): ordinary-case public page and home headings. The home hero uses 52px at widths up to 1100px.
- **Public section headings** (Literata 400, `clamp(32px, 3.6vw, 48px)`; common section rule `clamp(32px, 3.6vw, 44px)`): section titles and editorial features. Page descriptions use 18px desktop and 16px on phones.
- **Public titles** (Literata 400, 22–36px): guide titles, path headings, leadership names, and invitation headings. The home guide list uses 24px desktop and 22px on phones; participation labels use 30px desktop and 26px on phones.
- **Public body** (Manrope 400, 15–18px; 16px base, line-height 1.65): descriptions, article copy, and explanatory text. Compact metadata uses 11–13px.
- **Controls and navigation** (Manrope 500, 14px; 48px default action height): primary actions, public navigation, and text links. Filter controls remain at least 44px tall.
- **Member and auth UI** retains Space Grotesk titles and Manrope copy, including the existing component-specific sizes.

The observed authored type steps across public, member, and auth surfaces are 11, 12, 13, 14, 15, 16, 17, 18, 22, 24, 26, 28, 30, 32, 34, 36, 38, 42, 44, 48, 52, and 64px. They serve distinct hierarchy roles and are not intended as a uniform modular scale. Public headings use ordinary case; the member interface keeps its existing task-focused hierarchy.

## Layout

Public pages use a centered 1280px shell with 20–64px responsive gutters. The header is 88px tall on desktop and 80px on mobile. The homepage opens on cream with a text and photo split, a short chapter introduction, one primary action, and a separate guide card. At 767px and below, the opening stacks naturally, the photo crop is 260px high, and the guide card follows it. Mission, participation, guide, roster, and invitation sections use generous 64px desktop spacing, reduced to 40px on phones. Descriptive captions may accompany images; source and photographer information remains in the asset metadata only.

Secondary public pages use the same shell and typography, with a concise page heading followed by editorial sections, real photography, framed leadership cards, open participation paths, or the searchable guide shelf. Resources remain public without sign-in. Header navigation uses the exact burgundy field and unchanged phoenix logo; its mobile menu preserves focus return and Escape dismissal.

## Elevation & Depth

Depth is selective and structural. Public retro buttons retain a crisp 2px black offset shadow. Framed cards use a quieter 2px offset shadow mixed from 24% context ink and the surface cream. On fine-pointer hover, buttons shift slightly and deepen to a 4px offset; active buttons press down and lose the shadow. Cards keep their shallow resting shadow. Photography provides the natural depth on the page; avoid applying retro outlines and shadows indiscriminately.

### Shadow Vocabulary
- **Retro button resting shadow** (`2px 2px 0 #171714`): public retro buttons; their hover shadow remains black at 4px.
- **Framed card resting shadow** (`2px 2px 0 color-mix(in srgb, var(--ink) 24%, var(--paper))`): context-colored cards, including member and authentication cards.
- **Retro button hover shadow** (`4px 4px 0 #171714`): only while a fine pointer hovers the button.

## Shapes

Public components use compact square corners: 2px on buttons, cards, and photo frames; 4px on grouped filter controls. Buttons retain a 1px near-black outline. Framed cards use a 1px context-colored control border. The photo frame uses a thin outline and a small cream mat. Keep the rest of the page border-light and open.

## Components

### Buttons
- **Shape:** Compact square corners (2px), 1px near-black border, 48px default minimum height, and 20px horizontal / 12px vertical padding.
- **Primary:** Burgundy fill with cream text.
- **Inverse:** Cream fill with near-black text for the header action.
- **Secondary:** Near-black fill with cream text.
- **Outline / ghost / link:** Use the existing variants; ghost and link variants omit the retro shadow.
- **Hover / active:** Fine-pointer hover lifts by 1px and uses a 4px offset shadow; active state presses down 2px and clears the shadow. Transitions last 200ms. Keyboard and reduced-motion modes remove the movement.
- **Focus / disabled:** Keep the visible focus ring and clear disabled opacity and pointer behavior.

### Cards / Containers
- **Corner style:** 2px.
- **Background:** Soft Surface or Warm Cream, depending on the content role.
- **Border:** 1px context-colored control border.
- **Shadow:** quiet 2px offset, mixed from 24% context ink and surface cream. Buttons keep their separate black shadow.
- **Internal padding:** 28px, reduced to 24px below 768px.
- **Typography:** Public cards use the public type hierarchy; member and authentication cards share the frame tokens while keeping their Space Grotesk and Manrope type styles.

### Inputs and Filters
- **Search:** A 52px input group with cream ground, clear border, Manrope text, and a visible focus ring; the input text is 16px.
- **Topic filters:** 44px minimum outline controls with a 4px grouped radius. The selected category uses burgundy fill and cream text; all options remain keyboard-operable.

### Navigation
The desktop header is burgundy with the unchanged logo, 14px Manrope links, and an inverse cream action. On mobile the header compacts to 80px and exposes the touch-safe sheet menu. Active route and hover links use a fine underline.

### Documentary Photo Frame
The opening photo sits in a thin near-black outline with a small cream mat. Show the photograph without source labels or photographer credits, as requested by the user. Preserve source metadata in code and never describe it as a chapter event or member portrait.

## Do's and Don'ts

### Do:
- **Do** keep the public page spacious and cream-led; use outlined retro styling on selected components.
- **Do** preserve the exact burgundy, cream, and supplied phoenix logo.
- **Do** use real sourced photography without visible source labels or photographer credits, as requested by the user.
- **Do** keep the current local facts, official form, and public guide access accurate.
- **Do** preserve the separate member and authentication typography and behavior.
- **Do** limit scroll-linked movement to wide, fine-pointer desktop with reduced motion disabled.

### Don't:
- **Don't** use AI-generated images or present stock photos as actual members or chapter events.
- **Don't** make every surface bold, outlined, or shadowed; reserve the retro treatment for selected actions and cards.
- **Don't** use oversized all-caps display headings, invented facts, or additional visual hues.

## Card consistency

Framed cards share `--card-radius` (2px), `--card-padding` (28px; 24px below 768px), a 1px context-colored control border, and a quiet 2px offset shadow mixed from 24% context ink and surface cream. Buttons retain their black 2px resting shadow. Public, member, and authentication colors remain scoped to their surfaces; member and authentication cards share the frame while retaining separate typography. The hero photo and guide card keep aligned outer edges. The hero card remains fixed during scroll; only the photo inner layer parallaxes. Resource covers share a 7:5 ratio, resource cards stretch to equal row height with matching title and description space (two and three line minimums on desktop, natural height on mobile), and all copy remains visible. Invitations and join callouts use the same frame and inset. Leadership uses a two-column grid of framed cards; participation paths remain open lists.
