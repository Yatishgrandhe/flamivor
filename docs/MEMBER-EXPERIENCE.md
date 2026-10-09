# Member experience — October 9, 2026

The Aurea reference informed the two-ring loading sequence and navigation curtain. The existing approved Flamivor image remains unchanged. The loader is present in server HTML, waits for its actual animation and critical document assets, and has a bounded fallback. Internal links, browser history and programmatic auth redirects use the route curtain. Recovery can continue a slow route without animation. Reduced-motion skips the choreography; mobile scroll effects remain disabled.

Authentication now uses a custom, accessible email-code card backed by Clerk. It supports invalid-code feedback, resending, a different email, safe local return paths and Clerk's current session tasks. Ordinary sign-in and account creation are separate; account creation retains Clerk's CAPTCHA. There is no custom development-mode card and no hidden Clerk badge. The Clerk instance itself still uses development credentials; changing the interface does not promote that instance to production.

The member application has four actual routes: overview, profile, saved guides and resources. Profile and bookmark data use the existing identity-scoped Convex functions. The interface includes loading, empty, pending, success and failure states, custom sign-out, and an explicit confirmation before clearing stored site data. No invented events or impact data are shown.

## Verification

- Production build, TypeScript and lint pass.
- Browser testing at 1280×720 and 390×844 confirms the loading ring, navigation curtain, profile layout and saved-guide page. Mobile public scrolling has no GSAP transforms and no page overflow.
- A temporary development-only Clerk fixture verified invalid-code feedback, resending, successful sign-in and sign-out, and a return URL that automatically saved the requested guide after authentication.
- The first profile save reported success. Name, role and interests persisted after a full reload. Bookmark save and removal updated the collection through Convex.
- Signed-in auth visits return to the requested member route. Mobile clear-data cancellation preserves the profile.
- Independent GPT-6 Luna review checked the new source and desktop/mobile screenshot evidence. It found and helped repair transition recovery and focus behavior.

Evidence is kept locally in `output/member-qa/` and excluded from Git and deployment. Security tasks and full new-account CAPTCHA completion were reviewed in source, not exercised with a real personal account. An optional Clerk Protect challenge is explicitly blocked rather than bypassed if Clerk requires it.
