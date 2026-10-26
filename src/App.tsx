import { lazy, Suspense } from 'react';
import Portfolio from './Portfolio';

const FullPortfolio = lazy(() => import('./FullPortfolio'));
const ConceptSite = lazy(() => import('./concepts/ConceptSite'));
const concept = new URLSearchParams(window.location.search).get('concept');
const lab = new URLSearchParams(window.location.search).get('lab');
const InteractiveLab = lazy(() => import('./concepts/InteractiveLab'));

// The original stays available without loading its 3D code on the redesigned site.
const showOriginal = window.__ZIA_DEFAULT_MODE__ === 'full' ||
  new URLSearchParams(window.location.search).get('mode') === 'full';

export default function App() {
  if (lab) return <Suspense fallback={<div className="original-loading">Opening experiment...</div>}><InteractiveLab demo={lab} standalone /></Suspense>;
  if (concept) return <Suspense fallback={<div className="original-loading">Opening concept...</div>}><ConceptSite slug={concept} /></Suspense>;
  if (!showOriginal) return <Portfolio />;
  return (
    <>
      <a className="original-return" href="./index.html">Back to portfolio</a>
      <Suspense fallback={<div className="original-loading">Loading the original 3D portfolio...</div>}>
        <FullPortfolio experienceMode="full" isMobileDevice={window.matchMedia('(max-width: 900px)').matches} />
      </Suspense>
    </>
  );
}
