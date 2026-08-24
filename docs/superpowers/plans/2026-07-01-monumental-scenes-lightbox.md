# Monumental Scenes and Lightbox Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-center the Vast opening scene, add viewport-triggered cinematic headline reveals and monumental section spacing, and replace the rotating screenshot preview with six rounded cards that open an accessible fullscreen lightbox.

**Architecture:** Keep native document scrolling and the existing scene order. Use Framer Motion `useInView` locally inside the two headline scenes, keep spacing owned by the relevant scene components/CSS, and extract the fullscreen overlay into a focused `ScreenshotLightbox` rendered through a body portal so section clipping cannot constrain it. Continue using the existing Node source-regression suite and verify actual interaction with Playwright.

**Tech Stack:** React 19, TypeScript, Framer Motion 12, Lucide React, CSS, Node built-in test runner, Playwright CLI/cache for QA

---

## File structure

- Modify `tests/vast-refresh.test.mjs`: cover first-scene centering, viewport-triggered reveals, six-card gallery structure, and lightbox accessibility/interaction hooks.
- Modify `src/components/SceneLogo.tsx`: center the wordmark independently of the bottom scroll indicator.
- Modify `src/components/SceneSlogan.tsx`: trigger a staggered cinematic reveal on viewport entry.
- Modify `src/components/SceneProduct.tsx`: increase section separation without adding snap behavior.
- Modify `src/components/SceneDetails.tsx`: replace the rotating preview with six clickable cards and selected-image state.
- Create `src/components/ScreenshotLightbox.tsx`: own portal rendering, keyboard navigation, focus restoration, scroll lock, backdrop close, and controls.
- Modify `src/components/SceneCTA.tsx`: add a distinct viewport-triggered reveal and larger gallery separation.
- Modify `src/index.css`: style the six-card strip, fullscreen lightbox, responsive behavior, and focus states.

### Task 1: Add regression coverage for the new scene behavior

**Files:**
- Modify: `tests/vast-refresh.test.mjs`

- [ ] **Step 1: Write failing centering, reveal, gallery, and lightbox tests**

Append these tests:

```js
test('centers the Vast wordmark in a full opening viewport', async () => {
  const logo = await read('src/components/SceneLogo.tsx');

  assert.match(logo, /minHeight:\s*'100svh'/);
  assert.match(logo, /justifyContent:\s*'center'/);
  assert.match(logo, /position:\s*'absolute'[\s\S]*?bottom:\s*'clamp\(/);
});

test('reveals both monumental headlines on viewport entry', async () => {
  const [slogan, cta] = await Promise.all([
    read('src/components/SceneSlogan.tsx'),
    read('src/components/SceneCTA.tsx'),
  ]);

  for (const scene of [slogan, cta]) {
    assert.match(scene, /useInView/);
    assert.match(scene, /once:\s*true/);
    assert.match(scene, /filter:\s*'blur\(/);
    assert.match(scene, /scale:/);
  }

  assert.match(slogan, /minHeight:\s*'100svh'/);
  assert.match(cta, /minHeight:\s*'100svh'/);
});

test('renders six screenshot cards without automatic rotation', async () => {
  const [gallery, css] = await Promise.all([
    read('src/components/SceneDetails.tsx'),
    read('src/index.css'),
  ]);

  assert.match(gallery, /screenshots\.map/);
  assert.match(gallery, /ScreenshotLightbox/);
  assert.match(gallery, /Open .* fullscreen/);
  assert.doesNotMatch(gallery, /setInterval|AnimatePresence|activeShot/);
  assert.match(css, /grid-template-columns:\s*repeat\(6/);
  assert.match(css, /overflow-x:\s*auto/);
});

test('provides accessible fullscreen lightbox controls', async () => {
  const lightbox = await read('src/components/ScreenshotLightbox.tsx');

  assert.match(lightbox, /createPortal/);
  assert.match(lightbox, /aria-modal="true"/);
  assert.match(lightbox, /role="dialog"/);
  assert.match(lightbox, /Escape/);
  assert.match(lightbox, /ArrowLeft/);
  assert.match(lightbox, /ArrowRight/);
  assert.match(lightbox, /document\.body\.style\.overflow/);
  assert.match(lightbox, /returnFocusRef\.current\?\.focus/);
});
```

- [ ] **Step 2: Run the suite and verify the red state**

