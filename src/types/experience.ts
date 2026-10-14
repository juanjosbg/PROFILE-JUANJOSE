import type { Language } from "./certificate";
export type ExperienceItem = {
  title: Record<Language, string>;
  company: string;
  period: string;
  description: Record<Language, string>;
  highlights: string[];
};
