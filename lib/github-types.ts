/**
 * Types describing the GitHub data rendered by the projects section.
 *
 * These live outside `github.ts` so that Client and Server Components can both
 * import them without pulling in the `server-only` boundary.
 */

export type Language = {
  name: string;
  color: string | null;
};

export type Repo = {
  id: string;
  name: string;
  description: string | null;
  url: string;
  forkCount: number;
  isFork: boolean;
  stargazers: { totalCount: number };
  primaryLanguage: Language | null;
};

export type LanguageStat = {
  name: string;
  size: number;
  percentage: string;
  color: string;
};

export type ProjectsData = {
  repos: Repo[];
  languageStats: LanguageStat[];
};
