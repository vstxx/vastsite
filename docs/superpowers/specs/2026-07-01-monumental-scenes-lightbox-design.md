# Vast monumental scenes and lightbox design

## Goal

Increase the landing page's sense of scale while preserving native manual scrolling, the existing dark visual system, and the current content order.

## Opening scene

- The opening scene uses `min-height: 100svh` so the Vast wordmark is centered in the initial viewport.
- The wordmark remains mathematically centered on both axes and is not displaced by the scroll indicator.
- The scroll indicator is positioned independently near the bottom edge.
- Existing ambient motion and glow remain restrained and continue to honor reduced-motion preferences.

## Monumental rhythm

- Native document scrolling remains enabled with no scroll snapping or automatic scene movement.
- Increase responsive vertical spacing between the logo, slogan, feature section, gallery, and final CTA.
- Headline scenes receive approximately a viewport of visual breathing room through responsive minimum height and padding.
- Gallery and CTA spacing must remain clearly separated on desktop and mobile without creating horizontal overflow.

## Falcon entrance

- Trigger the slogan animation when the section enters the viewport rather than immediately on page load.
- Animate the two headline lines with staggered opacity, vertical movement, scale, blur, and tracking changes.
- Expand a restrained purple radial aura behind the text during the reveal.
- The animation runs once per page visit and resolves to stable, fully readable text.
- Reduced motion uses a short opacity-only reveal.

## Screenshot gallery

- Remove the persistent large preview and automatic screenshot rotation.
- Render all six screenshots as equal rounded cards in a single desktop row.
- On narrow screens, preserve a single row as a horizontally scrollable, touch-friendly strip with scroll padding and no forced wrapping.
- Cards use a consistent 16:9 ratio, subtle border and hover/focus lift, with screenshot brightness sufficient to recognize the content.
- Clicking or activating a card opens that screenshot in a fullscreen lightbox.

## Fullscreen lightbox

- Display the selected screenshot within a fullscreen fixed overlay above all page chrome.
- Use a dark translucent backdrop, a large contained image, rounded frame, close button, and previous/next controls.
- Support closing via the close button, backdrop click, and `Escape`.
- Support previous/next navigation through buttons and left/right arrow keys, wrapping at the ends.
- Lock document scrolling while open and restore it on close.
- Move focus to the close control on open and return focus to the originating thumbnail on close.
- Provide semantic dialog labeling and descriptive image alt text.
- Reduced motion disables scale/blur transitions and keeps a short fade.

## Final CTA entrance

- Increase the visual separation between the gallery and final CTA.
- Reveal `TAKE COMMAND / OF THE WEB` when it enters the viewport using a cinematic stagger related to, but distinct from, the Falcon animation.
- Use opacity, vertical movement, scale, blur, and a broad expanding aura without changing the approved Inter Display typography or CTA capsule.
- Animate the capsule and platform labels after the headline.
- Reduced motion uses opacity-only transitions.

## Responsive and quality constraints

- Headline lines remain unbroken and do not create horizontal overflow at 320 px or wider.
- The six-card gallery is fully keyboard accessible and touch scrollable.
- The lightbox image always fits inside the viewport and controls remain reachable at mobile sizes.
- Existing product/feature content and wording remain unchanged.
- No new dependencies are required; use React, Framer Motion, and the existing assets.

## Verification

- Add regression coverage for viewport-triggered headline animations, first-scene centering, six-card gallery structure, lightbox interaction hooks, and preserved native scrolling.
- Run tests, TypeScript production build, ESLint, and diff checks.
- Verify desktop at 1440x900, mobile at 390x844, and narrow mobile at 320x700.
- Exercise thumbnail open, next/previous, `Escape` close, backdrop close, scroll lock, focus return, native wheel scrolling, and fixed-logo return-to-top.
