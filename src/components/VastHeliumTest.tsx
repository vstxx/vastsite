import { useEffect, useState } from 'react';
import { ChevronRight, Download, GitFork } from 'lucide-react';
import BrowserMockup from './BrowserMockup';
import './vast-helium-test.css';

const GITHUB_URL = 'https://github.com/vstxx/vast-public';
const DOCS_URL = 'https://docs.vastbrowser.com';

function VastMark() {
  return (
    <span className="helium-vast-mark" aria-hidden="true">
      <img src="/logos/vasticon.png" alt="" />
    </span>
  );
}

function SearchShortcutsVisual() {
  const rows = [
    ['g', 'Google', 'best coffee in warsaw'],
    ['w', 'Wikipedia', 'browser engine'],
    ['gh', 'GitHub', 'vstxx/vast-public'],
    ['yt', 'YouTube', 'ambient mix'],
  ];

  return (
    <div className="helium-shortcuts-visual" aria-hidden="true">
      <div className="helium-shortcuts-cloud" />
      {rows.map(([key, engine, query], index) => (
        <div className={'helium-shortcut-row helium-shortcut-row--' + (index + 1)} key={key}>
          <span className="helium-shortcut-key">{key}</span>
          <div className="helium-shortcut-search">
            <span className="helium-shortcut-engine">{engine}</span>
            <i />
            <span>{query}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductivityVisual() {
  return (
    <div className="helium-feature-visual helium-productivity-visual" aria-hidden="true">
      <div className="helium-window">
        <div className="helium-window__chrome">
          <span />
          <span />
          <span />
          <div className="helium-window__address">research workspace</div>
        </div>
        <div className="helium-split-view">
          <div className="helium-split-pane helium-split-pane--left">
            <span className="helium-mini-label">Workspace</span>
            <strong>Research</strong>
            <div className="helium-note-lines">
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="helium-split-pane helium-split-pane--right">
            <div className="helium-browser-page">
              <div className="helium-browser-page__top">
                <span />
                <span />
                <span />
              </div>
              <div className="helium-browser-page__hero" />
              <div className="helium-browser-page__line" />
              <div className="helium-browser-page__line helium-browser-page__line--short" />
            </div>
          </div>
        </div>
      </div>
      <div className="helium-floating-tools">
        <span>Split view</span>
        <span>Notes</span>
        <span>Groups</span>
      </div>
    </div>
  );
}

function PerformanceVisual() {
  return (
    <div className="helium-feature-visual helium-performance-visual" aria-hidden="true">
      <div className="helium-performance-window helium-performance-window--back">
        <div className="helium-performance-window__chrome">
          <span />
          <span />
          <span />
        </div>
        <div className="helium-performance-window__body">
          <div className="helium-context-row">Tab actions</div>
          <div className="helium-context-row is-highlighted">Sleep tab</div>
          <div className="helium-context-row">Close other tabs</div>
        </div>
      </div>
      <div className="helium-performance-window helium-performance-window--front">
        <div className="helium-performance-window__chrome">
          <span />
          <span />
          <span />
        </div>
        <div className="helium-performance-window__body">
          <span className="helium-mini-label">Memory</span>
          <strong>Inactive tabs can sleep.</strong>
          <div className="helium-meter">
            <i />
          </div>
          <small>Keep the session. Drop the unnecessary work.</small>
        </div>
      </div>
    </div>
  );
}

function SourceVisual() {
  const commits = [
    ['0.4.3', 'Optimize startup and scroll paths', '58d2638'],
    ['runtime', 'Pin compatibility runtime revision', '41c9d72'],
    ['security', 'Tighten import path handling', 'a4e73bb'],
    ['release', 'Publish source provenance', 'c2af019'],
  ];

  return (
    <div className="helium-source-visual" aria-hidden="true">
      <div className="helium-source-column">
        {commits.map(([tag, title, sha]) => (
          <div className="helium-commit" key={sha}>
            <span>{tag}</span>
            <strong>{title}</strong>
            <code>{sha}</code>
          </div>
        ))}
      </div>
      <div className="helium-source-column helium-source-column--second">
        {commits.slice().reverse().map(([tag, title, sha]) => (
          <div className="helium-commit" key={sha + '-b'}>
            <span>{tag}</span>
            <strong>{title}</strong>
            <code>{sha}</code>
          </div>
        ))}
      </div>
      <div className="helium-source-fade" />
    </div>
  );
}

function ComparisonVisual({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <div className="helium-comparison-visual">
      <div className="helium-comparison-base" aria-hidden="true">
        <div className="helium-demo-page helium-demo-page--noisy">
          <div className="helium-demo-nav" />
          <div className="helium-demo-ad helium-demo-ad--top">Sponsored</div>
          <div className="helium-demo-content">
            <div className="helium-demo-article">
              <span />
              <strong />
              <i />
              <i />
              <i />
            </div>
            <div className="helium-demo-sidebar">
              <span>Cookie notice</span>
              <span>Newsletter</span>
              <span>Recommended</span>
            </div>
          </div>
          <div className="helium-demo-cookie">
            <strong>Before you continue</strong>
            <span />
            <button type="button">Accept all</button>
          </div>
        </div>
      </div>

      <div
        className="helium-comparison-clean"
        style={{ clipPath: 'inset(0 ' + (100 - value) + '% 0 0)' }}
        aria-hidden="true"
      >
        <div className="helium-demo-page helium-demo-page--clean">
          <div className="helium-demo-nav" />
          <div className="helium-demo-content">
            <div className="helium-demo-article">
              <span />
              <strong />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </div>

      <div className="helium-comparison-divider" style={{ left: value + '%' }} aria-hidden="true">
        <span>↔</span>
      </div>
      <input
        className="helium-comparison-range"
        type="range"
        min="10"
        max="90"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label="Compare a noisy page with a cleaner browsing view"
      />
    </div>
  );
}


export default function VastHeliumTest() {
  const [scrolled, setScrolled] = useState(false);
  const [comparisonValue, setComparisonValue] = useState(56);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Vast — private, local-first, yours';

    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      document.title = previousTitle;
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="helium-clone">
      <header className={'helium-nav' + (scrolled ? ' is-scrolled' : '')}>
        <a className="helium-nav__brand" href="/" aria-label="Vast home">
          <img src="/logos/vast.png" alt="Vast" />
        </a>
        <nav className="helium-nav__links" aria-label="Primary">
          <a href="#shortcuts">Shortcuts</a>
          <a href={DOCS_URL}>Docs</a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a>
        </nav>
        <a className="helium-pill helium-pill--header" href="/releases">Download</a>
      </header>

      <main>
        <section className="helium-hero">
          <div className="helium-hero__grid" aria-hidden="true" />
          <div className="helium-hero__content">
            <VastMark />
            <h1>Meet Vast, the private browser built around you.</h1>
            <p>
              Local-first by design, deeply customizable, and focused on the web instead of getting in your way.
            </p>
            <a className="helium-pill helium-pill--primary" href="/releases">
              <Download aria-hidden="true" />
              Download Vast
            </a>
            <span className="helium-hero__meta">Beta · Windows x64</span>
          </div>
        </section>

        <section className="helium-main-shell">
          <div className="helium-feature-grid">
            <article>
              <h2>Built around privacy and control</h2>
              <p>
                Normal browser and product data stays local. Vast does not collect browsing telemetry, and optional services are separated from the core browser.
              </p>
              <p>
                Your tabs, history, bookmarks and browsing context stay yours.
              </p>
            </article>

            <article>
              <h2>Simple, the way you want it</h2>
              <p>
                Switch between horizontal, vertical and Purist layouts, then tune the interface without rebuilding your workflow around the browser.
              </p>
              <p>
                The browser can be compact when you want focus and expansive when you need control.
              </p>
            </article>

            <article>
              <h2>All there, never in your way</h2>
              <p>
                Workspaces, tab groups, pinned tabs, split view, notes, reading list, history, downloads and a command palette are there when the session gets heavy.
              </p>
              <p>
                Chromium-compatible extensions fit into the same workflow.
              </p>
            </article>

            <article>
              <h2>Fast where you can feel it</h2>
              <p>
                Vast 0.4.3 reduced avoidable work during startup, first page load, Settings and sidebar updates, while improving guest-page scroll responsiveness.
              </p>
              <p>
                Smart tab unloading and manual sleep controls help keep inactive work from becoming unnecessary overhead.
              </p>
            </article>
          </div>

          <div className="helium-browser-stage">
            <div className="helium-browser-stage__wash" aria-hidden="true" />
            <div className="helium-browser-stage__window">
              <BrowserMockup />
            </div>
            <div className="helium-layout-switcher" aria-label="Vast layout options">
              <span className="is-active">Horizontal</span>
              <span>Vertical</span>
              <span>Purist</span>
            </div>
          </div>

          <div className="helium-dual-visuals">
            <ProductivityVisual />
            <PerformanceVisual />
          </div>

          <section id="shortcuts" className="helium-asymmetric-section">
            <div className="helium-asymmetric-copy">
              <h2>Skip the long way around</h2>
              <p>
                Vast search-engine shortcuts let you jump directly where you are going, without turning a simple destination into a multi-step routine.
              </p>
              <a href={DOCS_URL} className="helium-inline-link">
                Explore Vast shortcuts <ChevronRight aria-hidden="true" />
              </a>
            </div>
            <SearchShortcutsVisual />
          </section>

          <section className="helium-asymmetric-section helium-asymmetric-section--source">
            <div className="helium-asymmetric-copy">
              <h2>Transparent and open source</h2>
              <p>
                Vast-owned source is published under GPL-3.0-only. Public releases include checksums and source provenance so the code and distributed artifacts can be inspected independently.
              </p>
              <div className="helium-inline-actions">
                <a className="helium-pill helium-pill--primary" href={GITHUB_URL} target="_blank" rel="noreferrer">
                  <GitFork aria-hidden="true" />
                  Check out the source
                </a>
                <a className="helium-pill helium-pill--ghost" href={DOCS_URL}>
                  Documentation
                </a>
              </div>
            </div>
            <SourceVisual />
          </section>

          <section className="helium-comparison-section">
            <div className="helium-comparison-copy">
              <h2>A calmer browser, by default</h2>
              <p>
                Browsing should leave room for the page itself. Drag the slider to compare a noisy page with a cleaner browsing surface.
              </p>
              <div className="helium-comparison-labels">
                <strong>Vast</strong>
                <span>compared to</span>
                <button type="button">a noisy browser</button>
              </div>
            </div>
            <ComparisonVisual value={comparisonValue} onChange={setComparisonValue} />
          </section>

          <section className="helium-ready-section">
            <div className="helium-ready-icon">
              <img src="/logos/vasticon.png" alt="" />
            </div>
            <h2>Ready when you are</h2>
            <p>
              Bring your browser data across, keep your workflow familiar, and shape the interface from there.
            </p>
            <div className="helium-ready-actions">
              <a className="helium-pill helium-pill--primary" href="/releases">
                <Download aria-hidden="true" />
                Download Vast
              </a>
              <a className="helium-ready-later" href="#details">Maybe later</a>
            </div>
          </section>

          <section id="details" className="helium-faq-section">
            <h2>Even more details about Vast</h2>
            <div className="helium-faq-list">
              <details>
                <summary>Does Vast collect browsing telemetry?</summary>
                <p>No. Vast stores normal browser and product data locally and does not collect browsing telemetry.</p>
              </details>
              <details>
                <summary>Does Vast support Chromium extensions?</summary>
                <p>Yes. Vast supports Chromium-compatible extensions, local .vext packages, the Vast Extensions Hub and Vast Native API integrations.</p>
              </details>
              <details>
                <summary>What layouts does Vast support?</summary>
                <p>Vast includes horizontal and vertical tab layouts together with experimental Purist layouts, plus workspaces and split view.</p>
              </details>
              <details>
                <summary>Does Vast have a built-in password manager?</summary>
                <p>Vast is designed to work with dedicated password-manager extensions rather than locking passwords into a browser-specific vault.</p>
              </details>
              <details>
                <summary>Is Vast open source?</summary>
                <p>Vast-owned public source is licensed under GPL-3.0-only and published in the official public repository together with release provenance documentation.</p>
              </details>
              <details>
                <summary>Which platform is currently supported?</summary>
                <p>Windows x64 is the continuously exercised public release target. macOS and Linux targets exist, but are not currently release-supported.</p>
              </details>
              <details>
                <summary>Does Vast update automatically?</summary>
                <p>Direct Vast releases include an updater path, while Microsoft Store installations use Store-managed updates. Release notes document current updater behavior.</p>
              </details>
              <details>
                <summary>Is Vast finished?</summary>
                <p>No. Vast is beta software under active development, so bugs, regressions and incomplete features can still occur.</p>
              </details>
              <details>
                <summary>Where can I report issues?</summary>
                <p>Use the official support surface or the Vast public GitHub repository. Security-sensitive reports should follow the published security guidance.</p>
              </details>
            </div>
          </section>
        </section>
      </main>

      <footer className="helium-footer">
        <div className="helium-footer__brand">
          <VastMark />
          <img src="/logos/vast.png" alt="Vast" />
        </div>

        <div className="helium-footer__columns">
          <div>
            <strong>Resources</strong>
            <a href="/releases">Releases</a>
            <a href={DOCS_URL}>Documentation</a>
            <a href="/support">Support</a>
          </div>
          <div>
            <strong>Community</strong>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://discord.gg/f7bnZ3cmq" target="_blank" rel="noreferrer">Discord</a>
          </div>
          <div>
            <strong>Legal</strong>
            <a href="/privacy">Privacy</a>
            <a href="/legal">Legal information</a>
            <a href="/publishing-policy">Publishing policy</a>
          </div>
        </div>

        <span className="helium-footer__made">Vast, Infinite By Design</span>
      </footer>
    </div>
  );
}
