const GITHUB_URL = 'https://github.com/vstxx/vast-public';
const DOCS_URL = 'https://docs.vastbrowser.com';

const stats = [
  ['0', 'browsing telemetry'],
  ['3', 'interface layouts'],
  ['0.4.3', 'current public release'],
  ['GPL-3.0', 'Vast-owned source'],
];

export default function SiteDemoLower() {
  return (
    <>
      <section className="site-demo-stats">
        <div className="site-demo-shell site-demo-stats__grid">
          {stats.map(([value, label]) => (
            <div className="site-demo-stat" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="site-demo-statement">
        <div className="site-demo-shell">
          <h2>The browser should adapt to you, not the other way around.</h2>
          <p>
            Vast keeps the interface configurable without turning basic browsing into a setup project.
            Change the tab layout, keep separate workspaces and return to saved sessions without
            changing the way the rest of the browser works.
          </p>
        </div>
      </section>

      <section className="site-demo-feature">
        <div className="site-demo-shell site-demo-feature__grid">
          <div className="site-demo-feature__copy">
            <span className="site-demo-kicker">Local by design</span>
            <h2>Your browsing context stays on your device.</h2>
            <p>
              Vast stores normal browser and product data locally and does not collect browsing telemetry.
              Relay, when enabled for a build, is limited to operational data such as a random installation
              identifier, the running version and a cumulative launch count.
            </p>
            <a className="site-demo-text-link" href="/privacy">Read the privacy notice</a>
          </div>

          <div className="site-demo-data-panel" aria-label="Vast privacy model">
            <div><span>History</span><strong>Local</strong></div>
            <div><span>Bookmarks</span><strong>Local</strong></div>
            <div><span>Notes</span><strong>Local</strong></div>
            <div><span>Browsing telemetry</span><strong>None</strong></div>
          </div>
        </div>
      </section>

      <section className="site-demo-feature site-demo-feature--reverse">
        <div className="site-demo-shell site-demo-feature__grid">
          <div className="site-demo-layout-panel" aria-label="Vast interface layouts">
            <div className="site-demo-layout-row"><span>Horizontal</span><i /></div>
            <div className="site-demo-layout-row"><span>Vertical</span><i /></div>
            <div className="site-demo-layout-row"><span>Purist</span><i /></div>
          </div>

          <div className="site-demo-feature__copy">
            <span className="site-demo-kicker">Different layouts, same workflow</span>
            <h2>Change the interface without rebuilding your setup.</h2>
            <p>
              Vast supports horizontal tabs, vertical tabs and experimental Purist layouts.
              Workspaces, tab groups, pinned tabs, split view and session restore remain part of the
              same browsing model.
            </p>
          </div>
        </div>
      </section>

      <section className="site-demo-wide-copy">
        <div className="site-demo-shell site-demo-wide-copy__inner">
          <div>
            <span className="site-demo-kicker">When the session gets bigger</span>
            <h2>The useful tools stay close.</h2>
          </div>
          <p>
            Notes, reading list, bookmarks, history, downloads, quick links, search-engine shortcuts,
            Focus Reader and the command palette are built into the browser. Chromium-compatible
            extensions are supported alongside Vast&apos;s own extension surfaces.
          </p>
        </div>
      </section>

      <section className="site-demo-source">
        <div className="site-demo-shell site-demo-source__grid">
          <div className="site-demo-feature__copy">
            <span className="site-demo-kicker">Open source</span>
            <h2>The public source is there to inspect.</h2>
            <p>
              Vast-owned source code is published under GPL-3.0-only. Official releases include checksums
              and source provenance so the distributed files can be checked against the release record.
            </p>
          </div>

          <div className="site-demo-source__actions">
            <a className="site-demo-button site-demo-button--primary" href={GITHUB_URL} target="_blank" rel="noreferrer">
              View source
            </a>
            <a className="site-demo-button site-demo-button--quiet" href={DOCS_URL}>Documentation</a>
          </div>
        </div>
      </section>

      <section className="site-demo-final">
        <div className="site-demo-shell site-demo-final__inner">
          <div>
            <h2>Try Vast on Windows.</h2>
            <p>Windows x64 is the current release-supported target. Vast is still beta software.</p>
          </div>
          <a className="site-demo-button site-demo-button--primary" href="/releases">Download Vast</a>
        </div>
      </section>

      <footer className="site-demo-footer">
        <div className="site-demo-shell site-demo-footer__inner">
          <img src="/logos/vast.png" alt="Vast" />
          <div>
            <a href="/releases">Releases</a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a>
            <a href={DOCS_URL}>Documentation</a>
            <a href="/privacy">Privacy</a>
          </div>
          <span>Vast, Infinite By Design</span>
        </div>
      </footer>
    </>
  );
}
