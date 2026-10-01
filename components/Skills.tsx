import { skillCategories } from "@/lib/site";

export function Skills() {
  return (
    <div className="w-full px-4">
      <h2 className="mb-6 text-center text-3xl font-semibold text-gray-900 dark:text-white">
        Skills and Technologies
      </h2>

      <div className="flex flex-wrap justify-center gap-6 bg-gray-100 px-4 py-8 dark:bg-gray-600">
        {skillCategories.map(({ title, skills }) => (
          <div
            key={title}
            className="w-full rounded-xl p-6 text-center shadow sm:w-[300px] bg-white dark:bg-gray-800 dark:text-white"
          >
            <h3 className="mb-4 text-xl font-bold">{title}</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border bg-gray-100 px-4 py-1 text-sm font-bold text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
