import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import SiteFooter from './SiteFooter';
import './brand-kit.css';

const logos = [
  {
    name: 'Logo on black',
    path: '/logos/vast2.png',
    file: 'vast2.png',
    format: 'PNG',
    preview: 'black',
    wide: true,
  },
  {
    name: 'White wordmark',
    path: '/logos/vast.png',
    file: 'vast.png',
    format: 'PNG',
    preview: 'dark',
    wide: true,
  },
  {
    name: 'Vast symbol',
    path: '/logos/vasticon.png',
    file: 'vasticon.png',
    format: 'PNG',
    preview: 'light',
    wide: false,
  },
  {
    name: 'Legacy Vast logo (pre-beta)',
    path: '/logos/v-v.png',
    file: 'v-v.png',
    format: 'PNG',
    preview: 'violet',
    wide: false,
  },
] as const;

const colors = [
  { name: 'Logo violet', role: 'Primary', hex: '#6C1293', ink: 'light' },
  { name: 'Light violet', role: 'Secondary', hex: '#C272FF', ink: 'dark' },
  { name: 'Deep violet', role: 'Website accent', hex: '#6900B5', ink: 'light' },
  { name: 'Near black', role: 'Canvas', hex: '#050507', ink: 'light' },
  { name: 'White', role: 'Wordmark', hex: '#FFFFFF', ink: 'dark' },
] as const;

const gradients = [
  {
    name: 'Ambient violet',
    css: 'radial-gradient(ellipse, rgba(105, 0, 181, .48) 0%, rgba(105, 0, 181, .18) 42%, transparent 72%)',
    preview: 'glow',
  },
  {
    name: 'Dark surface',
    css: 'linear-gradient(145deg, rgba(24, 22, 31, .72), rgba(12, 12, 17, .58))',
    preview: 'surface',
  },
] as const;

export default function BrandKitPage() {
  useEffect(() => { document.title = 'Brand Kit · Vast Browser'; }, []);

  return (
    <div className="subpage-shell brand-kit-shell">
      <header className="subpage-header">
        <a className="legal-back-link" href="/"><ArrowLeft aria-hidden="true" />Back to Vast</a>
      </header>

      <main className="brand-kit">
        <div className="brand-kit__intro">
          <h1>Brand Kit</h1>
        </div>

        <section className="brand-kit__section" aria-labelledby="brand-logos">
          <div className="brand-kit__section-heading">
            <h2 id="brand-logos">Logos</h2>
          </div>
          <div className="brand-assets">
            {logos.map((logo) => (
              <article className={`brand-asset${logo.wide ? ' brand-asset--wide' : ''}`} key={logo.path}>
                <div className={`brand-asset__preview brand-asset__preview--${logo.preview}`}>
                  <img src={logo.path} alt={logo.name} loading="lazy" />
                </div>
                <div className="brand-asset__details">
                  <h3>{logo.name}</h3>
                  <a href={logo.path} download={logo.file}>Download {logo.format}</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="brand-kit__section" aria-labelledby="brand-colors">
          <div className="brand-kit__section-heading">
            <h2 id="brand-colors">Colors</h2>
          </div>
          <div className="brand-colors">
            {colors.map((color) => (
              <div className="brand-color" key={color.hex}>
                <div className={`brand-color__swatch brand-color__swatch--${color.ink}`} style={{ backgroundColor: color.hex }}>
                  <code>{color.hex}</code>
                </div>
                <div className="brand-color__details"><strong>{color.name}</strong><span>{color.role}</span></div>
              </div>
            ))}
          </div>
        </section>

        <section className="brand-kit__section" aria-labelledby="brand-gradients">
          <div className="brand-kit__section-heading">
            <h2 id="brand-gradients">Gradients</h2>
          </div>
          <div className="brand-gradients">
            {gradients.map((gradient) => (
              <div className="brand-gradient" key={gradient.name}>
                <div className={`brand-gradient__preview brand-gradient__preview--${gradient.preview}`} aria-hidden="true" />
                <div className="brand-gradient__details"><h3>{gradient.name}</h3></div>
                <code>{gradient.css}</code>
              </div>
            ))}
          </div>
        </section>

        <section className="brand-kit__section brand-kit__section--type" aria-labelledby="brand-type">
          <div className="brand-kit__section-heading">
            <h2 id="brand-type">Typography</h2>
          </div>
          <div className="brand-type"><span>Inter Display</span><strong>Vast Browser</strong><p>Light · Regular · Medium</p></div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
