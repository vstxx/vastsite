import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import SiteFooter from './SiteFooter';

const supportItems = [
  {
    title: 'Documentation',
    body: 'Setup, browser features, privacy controls, extensions, troubleshooting and security guidance.',
    href: 'https://docs.vastbrowser.com',
    label: 'Open documentation',
  },
  {
    title: 'Report a bug',
    body: 'Use the public Vast issue tracker for reproducible product bugs. Never include passwords, cookies, tokens or other private browser data.',
    href: 'https://github.com/vstxx/vast-public/issues',
    label: 'Open issue tracker',
  },
  {
    title: 'Community support',
    body: 'Ask usage questions, share feedback and discuss Vast with the community.',
    href: 'https://discord.gg/f7bnZ3cmq',
    label: 'Join Discord',
  },
  {
    title: 'Security reports',
    body: 'Report vulnerabilities privately through GitHub Private Vulnerability Reporting. Do not disclose security-sensitive details in a public issue, Discord message or extension report.',
    href: 'https://github.com/vstxx/vast-public/security/advisories/new',
    label: 'Report privately on GitHub',
  },
  {
    title: 'Privacy and legal',
    body: 'Read the current Privacy Notice and legal information before sending a privacy or administrative request. Vast does not publish a separate privacy email address; do not post identifiers or personal data in public support channels.',
    href: '/privacy',
    label: 'Privacy Notice',
  },
];

export default function SupportPage() {
  useEffect(() => { document.title = 'Support · Vast Browser'; }, []);

  return (
    <div className="subpage-shell">
      <header className="subpage-header">
        <a className="vast-control" href="/"><ArrowLeft aria-hidden="true" />Back to Vast</a>
      </header>
      <main className="legal-page">
        <div className="legal-heading">
          <p>Support</p>
          <h1>Vast Support</h1>
          <span>Official help and reporting routes for Vast Browser.</span>
        </div>
        <div className="legal-sections">
          {supportItems.map((item) => (
            <section key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
              <p><a href={item.href} rel={item.href.startsWith('http') ? 'noreferrer' : undefined}>{item.label}</a></p>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
