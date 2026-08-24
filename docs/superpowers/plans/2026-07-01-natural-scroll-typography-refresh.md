# Natural Scroll and Typography Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace presentation-style scene navigation with native content-height scrolling and refresh both editorial headlines and the final CTA using Inter Display.

**Architecture:** Keep the existing five React scene components and their order. Simplify the global control component to the Vast mark only, let the document own scrolling, and express spacing within each scene instead of through viewport-height and snap rules. Add lightweight Node source-regression tests because this Vite project currently has no DOM test harness.

**Tech Stack:** React 19, TypeScript, Vite, Framer Motion, CSS, Node built-in test runner

---

## File structure

- Create `tests/vast-refresh.test.mjs`: source-level regression checks for controls, scrolling, typography, removed copy, and CTA styling.
- Modify `package.json`: expose the Node regression suite as `npm test`.
- Modify `src/App.tsx`: remove hash/scene scroll orchestration and render scenes in normal document flow.
- Modify `src/components/CinematicControls.tsx`: retain only the fixed Vast home mark.
- Modify `src/components/SceneLogo.tsx`: give the opening scene content-derived vertical spacing.
- Modify `src/components/SceneSlogan.tsx`: build the Inter Display slogan and remove divider/supporting copy.
- Modify `src/components/SceneProduct.tsx`: replace viewport-scene assumptions with responsive content spacing.
- Modify `src/components/SceneCTA.tsx`: build the matching Inter Display CTA and remove its divider.
- Modify `src/index.css`: remove scroll snap/fixed container rules and restyle the CTA capsule.

### Task 1: Add refresh regression coverage

**Files:**
- Create: `tests/vast-refresh.test.mjs`
- Modify: `package.json`

- [ ] **Step 1: Add the test command**

Add this script in `package.json`:

```json
"test": "node --test tests/vast-refresh.test.mjs"
```

- [ ] **Step 2: Write the failing regression tests**

Create `tests/vast-refresh.test.mjs`:

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('uses native document scrolling without scene controls', async () => {
  const [app, controls, css] = await Promise.all([
    read('src/App.tsx'),
    read('src/components/CinematicControls.tsx'),
    read('src/index.css'),
  ]);

  assert.doesNotMatch(app, /cinematic-scroll|scrollToHashScene|hashchange/);
  assert.doesNotMatch(controls, /Download|Scene navigation|SCENE_COUNT|useActiveScene|scrollToScene/);
  assert.doesNotMatch(css, /scroll-snap-type|scroll-snap-align|scroll-snap-stop/);
  assert.doesNotMatch(css, /height:\s*100svh|min-height:\s*100svh|overflow-y:\s*scroll/);
});

test('renders the slogan in Inter without divider or supporting copy', async () => {
  const slogan = await read('src/components/SceneSlogan.tsx');

  assert.match(slogan, /THE FALCON/);
  assert.match(slogan, /OF BROWSERS/);
  assert.match(slogan, /InterDisplay/);
  assert.match(slogan, /fontWeight:\s*600/);
  assert.doesNotMatch(slogan, /Cormorant|serif|fontStyle:\s*'italic'/);
  assert.doesNotMatch(slogan, /Fast, private, local-first|Built for focus|scaleX/);
});

test('renders the CTA in Inter with a minimal capsule', async () => {
  const [cta, css] = await Promise.all([
    read('src/components/SceneCTA.tsx'),
    read('src/index.css'),
  ]);

  assert.match(cta, /TAKE COMMAND/);
  assert.match(cta, /OF THE WEB/);
  assert.match(cta, /InterDisplay/);
  assert.doesNotMatch(cta, /Cormorant|serif|fontStyle:\s*'italic'|scaleX/);

  const buttonRule = css.match(/\.btn-main\s*\{[\s\S]*?\}/)?.[0] ?? '';
  assert.match(buttonRule, /border-radius:\s*999px/);
  assert.match(buttonRule, /border:\s*1px solid/);
  assert.doesNotMatch(buttonRule, /linear-gradient/);
});
```

- [ ] **Step 3: Run the tests and verify the red state**

Run: `npm test`

Expected: all three tests fail because the current scene controls, snap rules, serif typography, supporting copy, dividers, and gradient button still exist.

- [ ] **Step 4: Commit the failing tests**

```powershell
git add -- package.json tests/vast-refresh.test.mjs
git commit -m "test: cover Vast scroll and typography refresh"
```

### Task 2: Replace cinematic scene navigation with native scrolling

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/CinematicControls.tsx`
- Modify: `src/components/SceneLogo.tsx`
- Modify: `src/components/SceneProduct.tsx`
- Modify: `src/index.css`
- Test: `tests/vast-refresh.test.mjs`

- [ ] **Step 1: Remove App-level scrolling orchestration**

Replace `src/App.tsx` with:

