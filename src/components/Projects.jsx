import { useEffect, useState } from "react";
import { FaGithub, FaStar } from "react-icons/fa";
import { BiGitRepoForked } from "react-icons/bi";

export default function Projects() {
	const [pinnedRepos, setPinnedRepos] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getPinned();
	}, []);

	const getPinned = async () => {
		try {
			setLoading(true);
			let res = await fetch(
				"https://github-stats-backend-production.up.railway.app/api/pinned/Mystery-Coder"
			);
			let data = await res.json();

			// Extract the repositories from the nested structure
			const repos = data.user.pinnedItems.edges.map((edge) => edge.node);
			setPinnedRepos(repos);
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
			<div className="flex flex-wrap justify-center gap-6 px-4 py-8 bg-gray-100 dark:bg-gray-600">
				{pinnedRepos.map((repo) => (
					<div
						key={repo.id}
						className="bg-white rounded-xl shadow p-6 w-full sm:w-[300px] text-center dark:bg-gray-800 dark:text-white"
					>
						<h3 className="text-xl font-bold mb-4">{repo.name}</h3>
						<div className="text-lg mb-4 min-h-[60px]">
							{repo.description || "No description available"}
						</div>

						<div className="flex justify-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
							<div className="flex items-center gap-1">
								<FaStar className="text-yellow-500" />
								<span>{repo.stargazers.totalCount}</span>
							</div>
							<div className="flex items-center gap-1">
								<BiGitRepoForked />
								<span>{repo.forkCount}</span>
							</div>
						</div>

						<div className="flex flex-row justify-center gap-4 m-2 p-2">
							<a
								href={repo.url}
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-800 hover:text-black dark:text-white dark:hover:text-gray-300 text-3xl"
							>
								<FaGithub />
							</a>
						</div>

						<div className="flex flex-wrap justify-center gap-2">
							{repo.primaryLanguage && (
								<span className="px-4 py-1 text-sm font-bold text-gray-700 bg-gray-100 rounded-full border flex items-center justify-center">
									<span
										className="inline-block w-3 h-3 rounded-full mr-2"
										style={{
											backgroundColor:
												repo.primaryLanguage.color,
										}}
									></span>
									{repo.primaryLanguage.name}
								</span>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
