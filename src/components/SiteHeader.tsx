import { useEffect, useState } from 'react';

const SHOW_AFTER = 64;
const DISCORD_URL = 'https://discord.gg/QmQ54MArrB';
const EXTENSIONS_URL = 'https://extensions.vastbrowser.com';
const DOCUMENTATION_URL = 'https://docs.vastbrowser.com';

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > SHOW_AFTER);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className={`site-header${scrolled ? ' is-visible' : ''}`}>
      <a className="site-header__brand" href="/" aria-label="Vast Browser">
        <img className="site-header__logo" src="/logos/vast-lockup.png" alt="" width="788" height="192" />
      </a>
      <nav className="site-header__links" aria-label="Primary">
        <a href="/releases">Releases</a>
        <a href={EXTENSIONS_URL} target="_blank" rel="noreferrer">Extensions</a>
        <a href={DOCUMENTATION_URL} target="_blank" rel="noreferrer">
          <span className="site-header__long">Documentation</span>
          <span className="site-header__short">Docs</span>
        </a>
        <a href={DISCORD_URL} target="_blank" rel="noreferrer">Discord</a>
      </nav>
    </header>
  );
}
