export default function SceneVideo() {
  return (
    <section id="film" className="film-section" aria-label="Vast browser preview">
      <div className="film">
        <img
          className="film__image"
          src="/images/vast-browser.png"
          alt="Vast browser with a dark new tab page, logo, clock and search bar"
          width="1918"
          height="1031"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
}