```tsx
import './index.css';
import CinematicControls from './components/CinematicControls';
import SceneLogo from './components/SceneLogo';
import SceneSlogan from './components/SceneSlogan';
import SceneProduct from './components/SceneProduct';
import SceneDetails from './components/SceneDetails';
import SceneCTA from './components/SceneCTA';

export default function App() {
  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <CinematicControls />
      <main id="top">
        <SceneLogo />
        <SceneSlogan />
        <SceneProduct />
        <SceneDetails />
        <SceneCTA />
      </main>
    </>
  );
}
```

- [ ] **Step 2: Reduce the controls to the Vast mark**

Keep `EASE` and replace the component body in `src/components/CinematicControls.tsx` with a single semantic home link:

```tsx
export default function CinematicControls() {
  return (
    <motion.a
      href="#top"
      aria-label="Back to start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.4 }}
      whileHover={{ opacity: 0.9 }}
      transition={{ delay: 3.5, duration: 1.4, ease: EASE }}
      style={{
        position: 'fixed',
        top: '22px',
        left: '24px',
        zIndex: 200,
        lineHeight: 0,
      }}
    >
      <img
        src="/logos/v-v.png"
        alt="Vast"
        style={{ height: '17px', width: 'auto', objectFit: 'contain', display: 'block' }}
      />
    </motion.a>
  );
}
```

Remove `useEffect`, `useState`, `SCENE_COUNT`, `scrollToScene`, and `useActiveScene` from the file.

- [ ] **Step 3: Make document flow own scrolling**

Replace the initial base and cinematic scroll rules in `src/index.css` with:

```css
@layer base {
  *, *::before, *::after { box-sizing: border-box; }

  html {
    min-height: 100%;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    min-height: 100%;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    background: #050507;
    color: #e4e4eb;
    font-family: 'InterDisplay', system-ui, -apple-system, sans-serif;
    font-weight: 400;
  }
}

section[data-scene] {
  width: 100%;
  overflow: clip;
}
```

Delete the `#cinematic-scroll` rules and all `scroll-snap-*`, `height: 100svh`, and `min-height: 100svh` declarations. Preserve the existing narrow custom document scrollbar further down the stylesheet.

- [ ] **Step 4: Add content-derived spacing to the opening and product scenes**

In `SceneLogo.tsx`, add this section padding:

```tsx
padding: 'clamp(150px, 21vw, 260px) 24px clamp(140px, 18vw, 220px)',
```

Change the scroll-whisper positioning from absolute to normal-flow spacing so it cannot escape a content-height section:

```tsx
position: 'relative',
marginTop: 'clamp(64px, 9vw, 112px)',
```

In `SceneProduct.tsx`, replace its padding with:

```tsx
padding: 'clamp(88px, 11vw, 148px) clamp(20px, 4vw, 60px) clamp(76px, 9vw, 124px)',
```

- [ ] **Step 5: Run the native-scroll regression**

Run: `npm test -- --test-name-pattern="native document scrolling"`

Expected: PASS.

- [ ] **Step 6: Commit the native scrolling change**

```powershell
git add -- src/App.tsx src/components/CinematicControls.tsx src/components/SceneLogo.tsx src/components/SceneProduct.tsx src/index.css
git commit -m "refactor: use native content-height scrolling"
```

### Task 3: Rebuild the slogan in Inter Display

**Files:**
- Modify: `src/components/SceneSlogan.tsx`
- Test: `tests/vast-refresh.test.mjs`

- [ ] **Step 1: Replace the serif headline structure**

Keep `LineReveal`, the section atmosphere, and reduced-motion behavior. Replace the content inside the foreground container with:

```tsx
<h1
  aria-label="The Falcon of Browsers"
  style={{
    margin: 0,
    fontFamily: "'InterDisplay', system-ui, sans-serif",
    fontWeight: 600,
    lineHeight: 0.86,
    letterSpacing: '-0.065em',
    textTransform: 'uppercase',
    color: 'rgba(238,232,248,0.96)',
    textShadow: '0 0 120px rgba(140,60,255,0.14)',
  }}
>
  <LineReveal delay={0.06}>
    <span style={{ display: 'block', fontSize: 'clamp(52px, 9.5vw, 132px)' }}>
      THE FALCON
    </span>
  </LineReveal>
  <LineReveal delay={0.2} style={{ marginTop: 'clamp(8px, 1.2vw, 18px)' }}>
    <span
      style={{
        display: 'block',
        marginLeft: 'clamp(18px, 8vw, 124px)',
        fontSize: 'clamp(34px, 6.1vw, 82px)',
        letterSpacing: '-0.05em',
        color: 'rgba(225,218,238,0.82)',
      }}
    >
      OF BROWSERS
    </span>
  </LineReveal>
</h1>
```

Set the section padding to:

