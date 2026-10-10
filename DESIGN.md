---
name: Flamivor Charlotte
description: A welcoming education community with open editorial layouts and shadcn controls.
colors:
  burgundy: "#8A0103"
  cream: "#F2EFE5"
  ink: "#171714"
typography:
  display:
    fontFamily: "Literata, Georgia, serif"
    fontWeight: 400
    fontSize: "clamp(40px, 5.5vw, 72px)"
    lineHeight: 1.12
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontWeight: 400
    fontSize: "16px"
    lineHeight: 1.65
  control:
    fontFamily: "Manrope, Arial, sans-serif"
    fontWeight: 500
    fontSize: "14px"
  legacy-member:
    fontFamily: "Space Grotesk, Arial, sans-serif"
    fontWeight: 500
    fontSize: "24px"
rounded:
  control: "8px"
  card: "12px"
spacing:
  small: "8px"
  medium: "16px"
  card: "24px"
  section: "96px"
---

# Flamivor Charlotte design system

## Overview
A welcoming education community. Human photography, a confident but regular-weight serif voice, and concise practical actions. Public Mobbin education examples inform the hierarchy and photographic composition; shadcn Radix components provide the working interaction system. This replaces the previous retro frames and offset shadows.

## Colors
Preserve the approved phoenix logo byte-for-byte, with Charlotte below it on the exact #8A0103 header. Cream is #F2EFE5; near-black is #171714. Other surfaces, borders and muted copy are derived from those colors. Use only real photographs, without visible stock-image credits. Never imply the photos depict actual chapter members. Charlotte-only facts, supplied leadership including Treasurer Supreeth Annand, and the verified general membership form remain authoritative. No fabricated achievements, events, testimonials or numbers.

## Typography
Literata 400 gives headlines warmth; italic is used sparingly within one headline. Manrope 400 provides body text, 500 navigation and controls. Display 40–72px; section headings 32–48px; card titles 22–28px; prose 16–18px. Metadata 12–14px. Ordinary case, balanced headings, tracking no tighter than -.035em. Auth and dashboard move toward Manrope controls and Literata headings; remaining Space Grotesk is an existing functional fallback, not a public display choice.

## Layout
Centered 1280px shell, responsive 20–64px gutters. Desktop header 88px; mobile 80px. Homepage: centered invitation, asymmetric three-photo strip, concise mission, two substantial participation features, useful guide cards, factual leadership and FAQ, then chapter invitation. No decorative metric strips. Secondary pages share the same shell, section rhythm, and component spacing. Desktop sections 80–96px; phone sections 48–56px. Mobile stacks naturally without clipped copy.

## Elevation & Depth

Photography provides natural depth. Cards use a single quiet border and no shadow.

## Shapes

Cards and photos use 12px rounded corners; controls use 8px corners.

## Components
Use local shadcn Button, Card, Accordion, Sheet, Field, ToggleGroup, Empty and Alert. Card composition includes Header/Title/Description/Content/Footer when those roles exist. Cards use 12px corners, 24px padding, one quiet 1px border and no shadow. No nested cards or hard offset shadows. Photography has 12px corners and no mat or decorative border. Buttons 48px height, 8px corners, medium-weight Manrope, burgundy primary or cream inverse. Search/filter controls retain 44px minimum targets. Focus rings remain visible, with cream on red backgrounds. Loading, empty, error and disabled states must remain functional.

### Motion
One photographic opening and responsive desktop scroll choreography. Existing branded route curtain remains. Scroll effects require minimum 1024px width, fine pointer and no reduced-motion preference. Mobile has no scroll animation. Default content is visible if animation never initializes. Cleanup must remove transforms and triggers on route or media changes.

## Do's and Don'ts
Check 375px phone, 768px tablet and 1280px laptop in a real browser. Inspect image loading, nav sheet, FAQ, guide filtering, auth navigation and membership link. Preserve actual Clerk/Convex behavior. Run production build, lint and typecheck before commit and sync. Confirm both linked Vercel projects are Ready.