Run: `npm test`

Expected: the four new tests fail because the logo is padding-centered, headline animation is not fully viewport-triggered, the gallery still rotates a persistent preview, and `ScreenshotLightbox.tsx` does not exist.

- [ ] **Step 3: Commit the failing tests**

```powershell
git add -- tests/vast-refresh.test.mjs
git commit -m "test: cover monumental scenes and screenshot lightbox"
```

### Task 2: Re-center the opening scene and increase page rhythm

**Files:**
- Modify: `src/components/SceneLogo.tsx`
- Modify: `src/components/SceneProduct.tsx`
- Modify: `src/index.css`
- Test: `tests/vast-refresh.test.mjs`

- [ ] **Step 1: Center the logo independently of the scroll indicator**

In the `SceneLogo` section style, replace the responsive vertical padding with:

```tsx
minHeight: '100svh',
padding: '0 24px',
```

Replace the scroll-indicator wrapper positioning with:

```tsx
position: 'absolute',
left: '50%',
bottom: 'clamp(24px, 4vh, 42px)',
transform: 'translateX(-50%)',
```

This removes the indicator from normal flow so `justifyContent: 'center'` centers only the wordmark stack.

- [ ] **Step 2: Increase product-section breathing room**

In `SceneProduct.tsx`, replace its section padding with:

```tsx
padding: 'clamp(170px, 20vw, 290px) clamp(20px, 4vw, 60px) clamp(170px, 20vw, 290px)',
```

Keep `height`, `min-height`, and scroll snapping absent from the global `section[data-scene]` rule.

- [ ] **Step 3: Run the opening-scene regression**

Run: `node --test --test-name-pattern="centers the Vast" tests/vast-refresh.test.mjs`

Expected: PASS.

- [ ] **Step 4: Commit centering and spacing**

```powershell
git add -- src/components/SceneLogo.tsx src/components/SceneProduct.tsx
git commit -m "style: center Vast hero and expand scene rhythm"
```

### Task 3: Add viewport-triggered cinematic headline reveals

**Files:**
- Modify: `src/components/SceneSlogan.tsx`
- Modify: `src/components/SceneCTA.tsx`
- Test: `tests/vast-refresh.test.mjs`

- [ ] **Step 1: Convert the slogan reveal to viewport-driven motion**

Import `useInView`, create `const inView = useInView(ref, { once: true, margin: '-18% 0px' })`, and pass `inView` into each line reveal. The reusable line component must use these states:

```tsx
const hidden = reduced
  ? { opacity: 0 }
  : { opacity: 0, y: '42%', scale: 0.9, filter: 'blur(18px)', letterSpacing: '0.015em' };

const visible = {
  opacity: 1,
  y: '0%',
  scale: 1,
  filter: 'blur(0px)',
  letterSpacing: 'inherit',
};

<motion.span
  initial={hidden}
  animate={inView ? visible : hidden}
  transition={{ duration: reduced ? 0.35 : 1.35, ease: EASE, delay }}
  style={{ display: 'block', transformOrigin: '50% 70%' }}
>
  {children}
</motion.span>
```

Set the slogan section spacing to:

```tsx
minHeight: '100svh',
padding: 'clamp(210px, 24vw, 360px) clamp(24px, 7vw, 100px)',
```

Convert the ambient field to a `motion.div` with:

```tsx
initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.72 }}
animate={inView ? { opacity: 1, scale: 1 } : {}}
transition={{ duration: reduced ? 0.35 : 1.8, ease: EASE }}
```

- [ ] **Step 2: Strengthen the CTA reveal and gallery separation**

Keep the existing `useInView`, then set the section spacing to:

```tsx
minHeight: '100svh',
padding: 'clamp(260px, 29vw, 430px) clamp(24px, 6vw, 80px) clamp(170px, 20vw, 280px)',
```

Use these headline states:

```tsx
initial={reduced
  ? { opacity: 0 }
  : { opacity: 0, y: 90, scale: 0.88, filter: 'blur(20px)' }}
animate={inView
  ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
  : {}}
transition={{ duration: reduced ? 0.35 : 1.45, ease: EASE, delay: 0.08 }}
```

Animate the CTA aura from `{ opacity: 0, scale: 0.68 }` to `{ opacity: 1, scale: 1 }` over `1.9s`. Keep the button and platform labels staggered after the headline, and preserve their current copy and capsule styling.

