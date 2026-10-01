/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { FaArrowRight, FaGithub, FaLinkedin } from "react-icons/fa";

import type { LanguageStat, Repo } from "@/lib/github-types";
import { site } from "@/lib/site";
import { ThemeToggle } from "@/components/ThemeToggle";

const projects = [
	{
		number: "01",
		title: "Doc Spaces RAG",
		stack: "Next.js · Gemini · Supabase",
		description:
			"Asynchronous PDF indexing, page-aware retrieval, and streaming answers with document citations.",
		href: "https://github.com/Mystery-Coder",
	},
	{
		number: "02",
		title: "Trustless Notes",
		stack: "Web Crypto · Zustand · Supabase",
		description:
			"A privacy-first notes app where plaintext never leaves the browser. PBKDF2 and AES-256-GCM by default.",
		href: "https://github.com/Mystery-Coder",
	},
	{
		number: "03",
		title: "TM-Lang DSL",
		stack: "Go · WebAssembly · GraphViz",
		description:
			"A macro-enabled language for Turing machines with scoped expansion, C simulation, and browser tooling.",
		href: "https://github.com/Mystery-Coder",
	},
];

const skills = [
	"TypeScript",
	"Python",
	"Go",
	"C++",
	"React",
	"Next.js",
	"Supabase",
	"LLMs",
	"WebAssembly",
];

