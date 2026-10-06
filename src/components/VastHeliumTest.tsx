import { useEffect, useState } from 'react';
import { ChevronRight, Download, GitFork } from 'lucide-react';
import './vast-helium-test.css';

const GITHUB_URL = 'https://github.com/vstxx/vast-public';
const DOCS_URL = 'https://docs.vastbrowser.com';

const HERO_WORDS = ['Built', 'to', 'look', 'and', 'work', 'your', 'way.'];

const SHORTCUTS = [
  ['yt', 'YouTube'],
  ['gh', 'GitHub'],
  ['w', 'Wikipedia'],
  ['g', 'Google'],
];

export default function VastHeliumTest() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Vast — Built to look and work your way';

    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      document.title = previousTitle;
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="vast-helium">
      <header className={`vh-nav${scrolled ? ' is-scrolled' : ''}`}>
        <a className="vh-nav__brand" href="/" aria-label="Vast home">
          <img src="/logos/vast.png" alt="Vast" />
        </a>

        <nav className="vh-nav__links" aria-label="Primary navigation">
          <a href="#product">Product</a>
          <a href="#source">Open source</a>
          <a href={DOCS_URL}>Docs</a>
        </nav>

        <a className="vh-button vh-button--small vh-button--light" href="/releases">
          Download
        </a>
      </header>

      <main>
        <section className="vh-hero">
          <div className="vh-shell vh-hero__inner">
            <h1 aria-label="Built to look and work your way.">
              {HERO_WORDS.map((word, index) => (
                <span
                  key={word + index}
                  className="vh-hero__word"
                  style={{ animationDelay: `${100 + index * 85}ms` }}
                  aria-hidden="true"
                >
                  {word}
                </span>
              ))}
            </h1>

            <div className="vh-hero__actions">
              <a className="vh-button vh-button--light" href="/releases">
                <Download aria-hidden="true" />
                Download Vast
              </a>
              <a className="vh-button vh-button--dark" href="#product">
                Explore
                <ChevronRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <div className="vh-shell">
          <section className="vh-intro-grid" aria-label="Vast overview">
            <article>
              <h2>Built around privacy and control</h2>
              <p>
                Normal browser and product data stays local. Vast does not collect browsing telemetry.
                Optional services are kept separate from the core browser.
              </p>
            </article>

            <article>
              <h2>Simple, the way you want it</h2>
              <p>
                Horizontal, vertical and Purist layouts use the same workspace model, so changing the
                interface does not mean changing the way you work.
              </p>
            </article>

            <article>
              <h2>All there, never in your way</h2>
              <p>
                Workspaces, tab groups, pinned tabs, split view, notes, history, downloads and the
                command palette are available when you need them.
              </p>
            </article>

            <article>
              <h2>Fast where you can feel it</h2>
              <p>
                Vast 0.4.3 reduced avoidable work during startup, first page load, Settings and sidebar
                updates, and improved guest-page scroll responsiveness.
              </p>
            </article>
          </section>

          <section id="product" className="vh-product-section">
            <div className="vh-section-heading">
              <h2>The browser changes shape. Your workflow does not.</h2>
              <p>
                Vast keeps the same core tools across its layouts. The preview below is the actual Vast
                interface used by the site, not a marketing reconstruction.
              </p>
            </div>

            <div className="vh-real-preview vh-real-preview--wide">
              <div className="vh-real-preview__bar" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <iframe
                src="/settings-preview/"
                title="Vast settings preview"
                loading="lazy"
                tabIndex={-1}
              />
            </div>
          </section>

          <section className="vh-product-row">
            <div className="vh-product-row__copy">
              <h2>Bring your setup with you.</h2>
              <p>
                Vast can import browser data during onboarding, then lets you decide how much of the
                interface you actually want to see.
              </p>
            </div>

            <div className="vh-real-preview vh-real-preview--compact">
              <div className="vh-real-preview__bar" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <iframe
                src="/onboarding-preview/"
                title="Vast onboarding preview"
                loading="lazy"
                tabIndex={-1}
              />
            </div>
          </section>

          <section className="vh-product-row vh-product-row--reverse">
            <div className="vh-shortcuts" aria-label="Search shortcut examples">
              {SHORTCUTS.map(([key, destination]) => (
                <div className="vh-shortcut" key={key}>
                  <code>{key}</code>
                  <span>{destination}</span>
                </div>
              ))}
            </div>

            <div className="vh-product-row__copy">
              <h2>Skip the long way around.</h2>
              <p>
                Search-engine shortcuts take a short prefix and route the rest of the query directly
                to the destination you chose.
              </p>
              <a className="vh-inline-link" href={DOCS_URL}>
                Read the documentation <ChevronRight aria-hidden="true" />
              </a>
            </div>
          </section>

          <section id="source" className="vh-product-row">
            <div className="vh-product-row__copy">
              <h2>Transparent from source to release.</h2>
              <p>
                Vast-owned source is published under GPL-3.0-only. Public releases include checksums
                and source provenance so the distributed build can be inspected independently.
              </p>
              <div className="vh-source-actions">
                <a className="vh-button vh-button--light" href={GITHUB_URL} target="_blank" rel="noreferrer">
                  <GitFork aria-hidden="true" />
                  View source
                </a>
                <a className="vh-button vh-button--text" href={DOCS_URL}>
                  Documentation
                </a>
              </div>
            </div>

            <dl className="vh-source-list">
              <div>
                <dt>Source</dt>
                <dd>vstxx/vast-public</dd>
              </div>
              <div>
                <dt>License</dt>
                <dd>GPL-3.0-only</dd>
              </div>
              <div>
                <dt>Releases</dt>
                <dd>Checksums + provenance</dd>
              </div>
            </dl>
          </section>

          <section className="vh-final-cta">
            <div>
              <h2>Ready when you are.</h2>
              <p>Vast is beta software. Windows x64 is the current release-supported target.</p>
            </div>
            <a className="vh-button vh-button--light" href="/releases">
              <Download aria-hidden="true" />
              Download Vast
            </a>
          </section>

          <section className="vh-faq" aria-labelledby="vh-faq-title">
            <h2 id="vh-faq-title">Even more details about Vast</h2>

            <div className="vh-faq__list">
              <details>
                <summary>Does Vast collect browsing telemetry?</summary>
                <p>No. Normal browser and product data is stored locally, and Vast does not collect browsing telemetry.</p>
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
                <p>No. Vast is designed to work with dedicated password-manager extensions instead of a browser-specific vault.</p>
              </details>
              <details>
                <summary>Is Vast open source?</summary>
                <p>Vast-owned public source is licensed under GPL-3.0-only and published in the official public repository.</p>
              </details>
              <details>
                <summary>Which platforms are release-supported?</summary>
                <p>Windows x64 is the continuously exercised public release target. macOS and Linux are not currently release-supported.</p>
              </details>
            </div>
          </section>
        </div>
      </main>

      <footer className="vh-footer">
        <div className="vh-shell vh-footer__inner">
          <a className="vh-footer__brand" href="/">
            <img src="/logos/vast.png" alt="Vast" />
          </a>

          <div className="vh-footer__columns">
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

          <span>Vast, Infinite By Design</span>
        </div>
      </footer>
    </div>
  );
}
