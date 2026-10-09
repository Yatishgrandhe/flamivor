# Charlotte brief
Authored decisions within requested build scope; factual source is user logo and official mission research. User says: "please don't include anything form global please".
Vibe: bold, warm, inventive, local. Journey: Charlotte identity, mission, participation paths, practical resources, involvement.
Energy: expressive opening, quiet mission, active participation, calm useful resources, confident ending.
Feeling curve: belonging through Charlotte identity; possibility through accessible STEM; agency through three participation choices; confidence through usable guides; commitment through a saved interest profile.
Peak: opening layered field journal where a red thread ties a hands-on idea to Charlotte. "It's the site where a spark of curiosity finds its place in Charlotte."
Signature: anchored red thread and independently moving physical paper planes.
Range: expressive editorial, not premium-minimal. Grammar: chaptered editorial, natural flow, no pinning.
Assets: supplied phoenix logo; original generated tabletop still life, no fabricated event photography.
Mobile: entirely static scroll behavior as explicitly requested.
Score: hero differential parallax → mission emphasis → opportunity stagger → static resource shelf → invitation reveal. No authored dead-scroll span.

## Desktop motion revision, September 4
User requested more noticeable laptop scrolling and navbar matching the supplied logo.
Authored score: layered pinned hero (650px) → quiet values → kinetic mission → stacked Learn/Lead/Inspire cards (1400px, principal peak) → static resources → clipped closing invitation.
Signature: the curiosity note lifts off the workbench before the participation cards build into a shared stack. Distinct scenes, editorial grammar. Other continuous-film, product-demo, full-screen slideshow, dashboard, dense collage, single-world, and static-only approaches do not suit local chapter content and the explicit scrolling request.
Feeling curve: curiosity → belonging → possibility → agency → useful discovery → invitation.
Implementation uses GSAP with React cleanup for Scroll Craft's score; it does not mount the skill's global engine because that engine does not expose listener/RAF disposal for route changes and mobile resizing.
Desktop minimum 1024px wide and 650px tall, fine pointer, no reduced-motion preference. All other devices retain ordinary document flow with no pins or transforms.
Verified in Chrome at 1280×800: two pins, independently changing hero transforms, intermediate stacked cards, readable final card, zero horizontal overflow. At 375×812: no pins, motion disabled, all cards static, zero overflow. Navbar sampled logo RGB 138/1/3, exactly #8A0103. Actual phone hardware and OS reduced-motion preference were not tested.
