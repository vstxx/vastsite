import './index.css';
import SceneCTA from './components/SceneCTA';
import SceneDetails from './components/SceneDetails';
import SceneLogo from './components/SceneLogo';
import SceneVideo from './components/SceneVideo';
import LegalPage from './components/LegalPage';
import ReleasesPage from './components/ReleasesPage';

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';

  if (path === '/releases') return <ReleasesPage />;
  if (path === '/privacy') return <LegalPage kind="privacy" />;
  if (path === '/copyright') return <LegalPage kind="copyright" />;

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
