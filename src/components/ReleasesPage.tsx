import { ArrowLeft, ChevronDown, Download, Info, MessageCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import SiteFooter from './SiteFooter';

type ReleaseFile = {
  label: string;
  file: string;
  url?: string;
  size?: string;
};

type ReleaseChangelogSection = {
  title: string;
  items: string[];
};

type Release = {
  version: string;
  date: string;
  channel?: string;
  description?: string;
  changelog?: ReleaseChangelogSection[];
  notes?: string[];
  files: ReleaseFile[];
};

type PendingDownload = {
  release: Release;
  asset: ReleaseFile;
};

const DISCORD_URL = 'https://discord.gg/f7bnZ3cmq';
const MICROSOFT_STORE_URL = 'https://apps.microsoft.com/detail/9MTWRJCKMDTX?hl=neutral&gl=PL&ocid=pdpshare';

const isLegacy = (release: Release) => (release.channel ?? '').trim().toLowerCase() === 'legacy';

export default function ReleasesPage() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
  const [pendingDownload, setPendingDownload] = useState<PendingDownload | null>(null);
  const [expandedChangelog, setExpandedChangelog] = useState(false);
  const [showLegacy, setShowLegacy] = useState(false);

  useEffect(() => {
    document.title = 'Vast Browser';
    let active = true;

    fetch('/downloads/manifest.json')
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data: { releases?: Release[] }) => {
        if (active) setReleases(data.releases ?? []);
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoaded(true);
      });

    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!selectedRelease && !pendingDownload) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedRelease(null);
        setPendingDownload(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [selectedRelease, pendingDownload]);

  const startDownload = (release: Release, asset: ReleaseFile) => {
    setSelectedRelease(null);

    const downloadLink = document.createElement('a');
    downloadLink.href = asset.url ?? `/downloads/${asset.file}`;
    downloadLink.download = asset.file;
    downloadLink.hidden = true;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();

    setPendingDownload({ release, asset });
  };

  const officialReleases = releases.filter((release) => !isLegacy(release));
  const legacyReleases = releases.filter(isLegacy);

  const renderRelease = (release: Release) => (
    <article className="release" key={release.version}>
      <div className="release__meta">
        <div>
          <h2>Vast {release.version}</h2>
          {release.channel && <span>{release.channel}</span>}
        </div>
        <time dateTime={release.date}>{release.date}</time>
      </div>

      <div className="release__files">
        <a className="button release-download release-download--store" href={MICROSOFT_STORE_URL} target="_blank" rel="noreferrer">
          <Download aria-hidden="true" />
          <span>Download</span>
        </a>
        <button className="release-info-trigger" type="button" aria-label={`Release information for Vast ${release.version}`} title="Release Information" onClick={() => {
          setExpandedChangelog(false);
          setSelectedRelease(release);
        }}>
          <Info aria-hidden="true" />
        </button>
      </div>
    </article>
  );

  return (
    <div className="subpage-shell">
      <header className="subpage-header">
        <a className="vast-control" href="/">
          <ArrowLeft aria-hidden="true" />
          Back to Vast
        </a>
      </header>

      <main className="releases-page">
        <div className="subpage-heading">
          <h1>Vast Releases</h1>
        </div>

        <div className="release-list" aria-live="polite">
          {loaded && releases.length === 0 && (
            <div className="release-empty">
              <span>No public builds yet.</span>
              <p>The first Vast release will appear here when it is ready.</p>
            </div>
          )}

          {officialReleases.map(renderRelease)}

          {legacyReleases.length > 0 && (
            <>
              <button
                className="release-legacy-toggle"
                type="button"
                aria-expanded={showLegacy}
                aria-controls="legacy-releases"
                onClick={() => setShowLegacy((value) => !value)}
              >
                {showLegacy ? 'Hide legacy releases' : 'Show legacy releases'}
              </button>

              {showLegacy && (
                <div className="release-list__legacy" id="legacy-releases">
                  {legacyReleases.map(renderRelease)}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <SiteFooter />

      {selectedRelease && (
        <div className="release-modal" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSelectedRelease(null);
        }}>
          <section className="release-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="release-modal-title">
            <button className="release-modal__close" type="button" aria-label="Close release information" onClick={() => setSelectedRelease(null)}>
              <X aria-hidden="true" />
            </button>

            <span className="release-modal__label">{selectedRelease.channel ?? 'Release'}</span>
            <h2 id="release-modal-title">Vast {selectedRelease.version}</h2>
            {selectedRelease.description && <p className="release-modal__description">{selectedRelease.description}</p>}

            <dl className="release-modal__facts">
              <div><dt>Version</dt><dd>{selectedRelease.version}</dd></div>
              <div><dt>Published</dt><dd>{selectedRelease.date}</dd></div>
              <div><dt>Platform</dt><dd>Windows</dd></div>
              <div><dt>File size</dt><dd>{selectedRelease.files[0]?.size ?? 'Not specified'}</dd></div>
            </dl>

            {selectedRelease.notes && selectedRelease.notes.length > 0 && (
              <ul className="release-modal__notes">
                {selectedRelease.notes.map((note) => <li key={note}>{note}</li>)}
              </ul>
            )}

            {selectedRelease.files.length > 0 && (
              <div className="release-modal__downloads" aria-label="Direct downloads">
                <span className="release-modal__downloads-label">Direct downloads</span>
                <div>
                  {selectedRelease.files.map((asset) => (
                    <button className="button release-download release-download--file" type="button" onClick={() => startDownload(selectedRelease, asset)} key={asset.file}>
                      <Download aria-hidden="true" />
                      <span>{asset.label}</span>
                      {asset.size && <small>{asset.size}</small>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedRelease.changelog && selectedRelease.changelog.length > 0 && (
              <section className={`release-modal__changelog${expandedChangelog ? ' is-expanded' : ''}`} aria-labelledby="release-changelog-title">
                <h3 id="release-changelog-title">
                  <button
                    className="release-modal__changelog-toggle"
                    type="button"
                    aria-expanded={expandedChangelog}
                    aria-controls="release-changelog-content"
                    onClick={() => setExpandedChangelog((expanded) => !expanded)}
                  >
                    <span>Changes since 0.1.5</span>
                    <span>
                      {expandedChangelog ? 'Collapse changelog' : 'Show full changelog'}
                      <ChevronDown aria-hidden="true" />
                    </span>
                  </button>
                </h3>
                <div className="release-modal__changelog-content" id="release-changelog-content">
                  {selectedRelease.changelog.map((section) => (
                    <div key={section.title}>
                      <h4>{section.title}</h4>
                      <ul>
                        {section.items.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </section>
        </div>
      )}

      {pendingDownload && (
        <div className="release-modal" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setPendingDownload(null);
        }}>
          <section className="release-modal__dialog download-notice" role="dialog" aria-modal="true" aria-labelledby="download-notice-title" aria-describedby="download-notice-description">
            <button className="release-modal__close" type="button" aria-label="Close download notice" onClick={() => setPendingDownload(null)}>
              <X aria-hidden="true" />
            </button>

            <span className="release-modal__label">Vast {pendingDownload.release.version}</span>
            <h2 id="download-notice-title">Your download has started.</h2>
            <p id="download-notice-description" className="release-modal__description">
              Vast is still in beta. If you find a bug or something does not feel right, please tell us on Discord. Your reports help us make every release more stable.
            </p>

            <a className="download-notice__discord" href={DISCORD_URL} target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" />
              <span><strong>Report bugs on Discord</strong><small>Join the community and share your feedback.</small></span>
            </a>

            <div className="download-notice__actions">
              <button className="button button--primary" type="button" onClick={() => setPendingDownload(null)}>Got it</button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
