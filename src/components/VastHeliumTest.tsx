import { useEffect, useState } from 'react';
import { ArrowRight, ChevronRight, Download, GitFork } from 'lucide-react';
import './vast-helium-test.css';

const GITHUB_URL = 'https://github.com/vstxx/vast-public';
const DOCS_URL = 'https://docs.vastbrowser.com';

const heroWords = ['Built', 'to', 'look', 'and', 'work', 'your', 'way.'];

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
    <div className="vh-page">
      <header className={`vh-nav${scrolled ? ' is-scrolled' : ''}`}>
        <a className="vh-brand" href="/" aria-label="Vast home">
          <img src="/logos/vast.png" alt="Vast" />
        </a>

        <nav className="vh-nav__links" aria-label="Primary navigation">
          <a href="#privacy">Privacy</a>
          <a href="#product">Product</a>
          <a href="#source">Open source</a>
          <a href={DOCS_URL}>Docs</a>
        </nav>

        <a className="vh-nav__download" href="/releases">
          Download
        </a>
      </header>

      <main>
        <section className="vh-hero" aria-labelledby="vh-title">
          <div className="vh-hero__ambient" aria-hidden="true" />
          <div className="vh-hero__inner">
            <h1 id="vh-title" className="vh-hero__title" aria-label="Built to look and work your way.">
              {heroWords.map((word, index) => (
                <span
                  key={word + index}
                  className="vh-hero__word"
                  style={{ animationDelay: `${120 + index * 90}ms` }}
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
              <a className="vh-button vh-button--dark" href="#privacy">
                Explore
                <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>

          <a className="vh-hero__scroll" href="#privacy" aria-label="Scroll to product details">
            <span />
          </a>
        </section>

        <section id="privacy" className="vh-section vh-section--split">
          <div className="vh-section__copy">
            <p className="vh-eyebrow">Private by default</p>
            <h2>Local by design.</h2>
            <p className="vh-lede">
              Vast stores normal browser and product data locally and does not collect browsing telemetry.
              Optional services and Labs features are kept separate instead of being quietly folded into the core browser.
            </p>

            <div className="vh-facts" aria-label="Privacy facts">
              <div>
                <span>Browsing data</span>
                <strong>Stored locally</strong>
              </div>
              <div>
                <span>Browsing telemetry</span>
                <strong>Not collected</strong>
              </div>
              <div>
                <span>Labs on fresh profiles</span>
                <strong>Off by default</strong>
              </div>
            </div>

            <a className="vh-text-link" href="/privacy">
              Read the privacy notice <ChevronRight aria-hidden="true" />
            </a>
          </div>

          <div className="vh-product-frame vh-product-frame--settings" aria-label="Vast settings preview">
            <div className="vh-product-frame__topbar">
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

        <section id="product" className="vh-section vh-section--centered">
          <p className="vh-eyebrow">Simple when you want it</p>
          <h2>One browser. Several ways to use it.</h2>
          <p className="vh-center-copy">
            Vertical tabs, horizontal tabs and Purist layouts sit on top of the same workspace model.
            Change the shape of the browser without rebuilding your workflow around it.
          </p>

          <div className="vh-layout-line" role="list" aria-label="Vast layouts">
            <span role="listitem">Horizontal</span>
            <i aria-hidden="true" />
            <span role="listitem">Vertical</span>
            <i aria-hidden="true" />
            <span role="listitem">Purist</span>
          </div>

          <div className="vh-product-frame vh-product-frame--onboarding" aria-label="Vast product preview">
            <div className="vh-product-frame__topbar">
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

        <section className="vh-section vh-section--editorial">
          <div>
            <p className="vh-eyebrow">All there, never in your way</p>
            <h2>The tools are there when the work gets heavy.</h2>
          </div>

          <div className="vh-editorial-copy">
            <p>
              Workspaces, tab groups, pinned tabs, split view and session restore keep large browsing sessions coherent.
              Smart tab unloading helps keep inactive work from becoming unnecessary overhead.
            </p>
            <p>
              Notes, reading list, bookmarks, history, downloads and quick links stay inside the browser,
              while the command palette and editable shortcuts keep common actions close.
            </p>
          </div>
        </section>

        <section className="vh-section vh-performance">
          <div className="vh-performance__intro">
            <p className="vh-eyebrow">Performance without theatre</p>
            <h2>Fast where you can actually feel it.</h2>
            <p>
              Vast 0.4.3 reduced avoidable work during startup, first page load, Settings and sidebar updates,
              and improved guest-page scroll responsiveness. No invented benchmark score. Just work on the paths you use.
            </p>
          </div>

          <div className="vh-release-strip">
            <span>Current public release</span>
            <strong>Vast 0.4.3</strong>
            <a href="/releases">
              Release notes <ChevronRight aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="vh-section vh-section--split vh-section--reverse">
          <div className="vh-extension-block" aria-hidden="true">
            <span className="vh-extension-block__small">Extensions</span>
            <strong>Chromium-compatible</strong>
            <span>.vext packages</span>
            <span>Extension Hub</span>
            <span>Vast Native API</span>
          </div>

          <div className="vh-section__copy">
            <p className="vh-eyebrow">Extend it</p>
            <h2>Use the extensions you already trust.</h2>
            <p className="vh-lede">
              Vast supports Chromium-compatible extensions alongside local <code>.vext</code> packages,
              the Vast Extensions Hub and the Vast Native API.
            </p>
            <a className="vh-text-link" href={DOCS_URL}>
              Extension documentation <ChevronRight aria-hidden="true" />
            </a>
          </div>
        </section>

        <section id="source" className="vh-section vh-source">
          <div className="vh-source__copy">
            <p className="vh-eyebrow">Transparent and open source</p>
            <h2>Inspectable from source to release.</h2>
            <p>
              Vast's official public source and release repository is published on GitHub under GPL-3.0-only.
              Release assets include checksums and source provenance so the code and the distributed build can be inspected independently.
            </p>
          </div>

          <div className="vh-source__actions">
            <a className="vh-button vh-button--light" href={GITHUB_URL} target="_blank" rel="noreferrer">
              <GitFork aria-hidden="true" />
              View source
            </a>
            <a className="vh-button vh-button--dark" href={DOCS_URL}>
              Documentation
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="vh-section vh-ready">
          <div>
            <p className="vh-eyebrow">Ready when you are</p>
            <h2>Try Vast on Windows.</h2>
            <p>
              Vast is beta software under active development. Windows x64 is the current release-supported target.
            </p>
          </div>

          <div className="vh-ready__actions">
            <a className="vh-button vh-button--light" href="/releases">
              <Download aria-hidden="true" />
              Download Vast
            </a>
            <span>0.4.3 · Windows x64 · Beta</span>
          </div>
        </section>

        <section className="vh-section vh-faq" aria-labelledby="vh-faq-title">
          <p className="vh-eyebrow">Even more details</p>
          <h2 id="vh-faq-title">Questions about Vast</h2>

          <div className="vh-faq__list">
            <details>
              <summary>What is Vast built on?</summary>
              <p>
                Vast uses Chromium page rendering through Electron, with a React application shell around the browser experience.
              </p>
            </details>
            <details>
              <summary>Does Vast collect browsing telemetry?</summary>
              <p>
                No. Normal browser and product data is stored locally, and Vast does not collect browsing telemetry.
              </p>
            </details>
            <details>
              <summary>Does Vast support Chromium extensions?</summary>
              <p>
                Yes. Vast supports Chromium-compatible extensions, local .vext packages, the Vast Extensions Hub and Vast Native API integrations.
              </p>
            </details>
            <details>
              <summary>Which platforms are currently release-supported?</summary>
              <p>
                Windows x64 is the continuously exercised public release target. macOS and Linux targets exist, but are not currently release-supported.
              </p>
            </details>
            <details>
              <summary>Is Vast open source?</summary>
              <p>
                Vast-owned public source is released under GPL-3.0-only. The public repository also contains release provenance and security documentation.
              </p>
            </details>
            <details>
              <summary>Is Vast finished?</summary>
              <p>
                No. Vast is beta software under active development, so bugs, regressions and incomplete features can still occur.
              </p>
            </details>
          </div>
        </section>
      </main>

      <footer className="vh-footer">
        <a className="vh-footer__brand" href="/">
          <img src="/logos/vast.png" alt="Vast" />
        </a>
        <div className="vh-footer__links">
          <a href="/releases">Releases</a>
          <a href={DOCS_URL}>Documentation</a>
          <a href={GITHUB_URL}>GitHub</a>
          <a href="/privacy">Privacy</a>
          <a href="/legal">Legal</a>
          <a href="/support">Support</a>
        </div>
        <span>Vast, Infinite By Design</span>
      </footer>
    </div>
  );
}
