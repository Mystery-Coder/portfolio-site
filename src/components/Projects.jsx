import { useEffect, useState } from "react";
import { FaGithub, FaStar } from "react-icons/fa";
import { BiGitRepoForked } from "react-icons/bi";

export default function Projects() {
	const [pinnedRepos, setPinnedRepos] = useState([]);
	const [languageStats, setLanguageStats] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getPinned();
	}, []);

	const calculateLanguageStats = (repos) => {
		const languageSizes = {};
		const languageColors = {};

		repos.forEach((repo) => {
			if (repo.isFork) return; // Skip forks

			repo.languages?.edges?.forEach((edge) => {
				const name = edge.node.name;
				const size = edge.size;
				const color = edge.node.color;

				languageSizes[name] = (languageSizes[name] || 0) + size;
				if (color) {
					languageColors[name] = color;
				}
			});
		});

		const totalSize = Object.values(languageSizes).reduce(
			(sum, size) => sum + size,
			0
		);

		const stats = Object.entries(languageSizes)
			.map(([name, size]) => ({
				name,
				size,
				percentage: ((size / totalSize) * 100).toFixed(1),
				color: languageColors[name] || "#808080",
			}))
			.sort((a, b) => b.size - a.size)
			.slice(0, 5); // Top 5 languages

		return stats;
	};

	const getPinned = async () => {
		try {
			setLoading(true);
			let res = await fetch(
				"https://github-stats-backend-production.up.railway.app/api/pinned/Mystery-Coder"
			);
			let data = await res.json();
			let statsRes = await fetch(
				"https://github-stats-backend-production.up.railway.app/api/stats/Mystery-Coder"
			);
			let statsData = await statsRes.json();

			// Extract the repositories from the nested structure
			const repos = data.user.pinnedItems.edges.map((edge) => edge.node);
			setPinnedRepos(repos);

			// Calculate language stats from all repositories
			const allRepos = statsData.user.repositories.nodes;
			const stats = calculateLanguageStats(allRepos);
			setLanguageStats(stats);
		} catch (error) {
			console.error("Error fetching pinned repos:", error);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div className="w-full px-4">
				<h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center dark:text-white">
					Projects
				</h2>
				<div className="flex justify-center items-center py-8">
					<div className="text-gray-600 dark:text-gray-400">
						Loading projects...
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full px-4">
			<h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center dark:text-white">
				Projects
			</h2>

			{/* Language Statistics */}
			{languageStats.length > 0 && (
				<div className="max-w-4xl mx-auto mb-8 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
					<h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
						Most Used Languages
					</h3>
					<div className="space-y-3">
						{languageStats.map((lang) => (
							<div key={lang.name} className="space-y-1">
								<div className="flex justify-between text-sm">
									<span className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
										<span
											className="w-3 h-3 rounded-full"
											style={{
												backgroundColor: lang.color,
											}}
										></span>
										{lang.name}
									</span>
									<span className="font-semibold text-gray-900 dark:text-white">
										{lang.percentage}%
									</span>
								</div>
								<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
									<div
										className="h-2 rounded-full transition-all duration-500"
										style={{
											width: `${lang.percentage}%`,
											backgroundColor: lang.color,
										}}
									></div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Pinned Repositories */}
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
					{pinnedRepos.map((repo) => (
						<div
							key={repo.id}
							className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 flex flex-col"
						>
							{/* Header with gradient accent */}
							<div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>

							<div className="p-6 flex flex-col flex-grow">
								{/* Repository Name */}
								<h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
									{repo.name}
								</h3>

								{/* Description */}
								<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow min-h-[50px] line-clamp-3">
									{repo.description ||
										"No description available"}
								</p>

								{/* Stats Row */}
								<div className="flex gap-4 mb-4 text-sm">
									<div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded-lg">
										<FaStar
											className="text-yellow-500"
											size={14}
										/>
										<span className="font-semibold">
											{repo.stargazers.totalCount}
										</span>
									</div>
									<div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded-lg">
										<BiGitRepoForked size={14} />
										<span className="font-semibold">
											{repo.forkCount}
										</span>
									</div>
								</div>

								{/* Language Tag */}
								<div className="mb-4">
									{repo.primaryLanguage && (
										<span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-blue-500 to-cyan-500">
											<span
												className="inline-block w-2.5 h-2.5 rounded-full bg-white"
												style={{
													backgroundColor:
														repo.primaryLanguage
															.color,
												}}
											></span>
											{repo.primaryLanguage.name}
										</span>
									)}
								</div>

								{/* GitHub Link Button */}
								<div className="mt-auto">
									<a
										href={repo.url}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-md hover:shadow-lg"
									>
										<FaGithub size={18} />
										View Repository
									</a>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
