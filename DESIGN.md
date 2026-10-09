---
name: Flamivor Charlotte
description: A local education chapter identity built around human learning and practical participation.
colors:
  burgundy: "#8A0103"
  cream: "#F2EFE5"
  muted-ink: "color-mix(in srgb, #8A0103 72%, #F2EFE5)"
  rule: "color-mix(in srgb, #8A0103 24%, #F2EFE5)"
  soft-surface: "color-mix(in srgb, #8A0103 4%, #F2EFE5)"
typography:
  public-display:
    fontFamily: "Literata, Georgia, serif"
    fontSize: "clamp(42px, 5vw, 68px)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  member-title:
    fontFamily: "Space Grotesk, Arial, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: 1.2
rounded:
  sharp: "2px"
  small: "4px"
  cover: "8px"
  callout: "12px"
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
    padding: "12px 24px"
  button-inverse:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.burgundy}"
    rounded: "{rounded.sharp}"
    height: "48px"
    padding: "12px 24px"
---

# Design System: Flamivor Charlotte

## Overview

**Creative North Star: "The Community Photo Journal" (working direction inferred from the October 9 redesign brief).**

The public site uses a warm editorial voice to introduce a Charlotte youth-led education chapter and give visitors clear ways to learn, contribute, and connect. Documentary-style stock photography supports the story and carries visible photographer credits; it is never evidence of Flamivor members or events. The direction is recorded as a working assumption because the optional warm-versus-bold preference was unanswered.

The member workspace keeps its task-focused typography and real Clerk and Convex behavior. The approved phoenix mark and exact brand colors are durable identity constraints.

**Key Characteristics:**
- Cream pages and a burgundy navigation bar frame the chapter story.
- Locally hosted Literata display type pairs with Manrope copy; member titles use Space Grotesk.
- Photography, useful resources, and direct participation links carry the public experience.

## Colors

A two-color identity carries the page; derived tones come from the same palette.

### Primary
- **Chapter Burgundy**: navigation, primary actions, and public text.

### Neutral
- **Warm Cream**: page ground and reversed text.
- **Muted Ink**: secondary copy mixed from the primary ink and cream.
- **Fine Rule**: restrained dividers mixed from the primary ink and cream.
- **Soft Surface**: quiet callout ground mixed from the primary ink and cream.

**The Exact Identity Rule.** Keep the supplied burgundy and cream values exact, especially on the header beside the approved logo.

## Typography

**Display Font:** Literata (with Georgia, serif)
**Body Font:** Manrope (with Arial, sans-serif)
**Member UI Font:** Space Grotesk

**Character:** Literata gives public headings a human editorial voice. Manrope keeps navigation, body copy, and controls clear; Space Grotesk remains part of the member interface.

### Hierarchy
- **Public headline** (regular, responsive clamp): home and public page h1/h2.
- **Public section title** (regular, responsive clamp): section headings and editorial features.
- **Body** (regular, 16px, 1.65): public prose and supporting descriptions.
- **Control** (14px or larger): actions and navigation, with touch targets at least 44px high.
- **Member title** (semibold): dashboard and account task headings.

**The Ordinary-Case Rule.** Public display headings use ordinary sentence case and never return to oversized uppercase poster lettering.

## Layout

Public pages use a centered shell with generous gutters. The desktop header is compact, and the mobile header retains its full touch-safe menu. Home begins with asymmetrical text and photography, followed by the mission, participation paths, free guides, actual chapter leaders, and the join invitation. On phones these sections flow naturally in one column. Resources remain easy to scan, and guide articles use a readable text measure.

The desktop home may use restrained scroll motion at wide fine-pointer sizes. Touch layouts, narrower widths, and reduced-motion settings use natural document flow. Loading and route transitions respect reduced motion. Member pages preserve their separate responsive workspace layout.

## Elevation & Depth

The public system is mostly flat. Photography supplies natural depth; rules and a quiet tonal surface distinguish sections. Resource covers use simple diagrams without hard offset shadows. Interaction states use restrained color and position changes rather than decorative glow.

