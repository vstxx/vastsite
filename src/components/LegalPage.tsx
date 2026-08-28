import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import SiteFooter from './SiteFooter';

type LegalKind = 'legal' | 'privacy' | 'copyright' | 'platform-terms' | 'publisher-terms' | 'publishing-policy';

const notices = {
  legal: {
    eyebrow: 'Legal', title: 'Legal information',
    intro: 'Legal and administrative information for Vast Browser and Vast Extensions.',
    sections: [
      ['Products', 'Vast Browser and the Vast Extensions publishing platform.'],
      ['Operator', 'Jan Nowacki'],
      ['Legal & administrative contact', 'Use this official legal information page and the support channels published on vastbrowser.com. No separate legal email address is asserted here.'],
      ['Privacy', 'The current Privacy Notice is available at vastbrowser.com/privacy.'],
      ['Security', 'Security reporting guidance is published in the official Vast repository and documentation.'],
    ],
  },
  privacy: {
    eyebrow: 'Legal', title: 'Privacy Notice',
    intro: 'Effective 28 August 2026. Vast is local-first. Vast collects no browsing telemetry. This notice separates the Browser, Relay, Extensions Hub, website, and independently published extensions.',
    sections: [
      ['Vast Browser', 'Vast does not send browsing history, visited URLs, searches, tabs, bookmarks, page content, passwords, cookies or account identity to Vast as product analytics. Browser data is stored locally unless the user deliberately invokes a separately disclosed network feature.'],
      ['Vast Services and Relay — data and purpose', 'Official public Vast builds use production Vast Relay. A check-in sends a random persistent installation UUID, the running Vast version, cumulative launch count, and an instance kind such as packaged, development or test. Relay derives first-seen and last-seen timestamps. These fields are used only to deliver signed service messages and update notices, protect service operation, and produce simple pseudonymous installation counts. The identifier is random and is not derived from hardware, Windows identity, account identity, hostname or MAC address.'],
      ['Vast Relay — data not received', 'Relay does not receive browsing history, visited URLs, searches, tabs, bookmarks, page content, passwords, account identity, device fingerprints, session duration, or message read, click or dismiss events. Request-source IP addresses may be processed ephemerally by Cloudflare for transport security and rate limiting; Vast does not store them in the Relay application database or pair them with installation identifiers for analytics.'],
      ['Storage and retention', 'Browser profile data remains on the user device until the user removes it through Vast or deletes the application data. The Windows uninstaller removes installed program files and Vast-owned registration but preserves user-created profile data by default. Relay keeps the minimal pseudonymous installation registry for service continuity and aggregate installation counts; records are not enriched with browsing activity. Extensions Hub records and published artifacts may be retained for distribution continuity, review, security response, abuse handling, disputes, recovery and legal compliance. Retention is limited to what is necessary for those purposes.'],
      ['Service providers and recipients', 'Vast uses infrastructure providers including Cloudflare for delivery, storage, rate limiting and service security, and GitHub where a user deliberately uses GitHub-hosted releases, source code, issue tracking or GitHub OAuth for publisher functions. Those providers process data under their own terms and privacy notices. Vast does not sell browsing data or provide browsing telemetry to advertisers.'],
      ['Extensions Hub', 'The publisher platform processes GitHub OAuth identity/profile details, sessions and CSRF records, ephemeral hashed request keys in Cloudflare native rate limiting, D1/R2 listings and artifacts, review and audit records, versioned terms acceptances, and extension reports. Rate-limit keys are not stored in Hub D1. Published packages and evidence may be retained for distribution, security response, disputes and legal compliance. The Hub does not receive browsing history from Vast Browser.'],
      ['Publisher extensions', "Extensions are independent software. Each listing must disclose requested permissions, data practices, remote services and a privacy-policy URL whenever data is transmitted or externally processed. Vast review does not replace the publisher's obligations."],
      ['User controls and requests', 'Vast Settings links to this notice, Support and local site-data controls. Local browser data can be reviewed, exported, cleared or removed through Vast settings and profile controls. Removing Vast application state and reinstalling may create a new Relay installation UUID. For privacy or administrative requests concerning service-side data, start from the official Support or Legal pages. No separate privacy email address is currently published; do not post installation identifiers or other personal information in public issue threads.'],
      ['Website and downloads', 'Hosting and delivery providers may temporarily process ordinary request data needed to deliver pages and downloads, prevent abuse and secure the service. GitHub, Discord and other external services apply their own privacy notices after the user follows an external link.'],
      ['Security', 'Vast uses encrypted HTTPS transport for its public services, signed Relay messages and release verification controls. Local secrets such as saved passwords are not transmitted to Vast as analytics. No security measure can eliminate all risk, so users should keep Vast and Windows updated.'],
      ['Changes', 'This notice is updated when the product, service providers or data practices materially change. The current version is published on this page.'],
    ],
  },
  copyright: {
    eyebrow: 'Legal', title: 'Copyright/IP Notice',
    intro: `Effective 24 August 2026. Copyright/IP notice for Vast-owned and third-party materials (${new Date().getFullYear()}).`,
    sections: [
      ['Vast-owned source', 'The MIT License applies only to source code owned by Vast where the relevant repository identifies that license. It does not automatically cover every file shipped with the product.'],
      ['Website content', 'Unless stated otherwise, original website design, text, graphics, logos and other Vast-owned materials may not be presented as your own or used to imply endorsement.'],
      ['Third-party materials', 'Extensions, libraries, names, icons, screenshots and other third-party materials remain the property of their respective owners and are governed by their own licenses and terms.'],
      ['Rights reports', 'Use the Report extension flow in the Extensions Hub for copyright, trademark, impersonation or other rights concerns. Reports receive human review and do not trigger automatic delisting.'],
    ],
  },
  'platform-terms': {
    eyebrow: 'Legal', title: 'Platform Terms',
    intro: 'These terms describe use of the Vast website and Extensions Hub platform.',
    sections: [
      ['Acceptable use', 'Do not abuse the platform, evade security controls, upload unlawful material, impersonate others or interfere with review and distribution.'],
      ['Extensions', 'Third-party extensions are independently published software. Review and signing reduce risk but do not guarantee that an extension is free of defects.'],
      ['Enforcement', 'Vast may reject, suspend, delist or preserve evidence for extensions and accounts when required for user safety, policy enforcement or legal compliance. Decisions should remain auditable.'],
      ['Legal operator', 'The platform operator is Jan Nowacki. Current legal and administrative information is published at vastbrowser.com/legal.'],
    ],
  },
  'publisher-terms': {
    eyebrow: 'Publishers', title: 'Publisher Terms',
    intro: 'The authoritative, versioned Publisher Terms are presented by the Extensions Hub at acceptance time.',
    sections: [
      ['Ownership', 'Publishers retain ownership of their extensions and submitted materials.'],
      ['Operational license', 'A publisher grants the non-exclusive operational rights needed to host, scan, validate, review, sign, distribute, update, display and preserve already-published copies and security evidence.'],
      ['Warranty', 'At submission the publisher reconfirms ownership, accurate permissions and data disclosures, and the absence of malware, credential theft, infringement and undisclosed tracking.'],
      ['Current terms', 'Open extensions.vastbrowser.com/legal/publisher-terms for the complete current text, version and acceptance hash.'],
    ],
  },
  'publishing-policy': {
    eyebrow: 'Publishers', title: 'Publishing Policy',
    intro: 'Extensions must be safe, accurately described and reviewable.',
    sections: [
      ['Required disclosure', 'Listings must accurately state functionality, necessary permissions, data practices, remote services and ownership. External processing requires an HTTPS privacy-policy URL.'],
      ['Prohibited behavior', 'Malware, credential theft, hidden tracking or mining, deceptive behavior, unlawful functionality, impersonation and infringement are prohibited.'],
      ['Review', 'Packages receive strict archive, identity, path, manifest, permission and static-code checks. Dynamic code and WebAssembly are prohibited; obfuscated or minified source is escalated for manual review.'],
      ['Reports', 'Public reports cover copyright, malware, illegal functionality, privacy abuse, impersonation and other violations. Reports are rate-limited and human-reviewed without automatic delisting.'],
    ],
  },
} satisfies Record<LegalKind, { eyebrow: string; title: string; intro: string; sections: string[][] }>;

export default function LegalPage({ kind }: { kind: LegalKind }) {
  const notice = notices[kind];
  useEffect(() => { document.title = `${notice.title} · Vast Browser`; }, [notice.title]);
  return (
    <div className="subpage-shell">
      <header className="subpage-header"><a className="vast-control" href="/"><ArrowLeft aria-hidden="true" />Back to Vast</a></header>
      <main className="legal-page">
        <div className="legal-heading"><p>{notice.eyebrow}</p><h1>{notice.title}</h1><span>{notice.intro}</span></div>
        <div className="legal-sections">{notice.sections.map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}</div>
        {kind === 'legal' && <nav className="legal-links" aria-label="Legal resources"><a href="/privacy">Privacy Notice</a><a href="/support">Support</a><a href="https://docs.vastbrowser.com/security/" rel="noreferrer">Security documentation</a><a href="https://extensions.vastbrowser.com/legal/publisher-terms" rel="noreferrer">Publisher Terms</a></nav>}
      </main>
      <SiteFooter />
    </div>
  );
}
