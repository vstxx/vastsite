# Vast natural scroll and typography refresh

## Scope

Refresh the existing cinematic landing page without changing its content order or dark visual identity.

## Navigation and scrolling

- Remove the fixed Download control and right-side scene progress dots.
- Keep the small fixed Vast mark as the only corner control.
- Remove the dedicated fixed scroll container, mandatory scroll snapping, hidden-scrollbar presentation behavior, active-scene observation, and hash-based scene positioning.
- Use the document's native vertical scroll.
- Let every section derive its height from its content and responsive vertical padding. Do not enforce `height` or `min-height: 100vh`.
- Retain enough spacing to preserve the cinematic rhythm, with the opening section allowed to be more spacious than the content-heavy sections.

## Slogan section

- Replace all Cormorant/serif italic typography with Inter Display.
- Display `THE FALCON OF BROWSERS` in uppercase, bold Inter Display.
- Preserve the existing editorial hierarchy through two asymmetrically aligned lines rather than font-style contrast.
- Remove the purple divider and the complete supporting paragraph beginning with `Fast, private, local-first.`
- Keep the restrained purple atmosphere and entrance animation.

## Final CTA section

- Replace the serif italic headline with uppercase, bold Inter Display.
- Compose `TAKE COMMAND OF THE WEB` using the same two-line visual language as the slogan section.
- Remove the purple divider.
- Restyle `Coming soon` as a minimal rounded capsule: transparent or near-transparent surface, subtle neutral border, restrained text, no purple gradient or large glow.
- Keep the Windows and Linux availability labels.

## Responsive behavior

- Typography uses `clamp()` values and remains readable without clipping on narrow screens.
- Line offsets reduce on mobile so neither headline creates horizontal overflow.
- Section padding contracts on mobile while preserving clear separation between sections.
- Existing animations continue to honor reduced-motion preferences.

## Verification

- Add focused source-level regression checks for removed controls, removed snap behavior, required copy, and Inter-based headline styling where the current project has no component test harness.
- Run the regression checks, TypeScript production build, and ESLint.
- Render the page in a browser at desktop and mobile widths, inspect native scrolling, headline composition, CTA styling, and horizontal overflow.
