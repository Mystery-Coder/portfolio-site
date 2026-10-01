import { Portfolio } from "@/components/Portfolio";
import { getProjectsData } from "@/lib/github";

/**
 * Regenerate the page in the background at most once an hour. The upstream
 * fetch inside `getProjectsData` carries the same window, so a GitHub outage
 * serves the last good page instead of failing the build.
 *
 * Declared as a literal because Next.js reads route segment config statically.
 */
export const revalidate = 3600;

export default async function Home() {
	const { repos, languageStats } = await getProjectsData();

	return <Portfolio repos={repos} languageStats={languageStats} />;
}