- [ ] **Step 3: Run the headline regression**

Run: `node --test --test-name-pattern="monumental headlines" tests/vast-refresh.test.mjs`

Expected: PASS.

- [ ] **Step 4: Commit the headline motion**

```powershell
git add -- src/components/SceneSlogan.tsx src/components/SceneCTA.tsx
git commit -m "style: add cinematic viewport headline reveals"
```

### Task 4: Replace the rotating gallery with six cards and a fullscreen lightbox

**Files:**
- Create: `src/components/ScreenshotLightbox.tsx`
- Modify: `src/components/SceneDetails.tsx`
- Modify: `src/index.css`
- Test: `tests/vast-refresh.test.mjs`

- [ ] **Step 1: Create the focused lightbox component**

Create `src/components/ScreenshotLightbox.tsx`:

```tsx
import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

type Screenshot = {
  title: string;
  src: string;
};

type ScreenshotLightboxProps = {
  screenshots: Screenshot[];
  activeIndex: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ScreenshotLightbox({
  screenshots,
  activeIndex,
  onChange,
  onClose,
  returnFocusRef,
}: ScreenshotLightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion() ?? false;
  const isOpen = activeIndex !== null;

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus();
    };
  }, [isOpen, returnFocusRef]);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') {
        onChange((activeIndex - 1 + screenshots.length) % screenshots.length);
      }
      if (event.key === 'ArrowRight') {
        onChange((activeIndex + 1) % screenshots.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, onChange, onClose, screenshots.length]);

  if (activeIndex === null) return null;

  const activeShot = screenshots[activeIndex];
  const previous = () => onChange((activeIndex - 1 + screenshots.length) % screenshots.length);
  const next = () => onChange((activeIndex + 1) % screenshots.length);

  return createPortal(
    <motion.div
      className="screenshot-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${activeShot.title} screenshot preview`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduced ? 0.15 : 0.3 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button ref={closeRef} className="screenshot-lightbox__close" type="button" onClick={onClose} aria-label="Close screenshot preview">
        <X aria-hidden="true" />
      </button>
      <button className="screenshot-lightbox__arrow is-previous" type="button" onClick={previous} aria-label="Previous screenshot">
        <ChevronLeft aria-hidden="true" />
      </button>
      <motion.figure
        className="screenshot-lightbox__figure"
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, filter: 'blur(12px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: reduced ? 0.2 : 0.55, ease: EASE }}
      >
        <img src={activeShot.src} alt={`Vast browser screenshot: ${activeShot.title}`} />
        <figcaption>{activeShot.title}</figcaption>
      </motion.figure>
      <button className="screenshot-lightbox__arrow is-next" type="button" onClick={next} aria-label="Next screenshot">
        <ChevronRight aria-hidden="true" />
      </button>
    </motion.div>,
    document.body,
  );
}
```

- [ ] **Step 2: Replace the gallery component**

Replace `SceneDetails.tsx` with:

```tsx
import { useCallback, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import ScreenshotLightbox from './ScreenshotLightbox';

import shotNewTab from '../../assets/screenshots/01-new-tab-search-focused.png';
import shotNetwork from '../../assets/screenshots/02-network-devices-mock.png';
import shotTimeline from '../../assets/screenshots/03-session-timeline-mock.png';
import shotBookmarks from '../../assets/screenshots/04-avidae-bookmarks-sidebar.png';
import shotNotes from '../../assets/screenshots/05-notes.png';
import shotPdf from '../../assets/screenshots/06-pdf-viewer.png';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const screenshots = [
  { title: 'New tab', src: shotNewTab },
  { title: 'Network', src: shotNetwork },
  { title: 'Timeline', src: shotTimeline },
  { title: 'Avidae', src: shotBookmarks },
  { title: 'Notes', src: shotNotes },
  { title: 'PDF', src: shotPdf },
];

export default function SceneDetails() {
  const sectionRef = useRef<HTMLElement>(null);
  const returnFocusRef = useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reduced = useReducedMotion() ?? false;
  const inView = useInView(sectionRef, { once: true, margin: '-12% 0px' });
  const closeLightbox = useCallback(() => setActiveIndex(null), []);
  const changeLightbox = useCallback((index: number) => setActiveIndex(index), []);

  const openLightbox = (index: number, button: HTMLButtonElement) => {
    returnFocusRef.current = button;
    setActiveIndex(index);
  };

  return (
    <section ref={sectionRef} data-scene="3" id="scene-4" className="screenshot-gallery-scene">
      <div className="screenshot-gallery__ambient" aria-hidden="true" />
      <motion.div
        className="screenshot-gallery"
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 54 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: reduced ? 0.35 : 1.1, ease: EASE }}
        aria-label="Screenshot gallery"
      >
        {screenshots.map((shot, index) => (
          <motion.button
            key={shot.title}
            type="button"
            className="screenshot-card"
            aria-label={`Open ${shot.title} fullscreen`}
            onClick={(event) => openLightbox(index, event.currentTarget)}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 34, scale: 0.96 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: reduced ? 0.25 : 0.72, ease: EASE, delay: reduced ? 0 : index * 0.07 }}
          >
            <img src={shot.src} alt={`Vast browser screenshot: ${shot.title}`} />
            <span>{shot.title}</span>
          </motion.button>
        ))}
      </motion.div>

      <ScreenshotLightbox
        screenshots={screenshots}
        activeIndex={activeIndex}
        onChange={changeLightbox}
        onClose={closeLightbox}
        returnFocusRef={returnFocusRef}
      />
    </section>
  );
}
```

- [ ] **Step 3: Replace gallery and lightbox CSS**

Replace the current screenshot-gallery block with:

```css
@layer components {
  .screenshot-gallery-scene {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #050507;
    padding: clamp(170px, 20vw, 290px) clamp(24px, 4vw, 64px) clamp(210px, 24vw, 360px);
  }

  .screenshot-gallery__ambient {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 64% 50% at 50% 52%, rgba(72, 18, 170, 0.11), transparent 72%);
    pointer-events: none;
  }

  .screenshot-gallery {
    position: relative;
    z-index: 2;
    width: min(1500px, 100%);
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: clamp(10px, 1.2vw, 18px);
  }

  .screenshot-card {
    position: relative;
    min-width: 0;
    padding: 0;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.075);
    border-radius: clamp(10px, 1vw, 16px);
    background: rgba(255,255,255,0.018);
    box-shadow: 0 18px 48px rgba(0,0,0,0.34);
    cursor: zoom-in;
    transition: transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;
  }

  .screenshot-card:hover,
  .screenshot-card:focus-visible {
    z-index: 2;
    transform: translateY(-8px) scale(1.025);
    border-color: rgba(180, 126, 255, 0.28);
    box-shadow: 0 28px 70px rgba(0,0,0,0.5), 0 0 38px rgba(104,42,205,0.12);
    outline: none;
  }

  .screenshot-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: brightness(0.72) contrast(0.96) saturate(0.82);
    transition: filter 0.28s ease, transform 0.45s ease;
  }

  .screenshot-card:hover img,
  .screenshot-card:focus-visible img {
    filter: brightness(0.9) contrast(1) saturate(0.94);
    transform: scale(1.025);
  }

  .screenshot-card span {
    position: absolute;
    left: 12px;
    bottom: 10px;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.08em;
    color: rgba(240,235,248,0.72);
    text-shadow: 0 2px 12px rgba(0,0,0,0.95);
  }

  .screenshot-lightbox {
    position: fixed;
    inset: 0;
    z-index: 10000;
    display: grid;
    place-items: center;
    padding: clamp(18px, 4vw, 64px);
    background: rgba(2,2,5,0.88);
    backdrop-filter: blur(18px);
  }

  .screenshot-lightbox__figure {
    width: min(1440px, 88vw);
    max-height: 86vh;
    margin: 0;
    display: grid;
    gap: 12px;
  }

  .screenshot-lightbox__figure img {
    width: 100%;
    max-height: calc(86vh - 32px);
    object-fit: contain;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: clamp(12px, 1.4vw, 22px);
    box-shadow: 0 50px 120px rgba(0,0,0,0.72), 0 0 70px rgba(83,30,180,0.12);
  }

  .screenshot-lightbox__figure figcaption {
    text-align: center;
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(235,231,242,0.44);
  }

  .screenshot-lightbox__close,
  .screenshot-lightbox__arrow {
    position: fixed;
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    padding: 0;
    border: 1px solid rgba(255,255,255,0.11);
    border-radius: 999px;
    background: rgba(12,10,18,0.68);
    color: rgba(244,241,248,0.76);
    cursor: pointer;
  }

  .screenshot-lightbox__close { top: 22px; right: 22px; }
  .screenshot-lightbox__arrow { top: 50%; transform: translateY(-50%); }
  .screenshot-lightbox__arrow.is-previous { left: 22px; }
  .screenshot-lightbox__arrow.is-next { right: 22px; }
  .screenshot-lightbox__close svg,
  .screenshot-lightbox__arrow svg { width: 19px; height: 19px; }

  @media (max-width: 760px) {
    .screenshot-gallery-scene {
      padding: 150px 0 210px;
    }

    .screenshot-gallery {
      grid-template-columns: none;
      grid-auto-flow: column;
      grid-auto-columns: minmax(250px, 78vw);
      gap: 14px;
      width: 100%;
      overflow-x: auto;
      padding: 24px 22px 30px;
      scroll-padding-inline: 22px;
      scrollbar-width: none;
    }

    .screenshot-gallery::-webkit-scrollbar { display: none; }
    .screenshot-lightbox { padding: 70px 14px 78px; }
    .screenshot-lightbox__figure { width: 100%; }
    .screenshot-lightbox__arrow { top: auto; bottom: 18px; transform: none; }
    .screenshot-lightbox__arrow.is-previous { left: calc(50% - 58px); }
    .screenshot-lightbox__arrow.is-next { right: calc(50% - 58px); }
  }
}
```

- [ ] **Step 4: Run gallery and lightbox regressions**

Run: `node --test --test-name-pattern="screenshot|lightbox" tests/vast-refresh.test.mjs`

Expected: both tests pass.

- [ ] **Step 5: Commit the gallery replacement**

```powershell
git add -- src/components/SceneDetails.tsx src/components/ScreenshotLightbox.tsx src/index.css
git commit -m "feat: add fullscreen screenshot lightbox"
```

### Task 5: Verify behavior, responsiveness, and visual impact

**Files:**
- Modify only if verification exposes a defect in the files above.

- [ ] **Step 1: Run static verification**

Run:

```powershell
npm test
npm run build
npm run lint
git diff --check
```

Expected: all tests pass, Vite production build succeeds, ESLint exits without errors, and diff check prints nothing.

- [ ] **Step 2: Start Vite on an explicit free port**

Run: `npm run dev -- --host 127.0.0.1 --port 5187 --strictPort`

Expected: the Vast page is available at `http://127.0.0.1:5187` and no unrelated local project can take the QA URL.

