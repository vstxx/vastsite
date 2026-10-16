import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('renders the page in the intended scroll order', async () => {
  const app = await read('src/App.tsx');

  const hero = app.indexOf('<SceneHero />');
  const performance = app.indexOf('<ScenePerformance />');
  const video = app.indexOf('<SceneVideo />');
  const details = app.indexOf('<SceneDetails />');
  const cta = app.indexOf('<SceneCTA />');

  assert.ok(hero > -1 && hero < performance && performance < video && video < details && details < cta);
  assert.doesNotMatch(app, /SceneLogo|SceneStatement|SceneSlogan|SceneProduct|CinematicControls/);
  assert.match(app, /<SiteHeader \/>/);
});

test('uses the Vast icon and concise browser title', async () => {
  const html = await read('index.html');

  assert.match(html, /href="\/logos\/vasticon\.png"/);
  assert.match(html, /<title>Vast Browser<\/title>/);
  assert.doesNotMatch(html, /rel="canonical"/);
  assert.match(html, /property="og:url" content="https:\/\/vastbrowser\.com\//);
  assert.match(html, /property="og:image" content="https:\/\/vastbrowser\.com\/logos\/vast2\.png"/);
  assert.match(html, /name="twitter:image" content="https:\/\/vastbrowser\.com\/logos\/vast2\.png"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
});

test('opens with the word-by-word headline and download/explore actions', async () => {
  const [hero, header, css] = await Promise.all([
    read('src/components/SceneHero.tsx'),
    read('src/components/SiteHeader.tsx'),
    read('src/index.css'),
  ]);

  assert.match(hero, /Browser built to look and work your way\./);
  assert.match(hero, /WORDS\.map/);
  assert.match(hero, /useReducedMotion/);
  assert.match(hero, /href="\/releases">[\s\S]*?<Download[\s\S]*?Download\s*<\/a>/);
  assert.match(hero, /href="#performance"[^>]*>[\s\S]*?<ArrowDown[\s\S]*?Explore\s*<\/a>/);
  assert.match(hero, /scrollIntoView/);
  assert.doesNotMatch(hero, /\/logos\/vast\.png/);
  assert.match(header, /src="\/logos\/vast-lockup\.png"/);
  assert.match(css, /\.hero__actions\s*\{[^}]*height: 40px/);
  assert.match(css, /\.hero__ambient[\s\S]*animation: ambient-drift 12s/);
});

test('presents the verified benchmark figures transparently', async () => {
  const perf = await read('src/components/ScenePerformance.tsx');

  assert.match(perf, /id="performance"/);
  assert.match(perf, /35\.02/);
  assert.match(perf, /33\.32/);
  assert.match(perf, /on Speedometer 3\.1/);
  assert.match(perf, /Vast scored 5\.1% higher than Google Chrome in our five-run Speedometer 3\.1 benchmark\./);
  assert.match(perf, /At least 15% less RAM usage/);
  assert.match(perf, /In our tests, Vast used at least 15% less RAM than Google Chrome\./);
  assert.doesNotMatch(perf, /perf__note|perf__foot/);
});

test('shows the Vast screenshot without loading or animating a video', async () => {
  const [video, css] = await Promise.all([
    read('src/components/SceneVideo.tsx'),
    read('src/index.css'),
  ]);

  assert.match(video, /<img/);
  assert.match(video, /src="\/images\/vast-browser\.png"/);
  assert.doesNotMatch(video, /<video|useScroll|promotional video coming soon™/);
  await access(new URL('../public/images/vast-browser.png', import.meta.url));
  assert.match(css, /\.film\s*\{[\s\S]*border-radius:/);
  assert.doesNotMatch(css.match(/\.film\s*\{[^}]*\}/)?.[0] ?? '', /backdrop-filter|will-change/);
});

test('describes extensions, sidebar, performance and settings', async () => {
  const [details, css] = await Promise.all([
    read('src/components/SceneDetails.tsx'),
    read('src/index.css'),
  ]);

  assert.doesNotMatch(details, /A browser you can actually make your own|Why should I use Vast\?|Continue Reading|aria-expanded/);
  assert.match(details, /className="sr-only"/);
  assert.match(details, /title: 'Extensions'/);
  assert.match(details, /Extension Hub/);
  assert.match(details, /sidebar/i);
  assert.match(details, /Quick, and easy on memory/);
  assert.match(details, /Settings that go deep/);
  assert.match(css, /\.why__row\s*\{[^}]*grid-template-columns/);
  const whyInnerRule = css.match(/\.why__inner\s*\{[\s\S]*?\}/)?.[0] ?? '';
  assert.doesNotMatch(whyInnerRule, /border|background|backdrop-filter/);
});

test('renders an open download section and minimal footer', async () => {
  const [cta, footer, css, icons] = await Promise.all([
    read('src/components/SceneCTA.tsx'),
    read('src/components/SiteFooter.tsx'),
    read('src/index.css'),
    read('public/icons.svg'),
  ]);

  assert.match(cta, />\s*Releases\s*/);
  assert.match(cta, />\s*GitHub\s*/);
  assert.match(cta, />\s*Documentation\s*/);
  assert.match(cta, /GITHUB_URL/);
  assert.match(cta, /https:\/\/github\.com\/vstxx\/vast-public/);
  assert.match(cta, /https:\/\/docs\.vastbrowser\.com/);
  assert.match(cta, /href="\/releases"/);
  assert.match(cta, /target="_blank"/);
  assert.match(footer, /Vast, Infinite By Design/);
  assert.deepEqual([...footer.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map((match) => match[1]), [
    'https://discord.gg/QmQ54MArrB', '/legal', '/privacy', '/terms', '/brand',
  ]);
  assert.match(footer, /Terms of Use/);
  assert.match(footer, /discord\.gg\/QmQ54MArrB/);
  assert.match(footer, /Join our Discord and give feedback/);
  assert.match(footer, /icons\.svg#discord-icon/);
  assert.match(icons, /id="discord-icon"[\s\S]*?<path fill="currentColor"/);
  assert.doesNotMatch(icons, /#aa3bff/i);
  assert.match(icons, /stroke="#c272ff"/i);
  assert.doesNotMatch(cta, /Get Vast|Built for the open web|aria-label="Back to top"/);
  assert.match(css, /\.download__copy h2[\s\S]*font-weight: 600/);
  assert.match(css, /\.download__card[\s\S]*margin: auto/);
  const downloadCardRule = css.match(/\.download__card\s*\{[\s\S]*?\}/)?.[0] ?? '';
  assert.doesNotMatch(downloadCardRule, /border|background|box-shadow|backdrop-filter/);
  assert.match(cta, /initial=\{titleHidden\}/);
  assert.match(cta, /filter: 'blur\(12px\)'/);
});

test('uses the higher-contrast Vast purple accent consistently', async () => {
  const css = await read('src/index.css');

  assert.match(css, /--accent:\s*#6900b5/i);
  assert.match(css, /--accent-text:\s*#c272ff/i);
  const tagRule = css.match(/\.release__meta span\s*\{[\s\S]*?\}/)?.[0] ?? '';
  assert.doesNotMatch(tagRule, /accent|background/);
  assert.match(css, /\.release-modal__label[\s\S]*color:\s*var\(--accent-text\)/);
  assert.doesNotMatch(css, /rgba\(190,\s*165,\s*238,\s*0\.56\)/);
});

test('routes to local releases and the complete legal policy set', async () => {
  const [app, releases, legal, manifest] = await Promise.all([
    read('src/App.tsx'),
    read('src/components/ReleasesPage.tsx'),
    read('src/components/LegalPage.tsx'),
    read('public/downloads/manifest.json'),
  ]);

  assert.match(app, /path === '\/releases'/);
  assert.match(app, /path === '\/legal'/);
  assert.match(app, /path === '\/privacy'/);
  assert.match(app, /path === '\/terms'/);
  assert.match(app, /path === '\/support'/);
  assert.match(app, /path === '\/copyright'/);
  assert.match(app, /path === '\/platform-terms'/);
  assert.match(app, /path === '\/publisher-terms'/);
  assert.match(app, /path === '\/publishing-policy'/);
  assert.match(releases, /fetch\('\/downloads\/manifest\.json'\)/);
  assert.match(releases, /No public builds yet/);
  assert.match(releases, /Release Information/);
  assert.match(releases, /9MTWRJCKMDTX/);
  assert.match(releases, /release-download-menu__panel/);
  assert.match(releases, /Download Installer/);
  assert.match(releases, /\(Recommended\)/);
  assert.match(releases, /Download Portable/);
  assert.match(releases, /Microsoft Store/);
  assert.match(releases, /aria-haspopup="menu"/);
  assert.match(releases, /role="menu"/);
  assert.ok(releases.indexOf('release-download-menu') < releases.indexOf('release-info-trigger'));
  assert.doesNotMatch(releases, /release-modal__downloads/);
  assert.doesNotMatch(releases, /Direct downloads/);
  assert.doesNotMatch(releases, /<Info aria-hidden="true" \/>[\s\S]{0,40}Release Information/);
  assert.match(releases, /release-modal__changelog/);
  assert.match(releases, /selectedRelease\.previousVersion/);
  assert.match(releases, /aria-expanded=\{expandedChangelog\}/);
  assert.match(releases, /Show full changelog/);
  assert.match(releases, /Collapse changelog/);
  assert.doesNotMatch(releases, /<p>Releases<\/p>/);
  assert.match(releases, /<h1>Releases<\/h1>/);
  assert.doesNotMatch(releases, /Official builds, published in one quiet place\./);
  assert.match(releases, /Your download has started/);
  assert.match(releases, /Report bugs on Discord/);
  assert.match(releases, /discord\.gg\/QmQ54MArrB/);
  assert.doesNotMatch(releases, /Continue download|Before you download/);
  assert.match(releases, /downloadLink\.click\(\)/);
  assert.ok(releases.indexOf('downloadLink.click()') < releases.indexOf('setPendingDownload({ release, asset })'));
  assert.match(releases, /pendingDownload/);
  assert.match(releases, /role="dialog"/);
  assert.match(releases, /aria-modal="true"/);
  assert.match(releases, /event\.key === 'Escape'/);
  assert.match(releases, /document\.body\.style\.overflow = 'hidden'/);
  assert.match(legal, /Vast collects no browsing telemetry/);
  const support = await read('src/components/SupportPage.tsx');
  assert.match(support, /Private Vulnerability Reporting/);
  assert.match(support, /security\/advisories\/new/);
  assert.match(support, /does not publish a separate privacy email address/);
  assert.match(legal, /Copyright\/IP Notice/);
  assert.match(legal, /Publisher Terms/);
  assert.match(legal, /Publishing Policy/);
  assert.match(legal, /groups: \['platform-terms', 'publisher-terms', 'publishing-policy'\]/);
  assert.match(legal, /groups: \['legal', 'copyright'\]/);
  assert.match(legal, /\['Operator', 'Jan Nowacki'\]/);
  assert.match(legal, /No separate legal email address is asserted here/);
  const releaseManifest = JSON.parse(manifest);
  const [currentRelease, previousRelease] = releaseManifest.releases;
  assert.equal(currentRelease.version, '0.5.0');
  assert.equal(currentRelease.channel, 'Official');
  assert.equal(currentRelease.previousVersion, '0.4.3');
  assert.ok(Date.parse(currentRelease.date) > Date.parse(previousRelease.date));
  assert.equal(currentRelease.date, '2026-10-14');
  assert.equal(currentRelease.releaseUrl, 'https://github.com/vstxx/vast-public/releases/tag/v0.5.0');
  assert.equal(currentRelease.documentationUrl, 'https://docs.vastbrowser.com/releases/0-5-0/');
  assert.deepEqual(currentRelease.changelog.map((section) => section.title), [
    "What's new", 'Improvements and fixes', 'Important upgrade information', 'Known limitations',
  ]);
  assert.match(currentRelease.notes.join(' '), /unsigned/i);
  assert.match(currentRelease.notes.join(' '), /Store.*separate/i);
  assert.match(currentRelease.notes.join(' '), /0\.4\.2.*manual/i);
  assert.equal(previousRelease.version, '0.4.3');
  assert.equal(previousRelease.channel, 'Legacy');
  assert.ok(releaseManifest.releases.every((release) => release.version !== '0.4.0'));
  const expectedAssets = [
    ['Vast-Setup-0.5.0.exe', 331167232, '796d5546f64daedf0233a92ceb22aeba8d806cec767659099c85b2b79816431d'],
    ['Vast-0.5.0-Portable.exe', 277005285, '5dcf2348ba96a79e7a18691ef1a69dc3a8ad6c11827faf55e6dca214ed9ed69f'],
    ['VastUpdater-0.5.0.exe', 35101452, '70cb481e0dc9ddd8ca421bec851c92554f7d5480bc142e3ba87ca8a8c1721b4d'],
  ];
  assert.deepEqual(currentRelease.files.map(({ file, bytes, sha256 }) => [file, bytes, sha256]), expectedAssets);
  for (const asset of currentRelease.files) {
    assert.equal(asset.url, `https://github.com/vstxx/vast-public/releases/download/v0.5.0/${asset.file}`);
    const response = await fetch(asset.url, { method: 'HEAD' });
    assert.equal(response.status, 200, `published asset is unavailable: ${asset.url}`);
  }
  assert.equal(releaseManifest.releases[2].version, '0.4.2');
  assert.equal(releaseManifest.releases[2].channel, 'Legacy');
  assert.equal(releaseManifest.releases[3].version, '0.4.1');
  assert.equal(releaseManifest.releases[3].channel, 'Legacy');
  assert.equal(releaseManifest.releases[4].version, '0.3.0');
  assert.equal(releaseManifest.releases[4].channel, 'Legacy');
  assert.equal(releaseManifest.releases[4].previousVersion, '0.2.7');
  assert.match(releaseManifest.releases[4].files[0].url, /vast-public\/releases\/download\/v0\.3\.0/);
  assert.equal(releaseManifest.releases[4].files[2].file, 'VastUpdater-0.3.0.exe');
  assert.ok(releaseManifest.releases[4].changelog.length >= 7);
  const changelog = releaseManifest.releases[4].changelog.flatMap((section) => section.items).join(' ');
  assert.match(changelog, /workspace session/);
  assert.match(changelog, /PDF Open with/);
  assert.match(changelog, /Corner radius/);
  assert.match(changelog, /native ad-blocking engine/);
  assert.match(changelog, /next-launch/);
  assert.match(changelog, /Electron 44\.1\.0/);
  assert.match(changelog, /Microsoft Store/);
  assert.match(changelog, /0\.2\.7-to-0\.3\.0/);
  assert.equal(releaseManifest.releases[5].version, '0.2.7');
  assert.equal(releaseManifest.releases[5].channel, 'Legacy');
  assert.match(releaseManifest.releases[5].files[0].url, /vast-public\/releases\/download\/v0\.2\.7/);
  assert.equal(releaseManifest.releases[6].version, 'Beta 0.2.5');
  assert.equal(releaseManifest.releases[6].channel, 'Legacy');
  assert.match(releaseManifest.releases[6].files[0].url, /vast-public\/releases\/download\/v0\.2\.5/);
  assert.equal(releaseManifest.releases[7].version, 'Beta 0.1.5');
  assert.match(releaseManifest.releases[7].files[0].url, /vast-public\/releases\/download\/public-release-0\.1\.5/);
  assert.equal(releaseManifest.releases[4].releaseUrl, 'https://github.com/vstxx/vast-public/releases/tag/v0.3.0');
  assert.equal(releaseManifest.releases[4].documentationUrl, 'https://docs.vastbrowser.com/releases/0-3-0/');
  assert.match(releases, /Download Updater/);
  assert.match(releases, /not Store or Portable/);
  assert.match(releases, /available version may differ/);
  assert.doesNotMatch(releases, /Vast is still in beta/);
});

test('uses compact, fully rounded buttons with a filled primary', async () => {
  const css = await read('src/index.css');
  const buttonRule = css.match(/\.button\s*\{[\s\S]*?\}/)?.[0] ?? '';
  const primaryRule = css.match(/\.button--primary\s*\{[\s\S]*?\}/)?.[0] ?? '';

  assert.match(buttonRule, /height: 40px/);
  assert.match(buttonRule, /border-radius: 999px/);
  assert.match(buttonRule, /background: transparent/);
  assert.doesNotMatch(buttonRule, /backdrop-filter|box-shadow/);
  assert.match(primaryRule, /background: #f2f0f6/);
  assert.match(css, /\.button:focus-visible/);
});

test('includes responsive and reduced-motion safeguards', async () => {
  const css = await read('src/index.css');

  assert.match(css, /@media \(max-width: 720px\)/);
  assert.match(css, /@media \(max-width: 430px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.doesNotMatch(css, /scroll-snap-type|overflow-y:\s*scroll/);
  assert.doesNotMatch(css, /Basenji/);
  assert.match(css, /\.why__row h3[\s\S]*font-weight: 600/);
  assert.doesNotMatch(css, /\.why__inner h2/);
});


test('does not include the site demo locally', async () => {
  const app = await read('src/App.tsx');
  assert.doesNotMatch(app, /SiteDemo|sitedemo/);
  await assert.rejects(read('src/components/SiteDemo.tsx'), { code: 'ENOENT' });
  await assert.rejects(read('src/components/SiteDemoLower.tsx'), { code: 'ENOENT' });
  await assert.rejects(read('src/components/site-demo.css'), { code: 'ENOENT' });
  await assert.rejects(read('public/site-demo/vast-main-ui.webp'), { code: 'ENOENT' });
});

test('publishes the brand kit with the existing logo files', async () => {
  const [app, footer, brand] = await Promise.all([
    read('src/App.tsx'),
    read('src/components/SiteFooter.tsx'),
    read('src/components/BrandKitPage.tsx'),
  ]);

  assert.match(app, /path === '\/brand'/);
  assert.match(footer, /href="\/brand">Brand Kit<\/a>/);
  for (const asset of ['vast2.png', 'vast.png', 'vasticon.png', 'v-v.png']) {
    assert.match(brand, new RegExp(`/logos/${asset.replace('.', '\\.')}`));
    await access(new URL(`../public/logos/${asset}`, import.meta.url));
  }
  assert.match(brand, /Legacy Vast logo \(pre-beta\)/);
  assert.doesNotMatch(brand, /Additional SVG mark|\/favicon\.svg/);
  assert.match(brand, /#6C1293/i);
  assert.match(brand, /#C272FF/i);
});

test('states the desktop source license and documents the real release manifest', async () => {
  const [legal, publishingGuide] = await Promise.all([
    read('src/components/LegalPage.tsx'),
    read('public/downloads/README.md'),
  ]);

  assert.match(legal, /Vast-owned desktop source is licensed under GPL-3\.0-only/i);
  assert.match(legal, /Third-party materials.*their own licenses/i);
  assert.doesNotMatch(legal, /Vast-owned desktop source.{0,80}MIT/i);
  assert.doesNotMatch(publishingGuide, /example\.com|1\.0\.0/i);
  for (const field of ['version', 'previousVersion', 'date', 'channel', 'releaseUrl', 'documentationUrl', 'changelog', 'notes', 'files', 'bytes', 'sha256']) {
    assert.match(publishingGuide, new RegExp(`\\b${field}\\b`));
  }
  assert.match(publishingGuide, /GitHub release assets/i);
  assert.match(publishingGuide, /immutable/i);
});

test('keeps public page routes linked and the release controls usable on mobile', async () => {
  const [app, support, footer, releases, css] = await Promise.all([
    read('src/App.tsx'),
    read('src/components/SupportPage.tsx'),
    read('src/components/SiteFooter.tsx'),
    read('src/components/ReleasesPage.tsx'),
    read('src/index.css'),
  ]);

  for (const route of ['/releases', '/support', '/brand', '/legal', '/privacy', '/terms']) {
    assert.match(app, new RegExp(`path === '${route.replaceAll('/', '\\/')}'`));
  }
  for (const route of ['/legal', '/privacy', '/terms', '/brand']) assert.match(footer, new RegExp(`href="${route}"`));
  for (const href of ['https://docs.vastbrowser.com', 'https://github.com/vstxx/vast-public/issues', 'https://discord.gg/QmQ54MArrB', 'https://github.com/vstxx/vast-public/security/advisories/new', '/privacy']) {
    assert.ok(support.includes(href), `support route is missing ${href}`);
  }
  assert.match(releases, /fetch\('\/downloads\/manifest\.json'\)/);
  assert.match(releases, /release-download-menu__panel/);
  assert.match(css, /@media \(max-width: 720px\)[\s\S]*?\.release-download-menu\s*\{[^}]*flex: 1 1 auto/);
  assert.match(css, /@media \(max-width: 720px\)[\s\S]*?\.release-download__trigger\s*\{[^}]*width: 100%[^}]*min-width: 0/);
  assert.match(css, /\.release-modal__dialog\s*\{[^}]*max-height: min\(780px, calc\(100svh - 48px\)\)[^}]*overflow-y: auto/);
});

test('releases page: one-click installer, more-downloads menu, back link and sectioned releases', async () => {
  const [releases, css] = await Promise.all([
    read('src/components/ReleasesPage.tsx'),
    read('src/index.css'),
  ]);

  assert.ok(releases.includes('Back to Vast'));
  assert.ok(!releases.includes('SiteHeader'));
  assert.ok(!releases.includes('Every build'));
  assert.ok(releases.includes('release-download-main'));
  assert.ok(releases.includes('onClick={() => startDownload(release, installer)}'));
  assert.ok(releases.includes('More downloads'));
  assert.ok(releases.indexOf('release-download-main') < releases.indexOf('release-download-menu'));
  const releaseRule = css.match(/\.release\s*\{[\s\S]*?\}/)?.[0] ?? '';
  assert.match(releaseRule, /border: 1px solid/);
  assert.match(releaseRule, /border-radius/);
});

test('back links are plain text links and release dropdown icons are monochrome', async () => {
  const [releases, support, css] = await Promise.all([
    read('src/components/ReleasesPage.tsx'),
    read('src/components/SupportPage.tsx'),
    read('src/index.css'),
  ]);

  assert.ok(releases.includes('className="legal-back-link"'));
  assert.ok(support.includes('className="legal-back-link"'));
  assert.ok(!css.includes('.vast-control'));
  const iconRule = css.match(/\.release-download-menu__panel svg\s*\{[\s\S]*?\}/)?.[0] ?? '';
  assert.doesNotMatch(iconRule, /accent/);
  const emRule = css.match(/\.release-download-menu__panel strong em\s*\{[\s\S]*?\}/)?.[0] ?? '';
  assert.doesNotMatch(emRule, /accent/);
});

test('header stays hidden at the top and is a short glass bar once scrolled', async () => {
  const [header, css] = await Promise.all([
    read('src/components/SiteHeader.tsx'),
    read('src/index.css'),
  ]);

  assert.ok(header.includes('window.scrollY >'));
  assert.ok(header.includes("{ passive: true }"));
  assert.ok(header.includes('is-visible'));
  for (const label of ['Releases', 'Extensions', 'Documentation', 'Discord']) assert.ok(header.includes(`>${label}<`) || header.includes(label));
  assert.ok(header.includes('https://extensions.vastbrowser.com'));
  assert.ok(header.includes('https://discord.gg/QmQ54MArrB'));
  const base = css.match(/\.site-header\s*\{[\s\S]*?\}/)?.[0] ?? '';
  assert.match(base, /position: fixed/);
  assert.match(base, /height: 48px/);
  assert.match(base, /backdrop-filter: blur\(18px\)/);
  assert.match(base, /opacity: 0/);
  assert.match(css, /\.site-header\.is-visible,\s*\.site-header:focus-within\s*\{[^}]*opacity: 1/);
});
