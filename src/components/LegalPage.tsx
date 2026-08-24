import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import SiteFooter from './SiteFooter';

type LegalKind = 'privacy' | 'copyright';

const notices = {
  privacy: {
    eyebrow: 'Legal',
    title: 'Privacy Notice',
    intro: 'Vast is built around privacy. This notice explains what the Vast website processes when you visit it or download a release.',
    sections: [
      ['Information we collect', 'The Vast website does not use user accounts, advertising trackers or behavioral analytics. We do not intentionally collect personal information through forms or newsletters.'],
      ['Technical data', 'Our hosting infrastructure may temporarily process standard request data such as your IP address, browser type, requested page and timestamp. This data may be used only to deliver the site, maintain reliability and prevent abuse.'],
      ['Downloads and external links', 'Release downloads may generate ordinary server request logs. Links to GitHub or other third-party services are governed by the privacy terms of those services once you leave this website.'],
      ['Changes to this notice', 'This notice may be updated when the website or its infrastructure changes. The current version will always be published on this page.'],
    ],
  },
  copyright: {
    eyebrow: 'Legal',
    title: 'Copyright Notice',
    intro: `© ${new Date().getFullYear()} Vast. The website, visual identity and original content are protected by applicable copyright law.`,
    sections: [
      ['Website content', 'Unless stated otherwise, the design, text, graphics, logos and other original materials on this website may not be reproduced, redistributed or presented as your own without prior permission.'],
      ['Vast software', 'Vast software releases are provided under the license included with each build or source repository. That software license governs how the code and distributed binaries may be used.'],
      ['Third-party materials', 'Third-party names, libraries, icons and other materials remain the property of their respective owners and are subject to their own licenses and terms.'],
      ['Vast name and identity', 'The Vast name, wordmark and visual identity may not be used in a way that suggests endorsement, affiliation or an official release without permission.'],
    ],
  },
} satisfies Record<LegalKind, { eyebrow: string; title: string; intro: string; sections: string[][] }>;

export default function LegalPage({ kind }: { kind: LegalKind }) {
  const notice = notices[kind];

  useEffect(() => {
    document.title = 'Vast Browser';
  }, [notice.title]);

  return (
    <div className="subpage-shell">
      <header className="subpage-header">
        <a className="vast-control" href="/">
          <ArrowLeft aria-hidden="true" />
          Back to Vast
        </a>
      </header>

      <main className="legal-page">
        <div className="legal-heading">
          <p>{notice.eyebrow}</p>
          <h1>{notice.title}</h1>
          <span>{notice.intro}</span>
        </div>

        <div className="legal-sections">
          {notice.sections.map(([title, body]) => (
            <section key={title}>
              <h2>{title}</h2>
              <p>{body}</p>
            </section>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
