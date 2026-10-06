export default function SiteFooter() {
  return (
    <footer className="footer">
      <a className="footer__discord" href="https://discord.gg/f7bnZ3cmq" target="_blank" rel="noreferrer">
        <svg aria-hidden="true"><use href="/icons.svg#discord-icon" /></svg>
        <strong>Join our Discord and give feedback</strong>
      </a>
      <div className="footer__links">
        <span>Vast, Infinite By Design</span>
        <a href="/legal">Legal</a>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms of Use</a>
      </div>
    </footer>
  );
}