- [ ] **Step 3: Exercise the complete desktop interaction path**

At `1440x900`, verify:

- the opening Vast wordmark center matches the viewport center within 2 px;
- a 360 px wheel action results in an intermediate scroll position and no snap;
- Falcon is initially hidden before entry, then resolves to sharp 600-weight Inter lines after entering view;
- the gallery shows exactly six rounded cards in one row;
- clicking card 1 opens a modal dialog and locks body scrolling;
- right arrow advances to card 2, left arrow returns to card 1;
- `Escape` closes and returns focus to card 1;
- reopening and clicking the backdrop closes the modal;
- CTA is visually separated from the gallery and resolves to sharp 600-weight Inter lines;
- fixed Vast mark returns the page to the top;
- console errors and warnings are empty.

- [ ] **Step 4: Exercise mobile and narrow layouts**

At `390x844` and `320x700`, verify:

- no horizontal page overflow;
- headline lines remain unbroken;
- the gallery remains one horizontally scrollable row;
- the sixth card can be reached by horizontal scrolling;
- lightbox image and all three controls fit in the viewport;
- next/previous, close, scroll lock, and focus return still work.

- [ ] **Step 5: Capture and inspect screenshots**

Capture desktop and mobile screenshots for the centered opening scene, Falcon reveal, six-card gallery, open lightbox, and final CTA. Inspect each local image with `view_image`, comparing copy, typography, spacing, palette, card geometry, modal controls, and responsive line breaks against the accepted design spec.

- [ ] **Step 6: Re-run verification after visual corrections**

Run: `npm test; npm run build; npm run lint; git diff --check`

Expected: every command succeeds after the last correction.

- [ ] **Step 7: Commit verification-driven corrections when present**

```powershell
git add -- src tests
git commit -m "fix: polish monumental Vast interactions"
```

Skip this commit if browser verification requires no source changes.
