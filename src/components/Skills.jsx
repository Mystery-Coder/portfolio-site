export default function Skills() {
	return (
		<div className="w-full px-4">
			<h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
				Skills and Technologies
			</h2>

			<div className="flex flex-wrap justify-center gap-6 px-4 py-8 bg-gray-100">
				{[
					{
						title: "Frontend",
						skills: [
							"React",
							"JavaScript",
							"TypeScript",
							"HTML/CSS",
							"Angular",
						],
					},
					{
						title: "Backend",
						skills: [
							"Node.js",
							"Express.js",
							"Python",

							"PostgreSQL",
							"Go(GoLang)",
						],
					},
					{
						title: "Mobile",
						skills: ["Flutter/Dart", "React Native"],
					},
					{
						title: "Tools",
						skills: ["Git", "Github", "VS Code"],
					},
				].map(({ title, skills }) => (
					<div
						key={title}
						className="bg-white rounded-xl shadow p-6 w-full sm:w-[300px] text-center"
					>
						<h3 className="text-xl font-bold mb-4">{title}</h3>
						<div className="flex flex-wrap justify-center gap-2">
							{skills.map((skill) => (
								<span
									key={skill}
									className="px-4 py-1 text-sm font-bold text-gray-700 bg-gray-100 rounded-full border"
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
