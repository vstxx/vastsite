export default function SiteFooter() {
  return (
    <footer className="footer">
      <a className="footer__discord" href="https://discord.gg/QmQ54MArrB" target="_blank" rel="noreferrer">
        <svg aria-hidden="true"><use href="/icons.svg#discord-icon" /></svg>
        <strong>Join our Discord and give feedback</strong>
      </a>
      <div className="footer__links">
        <span>Built to look and work your way.</span>
        <a href="/legal">Legal</a>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms of Use</a>
        <a href="/brand">Brand Kit</a>
        <a href="/sitemap/">Site Map</a>
      </div>
      <p className="footer__credit">
        Created by <a href="https://vstxx.com" target="_blank" rel="noreferrer">vstxx</a> as part of VastProductions.
      </p>
    </footer>
  );
}
