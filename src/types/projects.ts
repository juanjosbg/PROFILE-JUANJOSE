import type { Language } from "./certificate";
export type Project = {
  title: string;
  description: Record<Language, string>;
  tech: string[];
  image: string;
  liveUrl: string | null;
  githubUrl: string;
  repositoryStatus?: "public" | "private";
  status: "active" | "progress" | "building";
  featured: boolean;
};
