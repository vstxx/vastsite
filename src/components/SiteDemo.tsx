import { useEffect, useState } from 'react';
import './site-demo.css';

const GITHUB_URL = 'https://github.com/vstxx/vast-public';
const DOCS_URL = 'https://docs.vastbrowser.com';

export default function SiteDemo() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Vast — Site Demo';

    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      document.title = previousTitle;
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="site-demo">
      <header className={`site-demo-nav${scrolled ? ' is-scrolled' : ''}`}>
        <div className="site-demo-shell site-demo-nav__inner">
          <a className="site-demo-nav__brand" href="/" aria-label="Vast home">
            <img src="/logos/vast.png" alt="Vast" />
          </a>

          <nav className="site-demo-nav__links" aria-label="Primary navigation">
            <a href="/support">Donate</a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a>
            <a href={DOCS_URL}>Documentation</a>
          </nav>
        </div>
      </header>

      <main className="site-demo-main">
        <section className="site-demo-hero">
          <div className="site-demo-shell">
            <div className="site-demo-hero__grid">
              <div className="site-demo-hero__left">
                <h1>
                  <span>Built to look and</span>
                  <span>work your way.</span>
                </h1>

                <div className="site-demo-actions">
                  <a className="site-demo-button site-demo-button--primary" href="/releases">
                    Download
                  </a>
                  <a
                    className="site-demo-button site-demo-button--quiet"
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              </div>

              <p className="site-demo-hero__copy">
                Vast is a browser you can shape around the way you actually use the web.
                Normal browser data stays on your device, while the interface stays flexible
                enough to get out of the way when you want it to.
              </p>
            </div>

            <div className="site-demo-preview-wrap">
              <img
                className="site-demo-preview-image"
                src="/site-demo/vast-main-ui.webp"
                alt="Vast Browser showing the Research workspace and new tab page"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
