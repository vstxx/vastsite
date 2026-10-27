import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Compass, Download, GitFork, Layers3 } from 'lucide-react';
import { useEffect } from 'react';
import SiteFooter from './SiteFooter';
import './sitemap.css';

type MapLink = { label: string; href: string; detail?: string };
type MapGroup = { title: string; links: MapLink[] };

const docs = (path: string) => `https://docs.vastbrowser.com/${path}/`;
const hub = (path = '') => `https://extensions.vastbrowser.com/${path}`;

const website: MapGroup[] = [
  {
    title: 'Browse Vast',
    links: [
      { label: 'Home', href: '/', detail: 'The browser, its features and the download entry point' },
      { label: 'Releases & downloads', href: '/releases', detail: 'Current and previous builds, installers and checksums' },
      { label: 'Support', href: '/support', detail: 'Help, feedback and security reporting' },
      { label: 'Brand Kit', href: '/brand', detail: 'Logos, color and typography' },
      { label: 'Site Map', href: '/sitemap', detail: 'You are here' },
    ],
  },
  {
    title: 'Legal & policies',
    links: [
      { label: 'Legal information', href: '/legal' },
      { label: 'Privacy Notice', href: '/privacy' },
      { label: 'Terms of Use', href: '/terms' },
      { label: 'Copyright / IP Notice', href: '/copyright' },
      { label: 'Platform Terms', href: '/platform-terms' },
      { label: 'Publisher Terms', href: '/publisher-terms' },
      { label: 'Publishing Policy', href: '/publishing-policy' },
    ],
  },
];

const extensions: MapGroup[] = [
  {
    title: 'Explore & publish',
    links: [
      { label: 'Publisher platform', href: hub(), detail: 'Create and submit extensions for Vast' },
      { label: 'Extension catalog', href: hub('explore'), detail: 'Browse the public collection' },
      { label: 'Publisher sign in', href: hub('auth/github/start'), detail: 'Continue with GitHub' },
    ],
  },
  {
    title: 'Catalog categories',
    links: [
      { label: 'Accessibility', href: hub('explore?category=accessibility') },
      { label: 'Appearance', href: hub('explore?category=appearance') },
      { label: 'Developer', href: hub('explore?category=developer') },
      { label: 'Education', href: hub('explore?category=education') },
      { label: 'New Tab', href: hub('explore?category=new-tab') },
      { label: 'Password Managers', href: hub('explore?category=password-managers') },
      { label: 'Privacy', href: hub('explore?category=privacy') },
      { label: 'Productivity', href: hub('explore?category=productivity') },
      { label: 'Sidebar', href: hub('explore?category=sidebar') },
      { label: 'Utilities', href: hub('explore?category=utilities') },
    ],
  },
  {
    title: 'Current listings',
    links: [
      { label: 'Proton Pass', href: hub('extension/ghmbeldphafepmbegfdlkpapadhbakde') },
      { label: 'Bitwarden Password Manager', href: hub('extension/nngceckbapebfimnlniiiahkandclblb') },
      { label: 'Adblocker for Vast', href: hub('extension/ighghepofocdonohadbmkbgmphppdagk') },
      { label: 'IDU+ for Vast', href: hub('extension/kbbfoeemomglhdhohnkcnfnpikedcoka') },
      { label: 'iCloud Passwords', href: hub('extension/pejdijmoenmkgeppbflobdenhhabjlaj') },
    ],
  },
  {
    title: 'Hub policies',
    links: [
      { label: 'Privacy Notice', href: hub('legal/privacy') },
      { label: 'Copyright / IP Notice', href: hub('legal/copyright') },
      { label: 'Platform Terms', href: hub('legal/platform-terms') },
      { label: 'Publisher Terms', href: hub('legal/publisher-terms') },
      { label: 'Publishing Policy', href: hub('legal/publishing-policy') },
    ],
  },
];