```tsx
padding: 'clamp(110px, 15vw, 190px) clamp(24px, 7vw, 100px)',
```

Delete the small `The` eyebrow, both Cormorant italic headings, divider animation, and supporting paragraph.

- [ ] **Step 2: Run the slogan regression**

Run: `npm test -- --test-name-pattern="slogan"`

Expected: PASS.

- [ ] **Step 3: Commit the slogan refresh**

```powershell
git add -- src/components/SceneSlogan.tsx
git commit -m "style: rebuild Vast slogan in Inter Display"
```

### Task 4: Rebuild the final CTA and capsule

**Files:**
- Modify: `src/components/SceneCTA.tsx`
- Modify: `src/index.css`
- Test: `tests/vast-refresh.test.mjs`

- [ ] **Step 1: Replace the CTA headline**

Keep the existing in-view and reduced-motion animation. Replace the headline content with:

```tsx
<motion.h2
  aria-label="Take Command of the Web"
  initial={reduced ? { opacity: 0 } : { y: '106%', opacity: 0 }}
  animate={inView ? { y: '0%', opacity: 1 } : {}}
  transition={{ duration: 1.15, ease: EASE, delay: 0.08 }}
  style={{
    margin: 0,
    fontFamily: "'InterDisplay', system-ui, sans-serif",
    fontWeight: 600,
    lineHeight: 0.86,
    letterSpacing: '-0.065em',
    textTransform: 'uppercase',
    color: 'rgba(238,232,248,0.96)',
    textShadow: '0 0 110px rgba(140,60,255,0.13)',
  }}
>
  <span style={{ display: 'block', fontSize: 'clamp(48px, 8.8vw, 124px)' }}>
    TAKE COMMAND
  </span>
  <span
    style={{
      display: 'block',
      marginTop: 'clamp(8px, 1.2vw, 18px)',
      marginLeft: 'clamp(18px, 8vw, 124px)',
      fontSize: 'clamp(32px, 5.8vw, 76px)',
      letterSpacing: '-0.05em',
      color: 'rgba(225,218,238,0.82)',
    }}
  >
    OF THE WEB
  </span>
</motion.h2>
```

Set the CTA section padding to:

```tsx
padding: 'clamp(112px, 15vw, 190px) clamp(24px, 6vw, 80px) clamp(96px, 13vw, 160px)',
```

Delete the animated divider between the headline and CTA control, and use `marginTop: 'clamp(38px, 5vw, 58px)'` on the button wrapper.

- [ ] **Step 2: Replace the gradient button with a minimal capsule**

Replace the first `.btn-main` rule and remove its pseudo-element styles:

```css
.btn-main {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 11px 22px;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 999px;
  background: rgba(255,255,255,0.025);
  color: rgba(235,232,241,0.68);
  font-family: inherit;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  line-height: 1;
  text-decoration: none;
  text-transform: uppercase;
  white-space: nowrap;
  transition: border-color 0.25s ease, background 0.25s ease, color 0.25s ease;
}

.btn-main:hover {
  border-color: rgba(255,255,255,0.22);
  background: rgba(255,255,255,0.045);
  color: rgba(245,243,248,0.9);
}
```

- [ ] **Step 3: Run all refresh regressions**

Run: `npm test`

Expected: 3 tests pass.

- [ ] **Step 4: Commit the CTA refresh**

```powershell
git add -- src/components/SceneCTA.tsx src/index.css
git commit -m "style: simplify Vast final CTA"
```

### Task 5: Verify production quality and responsive rendering

**Files:**
- Modify only if verification exposes a defect in the files listed above.

- [ ] **Step 1: Run static verification**

Run:

```powershell
npm test
npm run build
npm run lint
git diff --check
```

Expected: tests pass, TypeScript/Vite production build succeeds, ESLint exits without errors, and `git diff --check` prints nothing.

- [ ] **Step 2: Run the local production preview**

Run: `npm run dev -- --host 127.0.0.1`

Expected: Vite prints a working local URL.

- [ ] **Step 3: Inspect desktop and mobile layouts**

Capture and inspect the page at `1440x900` and `390x844`. Confirm:

- the browser performs ordinary continuous scrolling without snapping;
- every section ends after its content and responsive padding;
- no Download button or right-side dots appear;
- both headlines use bold upright Inter Display with the intended two-line offset;
- neither purple divider nor the local-first paragraph appears;
- the Coming soon control is a restrained rounded capsule;
- there is no horizontal overflow or clipped headline on mobile.

- [ ] **Step 4: Re-run verification after any visual correction**

Run: `npm test; npm run build; npm run lint; git diff --check`

Expected: every command succeeds after the final correction.

- [ ] **Step 5: Commit any verification-driven correction**

```powershell
git add -- src tests package.json
git commit -m "fix: polish Vast responsive refresh"
```

Skip this commit when visual verification requires no further edits.
