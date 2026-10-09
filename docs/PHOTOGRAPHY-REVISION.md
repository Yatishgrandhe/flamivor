# Photography and entrance revision — October 8, 2026

The user requested real Unsplash photography and an obvious animation on refresh. The official supplied logo file is unchanged. Hero art is replaced with a real collaborative-learning photograph; the mission has an overhead study photograph, and a panoramic classroom scene anchors the page. About and Join also include photography.

## Photograph sources

- Brooke Cagle — https://unsplash.com/photos/three-people-sitting-in-front-of-table-laughing-together-g1Kr4Ozfoac
- Jaykumar Bherwani — https://unsplash.com/photos/students-studying-together-at-a-long-table-Dg8WzlOE1as
- Vitaly Gariev — https://unsplash.com/photos/students-listen-to-a-lecture-in-a-classroom-8c0ndhIXDzQ

All three source pages identify the photographs as free under the Unsplash License. Each image was visually inspected. CDN URLs are served directly using a responsive Next Image loader, with captions linking to their photographers. These are stock photographs, not chapter event documentation or portraits of the leadership team.

## Motion

CSS begins the entrance before React hydration: staggered headline lifts, photo scale reveal, action/description fade, and a nonblocking 1.6-second top stroke. Refresh replays the sequence. Images also display a real loading state and an error fallback. No artificial delay blocks content. No-JavaScript styles allow photos to remain visible.

Desktop GSAP provides stronger photo parallax, a panoramic classroom zoom, the progressive participation line and chapter shifts. CSS entry and GSAP scrolling act on separate nested elements to avoid overwriting one another. Mobile, touch and reduced-motion users receive static content. The approved logo stays still and unchanged.

## Verification

In the production browser build, refresh transforms were sampled while the sequence played: the third headline line moved from 121px to 19px, and the photo frame scaled from 1.053 to 1.008. The top stroke was visible. All three images loaded directly from images.unsplash.com, using responsive 640px variants on mobile. Hero scroll translation changed from 60px to 28px; the classroom band changed scale from 1.116 to 1.083 and translated from 13.6px to -14.5px. Resizing to 390px cleared GSAP transforms and removed the active motion flag; computed entry animation was none. Home, About and Join were checked at 360, 768 and 1440px: one H1, no horizontal overflow or visible broken images. The 1280×720 hero CTA remained above the fold. Browser error log was empty.

Independent GPT-6 Luna review found no concrete blockers in the sources or fresh screenshots. Evidence: output/photography-qa/home-laptop.jpg, home-mobile.jpg, home-desktop.jpg, learning-scene.jpg and join-desktop.jpg. Build, TypeScript, lint and whitespace checks passed. The official logo hash remains b86edf707dcef60c3aac29dab7c3c34604e42015de2ee6746e19265c6da5faf2. Lighthouse scores, an actual OS reduced-motion preference change and real-device motion testing are not claimed; reduced-motion behavior was reviewed in the media-query guards.