export function Portfolio({
	repos,
	languageStats,
}: {
	repos: Repo[];
	languageStats: LanguageStat[];
}) {
	return (
		<div className="demo-shell demo-lab">
			<header className="demo-nav">
				<a
					className="wordmark"
					href="#top"
					aria-label="Srikar Rao home"
				>
					SR<span>.</span>
				</a>
				<nav className="static-nav" aria-label="Main navigation">
					<a href="#about">About</a>
					<a href="#work">Work</a>
					<a href="#github">GitHub</a>
					<a href="#contact">Contact</a>
				</nav>
				<ThemeToggle className="theme-toggle" />
			</header>

			<main id="top">
				<section className="demo-hero">
					<div className="hero-copy">
						<p className="eyebrow">
							04 / Lab <span>{"// Bangalore, India"}</span>
						</p>
						<h1>
							Building useful
							<br />
							<em>systems</em> for curious people.
						</h1>
						<p className="hero-intro">
							I&apos;m <strong>Srikar Rao H M</strong>, a Computer
							Science student at RVCE and software builder working
							across AI, web, and low-level tools.
						</p>
						<div className="hero-actions">
							<a className="primary-action" href="#work">
								See selected work{" "}
								<FaArrowRight aria-hidden="true" />
							</a>
							<a
								className="text-action"
								href={`mailto:${site.email}`}
							>
								Let&apos;s talk
							</a>
						</div>
					</div>
					<div className="hero-aside">
						<div className="portrait-frame">
							<Image
								src="/me.JPG"
								alt="Portrait of Srikar Rao H M"
								width={430}
								height={520}
								priority
							/>
							<span className="portrait-tag">CS / 2027</span>
						</div>
						<div className="availability">
							<span /> Open to good problems
						</div>
					</div>
				</section>

				<section
					className="content-section experience-section"
					id="about"
				>
					<div className="section-label">
						<span>01</span> Experience
					</div>
					<div className="experience-list">
						<article className="experience-item">
							<div>
								<p className="date">May 2026 — Jul 2026</p>
								<h2>Samsung Research Institute</h2>
								<p>Software Development Intern · On-site</p>
							</div>
							<p>
								Worked on network performance evaluation and
								optimization using simulation frameworks and
								AI-based approaches. Developed LLM-powered agent
								workflows for network management and analysis.
							</p>
							<span className="tech-line">
								Python · C++ · LLMs · AI Agents · RAG
							</span>
						</article>
						<article className="experience-item">
							<div>
								<p className="date">Sep 2025 — Jan 2026</p>
								<h2>Samsung Research Institute</h2>
								<p>PRISM Intern · Remote</p>
							</div>
							<p>
								Built a structured dataset of 2,000+ Shadertoy
								GLSL shaders and designed pipelines for ID
								extraction, code analysis, and standardized JSON
								generation.
							</p>
							<span className="tech-line">
								Python · GLSL · JSON · APIs
							</span>
						</article>
					</div>
				</section>

				<section className="content-section work-section" id="work">
					<div className="section-label">
						<span>02</span> Selected work
					</div>
					<div className="project-grid">
						{projects.map((project) => (
							<article
								className="project-card"
								key={project.number}
							>
								<span className="project-number">
									{project.number}
								</span>
								<h2>{project.title}</h2>
								<p>{project.description}</p>
								<div className="project-footer">
									<span>{project.stack}</span>
									<a
										href={project.href}
										target="_blank"
										rel="noreferrer"
										aria-label={`Open ${project.title}`}
									>
										<FaGithub />
									</a>
								</div>
							</article>
						))}
					</div>
				</section>

				<section
					className="content-section profile-section"
					id="github"
				>
					<div className="section-label">
						<span>03</span> GitHub / toolkit
					</div>
					<div className="profile-grid">
						<div className="toolkit">
							<h2>Tools I reach for.</h2>
							<div className="skill-cloud">
								{skills.map((skill) => (
									<span key={skill}>{skill}</span>
								))}
							</div>
							<p>
								Frontend craft, backend reliability, and just
								enough systems work to understand what happens
								underneath.
							</p>
						</div>
						<div className="github-proof">
							<div className="proof-heading">
								<span>LIVE FROM GITHUB</span>
								<a
									href={site.github}
									target="_blank"
									rel="noreferrer"
								>
									@Mystery-Coder <FaArrowRight />
								</a>
							</div>
							<img
								src="https://github-readme-stats-fast.vercel.app/api?username=Mystery-Coder&show_icons=true&theme=tokyonight"
								alt="GitHub stats for Mystery-Coder"
								loading="lazy"
							/>
							<div className="language-bars">
								{languageStats.slice(0, 5).map((language) => (
									<div
										className="language-row"
										key={language.name}
									>
										<span>
											<i
												style={{
													backgroundColor:
														language.color,
												}}
											/>
											{language.name}
										</span>
										<b>{language.percentage}%</b>
										<div className="language-track">
											<i
												style={{
													backgroundColor:
														language.color,
													width: `${language.percentage}%`,
												}}
											/>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="github-repos">
						<div className="proof-heading">
							<span>
								PINNED PROJECTS / {repos.length || 0} LIVE REPOS
							</span>
							<a
								href={site.github}
								target="_blank"
								rel="noreferrer"
							>
								View profile <FaArrowRight />
							</a>
						</div>
						<div className="repo-grid">
							{repos.map((repo) => (
								<a
									className="repo-card"
									href={repo.url}
									target="_blank"
									rel="noreferrer"
									key={repo.id}
								>
									<span className="repo-name">
										{repo.name}
									</span>
									<span className="repo-description">
										{repo.description ||
											"A project from the GitHub archive."}
									</span>
									<span className="repo-meta">
										{repo.primaryLanguage?.name ||
											"Open source"}{" "}
										· * {repo.stargazers.totalCount}
									</span>
								</a>
							))}
						</div>
					</div>
				</section>

				<section className="closing-section" id="contact">
					<div className="contact-line">
						<span className="contact-label">Contact</span>
						<a
							className="contact-email"
							href={`mailto:${site.email}`}
						>
							{site.email}
						</a>
						<span className="contact-socials">
							<a
								href={site.linkedin}
								target="_blank"
								rel="noreferrer"
							>
								<FaLinkedin />
							</a>
							<a
								href={site.github}
								target="_blank"
								rel="noreferrer"
							>
								<FaGithub />
							</a>
						</span>
					</div>
				</section>
			</main>
			<footer>
				<span>© 2026 Srikar Rao H M</span>
				<span>Currently in Bengaluru, India</span>
			</footer>
		</div>
	);
}