## Shapes

Public sections favor square or gently rounded corners. Photo frames may use one asymmetrical corner to create an editorial crop. Controls remain simple and compact, with clear borders and generous hit areas.

## Components

### Buttons
- **Primary:** Burgundy fill with cream text; 48px default height.
- **Inverse:** Cream fill with burgundy text for the header action.
- **Focus:** A visible high-contrast ring; disabled and pending states remain explicit.

### Cards / Containers
- **Resource covers:** restrained diagram panels with a small corner radius and no offset shadow.
- **Invitation:** quiet tonal surface, thin rule, and clear form action.

### Inputs / Fields
- Search and form fields use a clear border, cream ground, and visible focus treatment. Text inputs remain at least 16px to avoid mobile browser zoom.

### Navigation
The desktop header uses the exact burgundy background, unchanged approved logo, and Charlotte identification. Mobile navigation uses a touch-safe menu with keyboard dismissal and focus return.

### Photo credits
Each stock photo is identified as stock and credits its photographer with a source link. Keep the photographer attribution near the photo.

## Do's and Don'ts

### Do:
- **Do** keep Charlotte-specific facts and the real chapter form visible in the public journey.
- **Do** retain photographer credits and label stock imagery honestly.
- **Do** preserve the official logo as supplied.
- **Do** keep reduced-motion and keyboard behavior usable.

### Don't:
- **Don't** imply stock photos depict chapter members or events.
- **Don't** invent local impact statistics, testimonials, programs, or event dates.
- **Don't** restore the rejected poster hierarchy or hard-offset cover shadows.

## Interaction and motion contract

The approved-logo reload curtain and internal route transition remain modeled on the user's Aurea implementation. Readiness uses actual DOM, fonts and eager images, with bounded timeouts; no fake progress percentage or permanent scroll lock. External links, same-page anchors, modifier keys and browser history retain native behavior. Reduced motion skips route choreography. Mobile loading and route transitions are requested; mobile scroll effects remain prohibited.

Desktop scrolling requires width >=1024px, fine pointer and no reduced-motion preference. The hero photograph travels 36px to -36px, mission photograph settles from 36px, participation headings/copy settle from 20/24px, guide rows enter from 24px, and the people photograph scales 1.06 to 1. Scroll motion begins after the route curtain clears and GSAP context is reverted on media changes or navigation. Content stays opaque and usable.

## Member workspace and shared primitives

Custom Clerk authentication uses real email-code verification, safe relative redirects, accessible errors and pending states, resend/back controls and bot protection. Real Convex data powers /dashboard, /dashboard/profile, /dashboard/saved and /dashboard/resources. No fictional attendance or impact metrics. Save intent survives authentication; data clearing requires confirmation; errors preserve input. /members keeps its compatibility redirect.

Keep shadcn Field, InputOTP, Checkbox, DropdownMenu, AlertDialog, RadioGroup, Alert, Skeleton, Empty, InputGroup and ToggleGroup behavior. Default controls are 48px and compact controls >=44px; text inputs are >=16px. Pending states identify the operation. Long names and emails cannot widen the workspace.

## Accessibility, audiences and accepted limits

Students can read public guides without signing in; volunteers and Charlotte collaborators can use the real chapter form. Member pages support updating interests and managing saved guides. Preserve skip link, one h1, sequential headings, visible focus, semantic actions, labeled controls, associated errors, status announcements, AA contrast, menu focus return, safe areas and zoom. Keyboard users never encounter concealed controls. Check 360/390/768/1280/1440px and short 720px laptop height.

Exact leaders and chapter links are authoritative in lib/site.ts, including Supreeth Annand as Treasurer. Convex production exists, but Clerk still uses a development instance; production Clerk domain and credentials remain an infrastructure prerequisite. Browser viewport tests do not establish physical-phone behavior. No Lighthouse score is claimed. The October 9 finish verdict and screenshot provenance are recorded in docs/REDESIGN-BRIEF.md.