const documentation: MapGroup[] = [
  {
    title: 'Start here',
    links: [
      { label: 'Documentation home', href: 'https://docs.vastbrowser.com/' },
      { label: 'Getting Started', href: docs('get-started/getting-started') },
      { label: 'Installation & Updates', href: docs('get-started/installation-and-updates') },
      { label: 'Versioning', href: docs('get-started/versioning') },
    ],
  },
  {
    title: 'Using Vast',
    links: [
      { label: 'Browsing & Navigation', href: docs('using-vast/browsing-and-navigation') },
      { label: 'Tabs & Workspaces', href: docs('using-vast/tabs-and-workspaces') },
      { label: 'Interface & Layouts', href: docs('using-vast/interface-and-layouts') },
      { label: 'New Tab', href: docs('using-vast/new-tab') },
      { label: 'Search, Startup & Session Restore', href: docs('using-vast/search-startup-and-session-restore') },
      { label: 'Bookmarks & Reading List', href: docs('using-vast/bookmarks-and-reading-list') },
      { label: 'History & Downloads', href: docs('using-vast/history-and-downloads') },
      { label: 'Side Panel & Focus Mode', href: docs('using-vast/side-panel-and-focus-mode') },
      { label: 'Command Palette', href: docs('using-vast/command-palette') },
      { label: 'Keyboard Shortcuts', href: docs('using-vast/keyboard-shortcuts') },
    ],
  },
  {
    title: 'Local tools & customization',
    links: [
      { label: 'Local Tools', href: docs('tools/local-tools') },
      { label: 'Notes', href: docs('tools/notes') },
      { label: 'PDF Viewer', href: docs('tools/pdf-viewer') },
      { label: 'Session Timeline', href: docs('tools/session-timeline') },
      { label: 'Appearance Reference', href: docs('customization/appearance-reference') },
      { label: 'Settings Reference', href: docs('customization/settings-reference') },
      { label: 'Cat Addon', href: docs('customization/cat-addon') },
    ],
  },
  {
    title: 'Privacy & security',
    links: [
      { label: 'Privacy & Security', href: docs('privacy/privacy-and-security') },
      { label: 'Privacy Controls Reference', href: docs('privacy/privacy-controls-reference') },
      { label: 'Site Data & Permissions', href: docs('privacy/site-data-and-permissions') },
      { label: 'Data, Backup & Migration', href: docs('privacy/data-backup-and-migration') },
      { label: 'Spoofing Tools', href: docs('privacy/spoofing-tools') },
      { label: 'Advanced Diagnostics', href: docs('privacy/advanced-diagnostics') },
    ],
  },
  {
    title: 'Extensions',
    links: [
      { label: 'Extensions', href: docs('extensions/extensions') },
      { label: 'Extension Development', href: docs('extensions/extension-development') },
      { label: 'Publishing & Policies', href: docs('extensions/publishing-and-policies') },
      { label: 'Adblocker for Vast', href: docs('extensions/adblocker-for-vast') },
    ],
  },
  {
    title: 'Vast Labs',
    links: [
      { label: 'Vast Labs', href: docs('labs/vast-labs') },
      { label: 'Automation', href: docs('labs/automation') },
      { label: 'Network Devices', href: docs('labs/network-devices') },
      { label: 'Password Manager', href: docs('labs/password-manager') },
      { label: 'Video & Audio', href: docs('labs/video-and-audio') },
    ],
  },
  {
    title: 'Developers & help',
    links: [
      { label: 'Architecture Overview', href: docs('developers/architecture-overview') },
      { label: 'Developer Guide', href: docs('developers/developer-guide') },
      { label: 'Feature Availability', href: docs('developers/feature-availability') },
      { label: 'Internal Pages', href: docs('developers/internal-pages') },
      { label: 'Known Limits', href: docs('developers/known-limits') },
      { label: 'Troubleshooting', href: docs('developers/troubleshooting') },
      { label: 'Frequently Asked Questions', href: docs('developers/faq') },
    ],
  },
  {
    title: 'Release notes',
    links: [
      { label: 'Vast 0.5.5', href: docs('releases/0-5-5') },
      { label: 'Vast 0.5.0', href: docs('releases/0-5-0') },
      { label: 'Vast 0.4.3', href: docs('releases/0-4-3') },
    ],
  },
];

const elsewhere: MapGroup[] = [
  {
    title: 'Download & source',
    links: [
      { label: 'Microsoft Store', href: 'https://apps.microsoft.com/detail/9MTWRJCKMDTX', detail: 'Store-managed Windows installation' },
      { label: 'GitHub repository', href: 'https://github.com/vstxx/vast-public', detail: 'Public source and project information' },
      { label: 'GitHub releases', href: 'https://github.com/vstxx/vast-public/releases', detail: 'Official release assets' },
    ],
  },
  {
    title: 'Community & reports',
    links: [
      { label: 'Discord community', href: 'https://discord.gg/QmQ54MArrB' },
      { label: 'Issue tracker', href: 'https://github.com/vstxx/vast-public/issues' },
      { label: 'Private security report', href: 'https://github.com/vstxx/vast-public/security/advisories/new' },
      { label: 'Created by vstxx', href: 'https://vstxx.com' },
    ],
  },
];

