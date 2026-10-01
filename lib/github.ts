import "server-only";

import type { LanguageStat, ProjectsData, Repo } from "@/lib/github-types";
import { site } from "@/lib/site";

export type { LanguageStat, ProjectsData, Repo } from "@/lib/github-types";

/**
 * GitHub data is proxied through a small backend that holds the GraphQL token,
 * so no `GITHUB_TOKEN` is needed in this repo.
 *
 * NOTE: must include the `/api` path segment — requests are built as
 * `${API_BASE}/pinned/${user}`, so a bare host 404s.
 */
const API_BASE =
  process.env.GITHUB_STATS_API_URL ??
  "https://github-stats-backend-production.up.railway.app/api";

/**
 * ISR window. Pages are statically prerendered and refetched from the API at
 * most once per hour, so an upstream outage can never fail a build.
 */
export const REVALIDATE_SECONDS = 3600;

/** Repos whose language bytes would skew the "most used languages" chart. */
const EXCLUDED_REPOS = new Set([
  "XAI-AIML",
  "ML-Stress-Detection",
  "XAI-Project",
]);

type LanguageEdge = {
  size: number;
  node: { name: string; color: string | null };
};

/** Shape of an upstream repo node, before normalisation. */
type RawRepo = {
  id?: string;
  name?: string;
  description?: string | null;
  url?: string;
  forkCount?: number;
  isFork?: boolean;
  stargazers?: { totalCount?: number } | null;
  primaryLanguage?: { name: string; color: string | null } | null;
  languages?: { edges?: LanguageEdge[] } | null;
};

type PinnedResponse = {
  user?: { pinnedItems?: { edges?: { node: RawRepo }[] } | null } | null;
};

type StatsResponse = {
  user?: { repositories?: { nodes?: RawRepo[] } | null } | null;
};

/**
 * Coerces an untrusted upstream payload into a `Repo`. Returns `null` when the
 * node is missing the fields the UI renders, so a partial API change degrades
 * to fewer cards rather than a render crash.
 */
function normaliseRepo(raw: RawRepo | undefined): Repo | null {
  if (!raw?.name || !raw.url) return null;

  return {
    id: raw.id ?? raw.url,
    name: raw.name,
    description: raw.description ?? null,
    url: raw.url,
    forkCount: raw.forkCount ?? 0,
    isFork: raw.isFork === true,
    stargazers: { totalCount: raw.stargazers?.totalCount ?? 0 },
    primaryLanguage: raw.primaryLanguage ?? null,
  };
}

/**
 * Aggregates language bytes across non-fork repos and returns the top five as
 * percentages of the total.
 */
export function calculateLanguageStats(
  repos: readonly RawRepo[],
): LanguageStat[] {
  const sizes = new Map<string, number>();
  const colors = new Map<string, string>();

  for (const repo of repos) {
    if (repo.isFork) continue;
    if (EXCLUDED_REPOS.has(repo.name ?? "")) continue;

    for (const edge of repo.languages?.edges ?? []) {
      const { name } = edge.node;
      sizes.set(name, (sizes.get(name) ?? 0) + edge.size);
      if (edge.node.color) colors.set(name, edge.node.color);
    }
  }

  const totalSize = [...sizes.values()].reduce((sum, size) => sum + size, 0);
  if (totalSize === 0) return [];

  return [...sizes.entries()]
    .map(([name, size]) => ({
      name,
      size,
      percentage: ((size / totalSize) * 100).toFixed(1),
      color: colors.get(name) ?? "#808080",
    }))
    .sort((a, b) => b.size - a.size)
    .slice(0, 5);
}

/**
 * Fetches pinned repositories and language statistics.
 *
 * Never throws: an unreachable or malformed upstream returns empty data so
 * that `next build` and ISR revalidation cannot fail because of a third party.
 */
export async function getProjectsData(): Promise<ProjectsData> {
  const empty: ProjectsData = { repos: [], languageStats: [] };
  const { githubUser } = site;

  try {
    const [pinnedRes, statsRes] = await Promise.all([
      fetch(`${API_BASE}/pinned/${githubUser}`, {
        next: { revalidate: REVALIDATE_SECONDS },
      }),
      fetch(`${API_BASE}/stats/${githubUser}`, {
        next: { revalidate: REVALIDATE_SECONDS },
      }),
    ]);

    if (!pinnedRes.ok || !statsRes.ok) {
      console.error(
        `[github] upstream error — pinned=${pinnedRes.status} stats=${statsRes.status}`,
      );
      return empty;
    }

    const [pinned, stats] = (await Promise.all([
      pinnedRes.json(),
      statsRes.json(),
    ])) as [PinnedResponse, StatsResponse];

    const repos = (pinned.user?.pinnedItems?.edges ?? [])
      .map((edge) => normaliseRepo(edge.node))
      .filter((repo): repo is Repo => repo !== null);

    return {
      repos,
      languageStats: calculateLanguageStats(stats.user?.repositories?.nodes ?? []),
    };
  } catch (error) {
    console.error("[github] failed to fetch project data:", error);
    return empty;
  }
}
