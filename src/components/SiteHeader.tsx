export default function SiteHeader() {
  return (
    <header className="site-header">
      <a className="site-header__brand" href="/" aria-label="Vast Browser">
        <img className="site-header__logo" src="/logos/vast-lockup.png" alt="" width="788" height="192" />
      </a>
      <nav className="site-header__links" aria-label="Primary">
        <a href="/releases">Releases</a>
        <a href="https://docs.vastbrowser.com" target="_blank" rel="noreferrer">Documentation</a>
      </nav>
    </header>
  );
}
