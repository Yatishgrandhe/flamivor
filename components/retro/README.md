# Retro primitives

Installed with the shadcn CLI from the official Neobrutalism.com Radix registry on October 9, 2026 (retroui.dev redirects there).

Sources: https://neobrutalism.com/r/radix/button.json and https://neobrutalism.com/r/radix/card.json
Docs: https://neobrutalism.com/docs/components/button and /docs/components/card

CLI view inspected the upstream source first. Registry file targets were changed to this directory before CLI installation so existing member primitives were preserved. Adaptations: chapter semantic tokens, regular type, 44/48px targets, thin outlines, 2px offset shadows, fine-pointer-only hover and reduced-motion/keyboard handling. Styling is in public-design.css; public-site scopes the public palette. Radix Slot retains link semantics. No extra runtime library or provider.
