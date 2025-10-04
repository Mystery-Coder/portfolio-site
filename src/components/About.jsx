import { FaGithub, FaLinkedin } from "react-icons/fa";
import useDarkMode from "../hooks/useDarkMode";

export default function About() {
	const [darkMode, setDarkMode] = useDarkMode();

	return (
		<div className="border p-6 max-w-4xl mx-auto mt-10 rounded-lg shadow-md bg-white dark:bg-gray-800 dark:text-white">
			<h2 className="text-3xl font-semibold text-gray-900 mb-2 dark:text-white">
				About Me
			</h2>

			<div className="flex flex-col md:flex-row gap-6 dark:text-white">
				<div className="md:w-1/2 text-gray-800 dark:text-white">
					<p>
						I am an aspiring software developer pursuing a Computer
						Science degree at RVCE, Bangalore. I have a passion for
						programming and building practical, user-centered
						products.
					</p>
					<br />
					<p>
						I specialize in modern web technologies such as React
						and Express.js to create engaging and interactive user
						interfaces. For cross-platform mobile development, I
						prefer Flutter and Dart, enabling me to craft beautiful
						and efficient native applications. On the backend, I'm
						focus on Go (Golang) to build high-performance, scalable
						APIs that power robust solutions.
					</p>

					<div className="flex flex-row gap-4 mt-4">
						<a
							href="https://github.com/Mystery-Coder"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-800 hover:text-black dark:text-white dark:hover:text-gray-300 text-3xl"
						>
							<FaGithub />
						</a>
						<a
							href="https://www.linkedin.com/in/srikar-rao-57a60732a"
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 hover:text-blue-800 text-3xl"
						>
							<FaLinkedin />
						</a>
					</div>
				</div>

				<div className="md:w-1/2">
					<h3 className="text-3xl font-bold mb-2">Tech Stack</h3>
					<a href="https://skillicons.dev" target="_blank">
						{/* Light version */}
						<img
							src="https://skillicons.dev/icons?i=html,css,js,ts,react,angular,p5js,processing,flutter,dart,express,python,go,c,cpp,bash,arduino,raspberrypi&theme=light&perline=6"
							alt="Tech Stack Icons Light"
							className="w-full h-auto dark:hidden"
						/>

						{/* Dark version */}
						<img
							src="https://skillicons.dev/icons?i=html,css,js,ts,react,angular,p5js,processing,flutter,dart,express,python,go,c,cpp,bash,arduino,raspberrypi&theme=dark&perline=6"
							alt="Tech Stack Icons Dark"
							className="w-full h-auto hidden dark:block"
						/>
					</a>
				</div>
			</div>
		</div>
	);
}
