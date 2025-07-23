import { FaLink, FaGithub } from "react-icons/fa";
export default function Projects() {
	return (
		<div className="w-full px-4">
			<h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
				Projects
			</h2>
			<div className="flex flex-wrap justify-center gap-6 px-4 py-8 bg-gray-100">
				{[
					{
						title: "QuizzoAngular",
						skills: ["Go", "Angular", "PostgreSQL"],
						desc: `QuizzoAngular is a modern quiz application built using 
					Angular and backed by a RESTful API developed in Go with a PostgreSQL database.`,
						github: "https://github.com/Mystery-Coder/quizzo-angular",
						demo: "",
					},
					{
						title: "Tourism Promotion App",
						skills: ["Express.js", "Flutter/Dart"],
						desc: `A cross-platform mobile application built with Flutter and Node.js to promote lesser-known 
					tourist destinations and trekking spots.`,
						github: "https://github.com/Mystery-Coder/Tourism-Promotion-App",
						demo: "",
					},
					{
						title: "Stoic Quotes SVG",
						skills: ["Go"],
						desc: `
						A backend written in GoLang to generate a stoic quote SVG. Inspired from Github Readme Quotes, Uses stoic quotes from Stoic Quote API.`,
						github: "https://github.com/Mystery-Coder/go-stoic-quotes",
						demo: "https://go-stoic-quotes-production.up.railway.app/stoic-quote-svg?theme=random",
					},
				].map(({ title, skills, desc, github, demo }) => (
					<div
						key={title}
						className="bg-white rounded-xl shadow p-6 w-full sm:w-[300px] text-center"
					>
						<h3 className="text-xl font-bold mb-4">{title}</h3>
						<div className="text-lg mb-4">{desc}</div>

						<div className="flex flex-row gap-4 m-2 p-2">
							{github && (
								<a
									href={github}
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-800 hover:text-black text-3xl"
								>
									<FaGithub />
								</a>
							)}
							{demo && (
								<a
									href={demo}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:text-blue-800 text-3xl"
								>
									<FaLink />
								</a>
							)}
						</div>
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
