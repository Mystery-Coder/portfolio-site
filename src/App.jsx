import "./App.css";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

// Smooth scroll function
const scrollToSection = (sectionId) => {
	const element = document.getElementById(sectionId);
	if (element) {
		element.scrollIntoView({ behavior: "smooth" });
	}
};

function App() {
	return (
		<>
			{/* Navbar */}
			<nav className="bg-gray-900 shadow-md sticky top-0 z-50">
				<div className="w-full px-4">
					<div className="flex justify-between h-16 items-center">
						<div className="flex-shrink-0 text-2xl font-bold text-blue-400">
							Srikar Rao H M
						</div>

						<div className="hidden md:flex space-x-6">
							<button
								onClick={() => scrollToSection("about")}
								className="text-white hover:text-blue-400"
							>
								About
							</button>
							<button
								onClick={() => scrollToSection("skills")}
								className="text-white hover:text-blue-400"
							>
								Skills
							</button>
							<button
								onClick={() => scrollToSection("projects")}
								className="text-white hover:text-blue-400"
							>
								Projects
							</button>
							<button
								onClick={() => scrollToSection("contact")}
								className="text-white hover:text-blue-400"
							>
								Contact Me
							</button>
						</div>
					</div>
				</div>
			</nav>

			<div className="flex flex-col items-center text-center m-30 p-6">
				<img
					src="/me.webp"
					alt="Srikar"
					className="w-40 h-40 rounded-full object-cover mb-6 shadow-md"
				/>
				<h1 className="text-5xl sm:text-7xl font-bold text-gray-900 mb-4">
					Hi, I'm <span className="text-blue-400">Srikar</span>
				</h1>
				<p className="text-2xl text-gray-700 mb-6">
					Computer Science student at RVCE, learning mordern
					technologies to build real world solutions
				</p>

				<div className="flex flex-row gap-4">
					<button
						className="bg-black hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded shadow"
						onClick={() => scrollToSection("projects")}
					>
						My Projects
					</button>
					<button
						className="bg-white hover:bg-gray-200 text-black font-semibold py-2 px-4 rounded shadow"
						onClick={() => scrollToSection("contact")}
					>
						Contact Me
					</button>
				</div>
			</div>

			<div className="flex flex-col items-center space-y-20 bg-gray-100 pb-20">
				<div id="about" className="scroll-mt-20 w-full max-w-4xl px-4">
					<About />
				</div>
				<div id="skills" className="scroll-mt-20 w-full max-w-4xl px-4">
					<Skills />
				</div>
				<div
					id="projects"
					className="scroll-mt-20 w-full max-w-4xl px-4"
				>
					<Projects />
				</div>
				<div
					id="contact"
					className="scroll-mt-20 w-full max-w-4xl px-4"
				>
					<Contact />
				</div>
			</div>
		</>
	);
}

export default App;
