import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('renders the new four-part page in the intended scroll order', async () => {
  const app = await read('src/App.tsx');

  const logo = app.indexOf('<SceneLogo />');
  const video = app.indexOf('<SceneVideo />');
  const details = app.indexOf('<SceneDetails />');
  const cta = app.indexOf('<SceneCTA />');

  assert.ok(logo > -1 && logo < video && video < details && details < cta);
  assert.doesNotMatch(app, /SceneSlogan|SceneProduct|CinematicControls/);
});

test('uses the Vast icon and concise browser title', async () => {
  const html = await read('index.html');

  assert.match(html, /href="\/logos\/vasticon\.png"/);
  assert.match(html, /<title>Vast Browser<\/title>/);
  assert.match(html, /property="og:image" content="https:\/\/vastsite\.pages\.dev\/logos\/vast2\.png"/);
  assert.match(html, /name="twitter:image" content="https:\/\/vastsite\.pages\.dev\/logos\/vast2\.png"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
});

test('restores the original Vast logo reveal without copy underneath', async () => {
  const [hero, css] = await Promise.all([
    read('src/components/SceneLogo.tsx'),
    read('src/index.css'),
  ]);

  assert.match(hero, /src="\/logos\/vast\.png"/);
  assert.match(hero, /filter: 'blur\(28px\)'/);
  assert.match(hero, /duration: reduced \? 0\.3 : 2\.6/);
  assert.doesNotMatch(hero, /Vast, Infinite By Design/);
  assert.doesNotMatch(hero, /coming soon|setInterval|AnimatePresence/i);
  assert.match(css, /\.hero__logo img[\s\S]*top: -88\.889%/);
  assert.match(css, /\.hero__ambient[\s\S]*animation: ambient-drift 12s/);
});

test('provides a rounded scroll-revealed autoplay video with a fallback', async () => {
  const [video, css] = await Promise.all([
    read('src/components/SceneVideo.tsx'),
    read('src/index.css'),
  ]);

  assert.match(video, /<video/);
  assert.match(video, /autoPlay/);
  assert.match(video, /loop/);
  assert.match(video, /muted/);
  assert.match(video, /playsInline/);
  assert.match(video, /vast-animation\.webm/);
  assert.match(video, /vast-animation\.mp4/);
  assert.match(video, /useScroll/);
  assert.match(video, /film__fallback/);
  assert.match(video, /coming soon/);
  assert.match(css, /\.film\s*\{[\s\S]*border-radius:/);
  assert.match(css, /\.film\s*\{[\s\S]*height: min\(82svh, 940px\)/);
});

test('renders an accessible expandable Why Vast explanation', async () => {
  const [details, css] = await Promise.all([
    read('src/components/SceneDetails.tsx'),
    read('src/index.css'),
  ]);

  assert.match(details, /Why should I actually use Vast\?/);
  assert.match(details, /aria-expanded=\{open\}/);
  assert.match(details, /aria-controls="why-answer"/);
  assert.match(details, /why__continuation/);
  assert.match(details, /Continue Reading/);
  assert.match(details, /Your browser should support the way you think/);
  assert.match(details, /Vast collects no browsing telemetry/);
  assert.match(details, /The result is a browser that feels calm/);
  assert.doesNotMatch(details, /Built for a calmer web/);
  assert.match(css, /mask-image: linear-gradient/);
  assert.match(css, /\.why__continuation\.is-open/);
  assert.match(css, /\.why__continuation\.is-open[\s\S]*max-height: 900px/);
  const whyInnerRule = css.match(/\.why__inner\s*\{[\s\S]*?\}/)?.[0] ?? '';
  assert.doesNotMatch(whyInnerRule, /border/);
});

test('renders a plain download section and minimal footer', async () => {
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
  assert.match(footer, /Privacy Notice/);
  assert.match(footer, /Copyright\/IP Notice/);
  assert.match(footer, /Publisher Terms/);
  assert.match(footer, /Publishing Policy/);
  assert.match(footer, /docs\.vastbrowser\.com/);
  assert.match(footer, /discord\.gg\/f7bnZ3cmq/);
  assert.match(footer, /Join our Discord and give feedback/);
  assert.match(footer, /icons\.svg#discord-icon/);
  assert.match(icons, /id="discord-icon"[\s\S]*?<path fill="currentColor"/);
  assert.doesNotMatch(icons, /#aa3bff/i);
  assert.match(icons, /stroke="#c272ff"/i);
  assert.doesNotMatch(cta, /Get Vast|Built for the open web|aria-label="Back to top"/);
  assert.match(css, /\.download__copy h2[\s\S]*font-weight: 600/);
  assert.match(css, /\.download__card[\s\S]*margin: auto/);
  const downloadCardRule = css.match(/\.download__card\s*\{[\s\S]*?\}/)?.[0] ?? '';
  assert.doesNotMatch(downloadCardRule, /border|background|box-shadow/);
});

test('uses the higher-contrast Vast purple accent consistently', async () => {
  const css = await read('src/index.css');

  assert.match(css, /--accent:\s*#6900b5/i);
  assert.match(css, /--accent-text:\s*#c272ff/i);
  assert.match(css, /\.release__meta span[\s\S]*color:\s*var\(--accent-text\)/);
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
  assert.match(app, /path === '\/support'/);
  assert.match(app, /path === '\/copyright'/);
  assert.match(app, /path === '\/platform-terms'/);
  assert.match(app, /path === '\/publisher-terms'/);
  assert.match(app, /path === '\/publishing-policy'/);
  assert.match(releases, /fetch\('\/downloads\/manifest\.json'\)/);
  assert.match(releases, /No public builds yet/);
  assert.match(releases, /Release Information/);
  assert.match(releases, /release-modal__changelog/);
  assert.match(releases, /Changes since 0\.1\.5/);
  assert.match(releases, /aria-expanded=\{expandedChangelog\}/);
  assert.match(releases, /Show full changelog/);
  assert.match(releases, /Collapse changelog/);
  assert.ok(releases.indexOf('release-modal__download') < releases.indexOf('release-modal__changelog'));
  assert.doesNotMatch(releases, /<p>Releases<\/p>/);
  assert.match(releases, /<h1>Vast Releases<\/h1>/);
  assert.doesNotMatch(releases, /Official builds, published in one quiet place\./);
  assert.match(releases, /Your download has started/);
  assert.match(releases, /Report bugs on Discord/);
  assert.match(releases, /discord\.gg\/f7bnZ3cmq/);
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
  assert.match(legal, /\['Operator', 'Jan Nowacki'\]/);
  assert.match(legal, /No separate legal email address is asserted here/);
  const releaseManifest = JSON.parse(manifest);
  assert.equal(releaseManifest.releases[0].version, 'Beta 0.2.5');
  assert.equal(releaseManifest.releases[0].channel, 'Official');
  assert.match(releaseManifest.releases[0].files[0].url, /vast-public\/releases\/download\/v0\.2\.5/);
  assert.ok(releaseManifest.releases[0].changelog.length >= 5);
  const changelog = releaseManifest.releases[0].changelog.flatMap((section) => section.items).join(' ');
  assert.match(changelog, /Ctrl-K/);
  assert.match(changelog, /Extension Hub/);
  assert.match(changelog, /IDU\+ by Vast/);
  assert.match(changelog, /Electron 43\.4\.1/);
  assert.match(changelog, /FFmpeg 9\.0\.1/);
  assert.match(changelog, /0\.1\.5-to-0\.2\.5/);
  assert.equal(releaseManifest.releases[1].version, 'Beta 0.1.5');
  assert.equal(releaseManifest.releases[1].channel, 'Legacy');
  assert.match(releaseManifest.releases[1].files[0].url, /vast-public\/releases\/download\/public-release-0\.1\.5/);
});

test('uses the dark Vast control style for buttons', async () => {
  const css = await read('src/index.css');
  const buttonRule = css.match(/\.button\s*\{[\s\S]*?\}/)?.[0] ?? '';

  assert.match(buttonRule, /border-radius: 14px/);
  assert.match(buttonRule, /background: #121217/);
  assert.match(buttonRule, /font-weight: 600/);
  assert.doesNotMatch(buttonRule, /border-radius: 999px/);
});

test('includes responsive and reduced-motion safeguards', async () => {
  const css = await read('src/index.css');

  assert.match(css, /@media \(max-width: 720px\)/);
  assert.match(css, /@media \(max-width: 430px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.doesNotMatch(css, /scroll-snap-type|overflow-y:\s*scroll/);
  assert.doesNotMatch(css, /Basenji/);
  assert.match(css, /\.why__inner h2[\s\S]*font-weight: 600/);
  assert.match(css, /\.why__inner[\s\S]*text-align: center/);
});
