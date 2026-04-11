import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';

import { isExperienceMode, type ExperienceMode } from './experience-mode';
import LitePortfolio from './LitePortfolio';

const STORAGE_KEY = 'zia.experienceMode';

const FullPortfolio = lazy(() => import('./FullPortfolio'));

const isLikelyMobileDevice = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const narrowScreen = window.matchMedia('(max-width: 900px)').matches;
  const lowThreadCount = typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 4;

  return coarsePointer || narrowScreen || lowThreadCount;
};

const getExperienceModeFromQuery = (): ExperienceMode | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const params = new URLSearchParams(window.location.search);
  const mode = params.get('mode');

  if (mode === 'simple') {
    return 'company';
  }

  if (isExperienceMode(mode)) {
    return mode;
  }

  if (params.get('audience') === 'company') {
    return 'company';
  }

  if (params.get('perf') === '1') {
    return 'company';
  }

  if (params.get('perf') === '0') {
    return 'full';
  }

  return null;
};

const getDefaultExperienceMode = (): ExperienceMode | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  return isExperienceMode(window.__ZIA_DEFAULT_MODE__) ? window.__ZIA_DEFAULT_MODE__ : null;
};

const getInitialExperienceMode = (): ExperienceMode => {
  const queryMode = getExperienceModeFromQuery();

  if (queryMode) {
    return queryMode;
  }

  const defaultMode = getDefaultExperienceMode();

  if (defaultMode) {
    return defaultMode;
  }

  if (typeof window !== 'undefined') {
    const storedMode = window.localStorage.getItem(STORAGE_KEY);

    if (storedMode === 'simple') {
      return 'company';
    }

    if (isExperienceMode(storedMode)) {
      return storedMode;
    }
  }

  return isLikelyMobileDevice() ? 'company' : 'full';
};

function ExperienceToggle({
  mode,
  onChange,
}: {
  mode: ExperienceMode;
  onChange: (mode: ExperienceMode) => void;
}) {
  return (
    <div className="fixed left-1/2 bottom-4 z-[140] -translate-x-1/2 rounded-2xl border border-white/15 bg-background-dark/80 p-2 backdrop-blur-xl md:bottom-6">
      <div className="px-2 pb-2 text-center text-[9px] font-black uppercase tracking-[0.22em] text-slate-400">
        Experience
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onChange('company')}
          className={`rounded-xl border px-3 py-2 text-[10px] font-black uppercase tracking-widest transition-colors ${
            mode === 'company'
              ? 'border-primary bg-primary text-background-dark'
              : 'border-white/15 bg-white/5 text-slate-300'
          }`}
        >
          Mobile
        </button>
        <button
          type="button"
          onClick={() => onChange('full')}
          className={`rounded-xl border px-3 py-2 text-[10px] font-black uppercase tracking-widest transition-colors ${
            mode === 'full'
              ? 'border-primary bg-primary text-background-dark'
              : 'border-white/15 bg-white/5 text-slate-300'
          }`}
        >
          Live 3D
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [experienceMode, setExperienceMode] = useState<ExperienceMode>(getInitialExperienceMode);
  const [isMobileDevice, setIsMobileDevice] = useState(isLikelyMobileDevice);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, experienceMode);
  }, [experienceMode]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const url = new URL(window.location.href);
    const defaultMode = getDefaultExperienceMode();
    const keepCleanUrl =
      (defaultMode !== null && experienceMode === defaultMode) ||
      (defaultMode === null && experienceMode === 'full');

    if (keepCleanUrl) {
      url.searchParams.delete('mode');
      url.searchParams.delete('audience');
      url.searchParams.delete('perf');
    } else {
      url.searchParams.set('mode', experienceMode);
      if (experienceMode === 'company') {
        url.searchParams.set('audience', 'company');
      } else {
        url.searchParams.delete('audience');
      }
      url.searchParams.delete('perf');
    }

    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  }, [experienceMode]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const updateDeviceState = () => {
      setIsMobileDevice(isLikelyMobileDevice());
    };

    updateDeviceState();
    window.addEventListener('resize', updateDeviceState);

    return () => {
      window.removeEventListener('resize', updateDeviceState);
    };
  }, []);

  const showImmersivePortfolio = useMemo(() => {
    return experienceMode === 'full';
  }, [experienceMode]);

  return (
    <>
      <ExperienceToggle mode={experienceMode} onChange={setExperienceMode} />
      {showImmersivePortfolio ? (
        <Suspense fallback={<LitePortfolio experienceMode={experienceMode} isMobileDevice={isMobileDevice} />}>
          <FullPortfolio
            experienceMode={experienceMode}
            isMobileDevice={isMobileDevice}
          />
        </Suspense>
      ) : (
        <LitePortfolio experienceMode={experienceMode} isMobileDevice={isMobileDevice} />
      )}
    </>
  );
}
