export type ExperienceMode = 'full' | 'mobile';

export const isExperienceMode = (value: unknown): value is ExperienceMode => {
  return value === 'full' || value === 'mobile';
};
