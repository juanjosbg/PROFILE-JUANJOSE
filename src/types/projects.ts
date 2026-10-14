import type { Language } from './certificate';
export type Project = {
  title: string;
  description: Record<Language, string>;
  tech: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  status: 'active' | 'progress' | 'building';
  featured: boolean;
};
