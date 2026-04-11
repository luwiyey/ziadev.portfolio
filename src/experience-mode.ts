export type ExperienceMode = 'full' | 'company';

export const isExperienceMode = (value: unknown): value is ExperienceMode => {
  return value === 'full' || value === 'company';
};
