import { ArrowLeft, ChevronDown, Download, Info, MessageCircle, Package, ShoppingBag, X } from 'lucide-react';
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
  previousVersion?: string;
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
  const [openDownloadMenu, setOpenDownloadMenu] = useState<string | null>(null);

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

  useEffect(() => {
    if (!openDownloadMenu) return;

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest('[data-download-menu]')) {
        setOpenDownloadMenu(null);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenDownloadMenu(null);
    };

    document.addEventListener('pointerdown', closeOnOutsidePress);
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePress);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [openDownloadMenu]);

  const startDownload = (release: Release, asset: ReleaseFile) => {
    setSelectedRelease(null);
    setOpenDownloadMenu(null);

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

  const renderRelease = (release: Release) => {
    const portable = release.files.find((asset) => /portable/i.test(`${asset.label} ${asset.file}`));
    const installer = release.files.find((asset) => /installer|setup/i.test(`${asset.label} ${asset.file}`))
      ?? release.files.find((asset) => !/portable|updater/i.test(`${asset.label} ${asset.file}`));
    const isCurrentRelease = release === officialReleases[0];
    const menuId = `download-menu-${release.version.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`;

    return <article className={`release${openDownloadMenu === release.version ? ' is-download-open' : ''}`} key={release.version}>
      <div className="release__meta">
        <div>
          <h2>Vast {release.version}</h2>
          {release.channel && <span>{release.channel}</span>}
        </div>
        <time dateTime={release.date}>{release.date}</time>
      </div>

      <div className="release__files">
        <div className={`release-download-menu${openDownloadMenu === release.version ? ' is-open' : ''}`} data-download-menu>
          <button
            className="button release-download release-download__trigger"
            type="button"
            aria-haspopup="menu"
            aria-expanded={openDownloadMenu === release.version}
            aria-controls={menuId}
            onClick={() => setOpenDownloadMenu((current) => current === release.version ? null : release.version)}
          >
            <Download aria-hidden="true" />
            <span>Download</span>
            <ChevronDown className="button__arrow" aria-hidden="true" />
          </button>

          {openDownloadMenu === release.version && (
            <div className="release-download-menu__panel" id={menuId} role="menu" aria-label={`Download Vast ${release.version}`}>
              {installer && (
                <button type="button" role="menuitem" onClick={() => startDownload(release, installer)}>
                  <Download aria-hidden="true" />
                  <span><strong>Download Installer</strong><small>{installer.size ?? 'Windows installer'}</small></span>
                </button>
              )}
              {portable && (
                <button type="button" role="menuitem" onClick={() => startDownload(release, portable)}>
                  <Package aria-hidden="true" />
                  <span><strong>Download Portable</strong><small>{portable.size ?? 'Portable Windows app'}</small></span>
                </button>
              )}
              {isCurrentRelease && (
                <a href={MICROSOFT_STORE_URL} role="menuitem" target="_blank" rel="noreferrer">
                  <ShoppingBag aria-hidden="true" />
                  <span><strong>Microsoft Store</strong><small>Install and update through Store</small></span>
                </a>
              )}
            </div>
          )}
        </div>
        <button className="release-info-trigger" type="button" aria-label={`Release information for Vast ${release.version}`} title="Release Information" onClick={() => {
          setOpenDownloadMenu(null);
          setExpandedChangelog(false);
          setSelectedRelease(release);
        }}>
          <Info aria-hidden="true" />
        </button>
      </div>
    </article>;
  };

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
                    <span>Changes since {selectedRelease.previousVersion ?? 'the previous release'}</span>
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
              If you find a bug or something does not feel right, please tell us on Discord. Your reports help us make every release more stable.
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
