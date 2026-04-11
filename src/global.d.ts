import type { ExperienceMode } from './experience-mode';

declare global {
  interface Window {
    __ZIA_DEFAULT_MODE__?: ExperienceMode;
  }
}

export {};
