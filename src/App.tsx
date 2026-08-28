import './index.css';
import SceneCTA from './components/SceneCTA';
import SceneDetails from './components/SceneDetails';
import SceneLogo from './components/SceneLogo';
import SceneVideo from './components/SceneVideo';
import LegalPage from './components/LegalPage';
import ReleasesPage from './components/ReleasesPage';
import SupportPage from './components/SupportPage';

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';

  if (path === '/releases') return <ReleasesPage />;
  if (path === '/support') return <SupportPage />;
  if (path === '/legal') return <LegalPage kind="legal" />;
  if (path === '/privacy') return <LegalPage kind="privacy" />;
  if (path === '/copyright') return <LegalPage kind="copyright" />;
  if (path === '/platform-terms') return <LegalPage kind="platform-terms" />;
  if (path === '/publisher-terms') return <LegalPage kind="publisher-terms" />;
  if (path === '/publishing-policy') return <LegalPage kind="publishing-policy" />;

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <main id="top">
        <SceneLogo />
        <SceneVideo />
        <SceneDetails />
        <SceneCTA />
      </main>
    </>
  );
}
