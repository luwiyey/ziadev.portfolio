export type ExperienceMode = 'full' | 'simple' | 'company';

export const isExperienceMode = (value: unknown): value is ExperienceMode => {
  return value === 'full' || value === 'simple' || value === 'company';
};
