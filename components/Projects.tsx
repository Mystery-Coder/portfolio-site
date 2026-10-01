import { BiGitRepoForked } from "react-icons/bi";
import { FaGithub, FaStar } from "react-icons/fa";

import type { LanguageStat, Repo } from "@/lib/github-types";

export function Projects({
  repos,
  languageStats,
}: {
  repos: Repo[];
  languageStats: LanguageStat[];
}) {
  return (
    <div className="w-full px-4">
      <h2 className="mb-6 text-center text-3xl font-semibold text-gray-900 dark:text-white">
        Projects
      </h2>

      {languageStats.length > 0 && (
        <div className="mx-auto mb-8 max-w-4xl rounded-xl p-6 shadow bg-white dark:bg-gray-800">
          <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Most Used Languages
          </h3>
          <div className="space-y-3">
            {languageStats.map((lang) => (
              <div key={lang.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: lang.color }}
                      aria-hidden="true"
                    />
                    {lang.name}
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {lang.percentage}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${lang.percentage}%`,
                      backgroundColor: lang.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {repos.length > 0 ? (
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 py-8 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
              <article
                key={repo.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 shadow-lg transition-all duration-300 hover:border-blue-400 hover:shadow-2xl bg-white dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500"
              >
                <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />

                <div className="flex grow flex-col p-6">
                  <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {repo.name}
                  </h3>

                  <p className="mb-4 line-clamp-3 min-h-[50px] grow text-sm text-gray-600 dark:text-gray-400">
                    {repo.description || "No description available"}
                  </p>

                  <div className="mb-4 flex gap-4 text-sm">
                    <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-1 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                      <FaStar className="text-yellow-500" size={14} />
                      <span className="font-semibold">
                        {repo.stargazers.totalCount}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-1 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                      <BiGitRepoForked size={14} />
                      <span className="font-semibold">{repo.forkCount}</span>
                    </div>
                  </div>

                  {repo.primaryLanguage && (
                    <div className="mb-4">
                      <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-1 text-sm font-semibold text-white">
                        <span
                          className="inline-block h-2.5 w-2.5 rounded-full bg-white"
                          style={{
                            // `null` (GitHub has no colour for some languages)
                            // falls back to the `bg-white` class above.
                            backgroundColor: repo.primaryLanguage.color ?? "white",
                          }}
                          aria-hidden="true"
                        />
                        {repo.primaryLanguage.name}
                      </span>
                    </div>
                  )}

                  <div className="mt-auto">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:from-blue-700 hover:to-cyan-700 hover:shadow-lg"
                    >
                      <FaGithub size={18} />
                      View Repository
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <p className="py-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Projects are temporarily unavailable. Please check back soon.
        </p>
      )}
    </div>
  );
}