function MapLinkItem({ link }: { link: MapLink }) {
  const external = link.href.startsWith('http');

  return (
    <li>
      <a href={link.href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
        <span className="sitemap__link-copy">
          <span className="sitemap__link-label">{link.label}</span>
          {link.detail && <span className="sitemap__link-detail">{link.detail}</span>}
        </span>
        {external ? <ArrowUpRight aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}
      </a>
    </li>
  );
}

function MapSection({ id, number, title, intro, groups }: { id: string; number: string; title: string; intro: string; groups: MapGroup[] }) {
  return (
    <section className="sitemap__section" id={id} aria-labelledby={`${id}-title`}>
      <div className="sitemap__section-heading">
        <span className="sitemap__section-number">{number}</span>
        <div>
          <h2 id={`${id}-title`}>{title}</h2>
          <p>{intro}</p>
        </div>
        <span className="sitemap__section-count">{groups.reduce((count, group) => count + group.links.length, 0)} links</span>
      </div>
      <div className="sitemap__groups">
        {groups.map((group) => (
          <div className="sitemap__group" key={group.title}>
            <h3>{group.title}</h3>
            <ul>{group.links.map((link) => <MapLinkItem key={link.href} link={link} />)}</ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function SitemapPage() {
  useEffect(() => { document.title = 'Site Map · Vast Browser'; }, []);

  return (
    <div className="subpage-shell sitemap-shell">
      <header className="subpage-header">
        <a className="legal-back-link" href="/"><ArrowLeft aria-hidden="true" />Back to Vast</a>
      </header>
      <main className="sitemap">
        <div className="sitemap__hero">
          <div className="sitemap__hero-copy">
            <span className="sitemap__eyebrow"><span /> THE VAST NETWORK</span>
            <h1>Everything Vast.<br /><em>All in one place.</em></h1>
            <p>Find your way through the browser, extensions, documentation, downloads and the places where the Vast community connects.</p>
          </div>
          <div className="sitemap__hero-mark" aria-hidden="true"><img src="/logos/vasticon.png" alt="" /></div>
        </div>

        <nav className="sitemap__jump" aria-label="Site map sections">
          <a href="#website">Website <span>01</span></a>
          <a href="#extensions">Extensions Hub <span>02</span></a>
          <a href="#documentation">Documentation <span>03</span></a>
          <a href="#elsewhere">Elsewhere <span>04</span></a>
        </nav>

        <div className="sitemap__featured" aria-label="Popular destinations">
          <a href="/releases"><Download aria-hidden="true" /><span><strong>Get Vast</strong><small>Releases & downloads</small></span><ArrowUpRight aria-hidden="true" /></a>
          <a href={hub('explore')} target="_blank" rel="noreferrer"><Compass aria-hidden="true" /><span><strong>Explore extensions</strong><small>Browse the catalog</small></span><ArrowUpRight aria-hidden="true" /></a>
          <a href="https://docs.vastbrowser.com/" target="_blank" rel="noreferrer"><BookOpen aria-hidden="true" /><span><strong>Read the docs</strong><small>Guides & reference</small></span><ArrowUpRight aria-hidden="true" /></a>
        </div>

        <MapSection id="website" number="01" title="Vast Browser" intro="Every page on vastbrowser.com, from downloads to policies." groups={website} />
        <MapSection id="extensions" number="02" title="Extensions Hub" intro="Browse extensions, publish your work and read the Hub’s policies." groups={extensions} />
        <MapSection id="documentation" number="03" title="Documentation" intro="The complete published guide and reference index, organized by topic." groups={documentation} />
        <MapSection id="elsewhere" number="04" title="The wider Vast ecosystem" intro="Official distribution, source code, community and reporting channels." groups={elsewhere} />

        <div className="sitemap__endnote"><Layers3 aria-hidden="true" /><span>Looking for something else?</span><a href="/support">Visit Vast Support <ArrowRight aria-hidden="true" /></a><GitFork aria-hidden="true" /></div>
      </main>
      <SiteFooter />
    </div>
  );
}
