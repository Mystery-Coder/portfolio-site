/**
 * Static site-wide configuration.
 *
 * This module is imported by both Server and Client Components, so it must not
 * reference `process.env` or any other server-only value.
 */

export const site = {
  name: "Srikar Rao H M",
  shortName: "Srikar",
  url: "https://srikar.is-a.dev",
  email: "srikar0811@gmail.com",
  githubUser: "Mystery-Coder",
  github: "https://github.com/Mystery-Coder",
  linkedin: "https://www.linkedin.com/in/srikar-rao-57a60732a",
  blog: "https://mystery-coder.github.io/blog/",
  tagline:
    "Computer Science student at RVCE passionate about leveraging modern technologies to create impactful real-world solutions.",
  description:
    "Portfolio of Srikar Rao H M, a Computer Science student at RVCE, Bangalore. Projects, skills, and contact information.",
} as const;

const SKILL_ICON_SET =
  "html,css,js,ts,react,angular,p5js,processing,flutter,dart,express,python,go,c,cpp,bash,arduino,raspberrypi";

/** skillicons.dev strips. Two variants are swapped by the active theme. */
export const skillIcons = {
  light: `https://skillicons.dev/icons?i=${SKILL_ICON_SET}&theme=light&perline=6`,
  dark: `https://skillicons.dev/icons?i=${SKILL_ICON_SET}&theme=dark&perline=6`,
} as const;

export type SkillCategory = {
  title: string;
  skills: readonly string[];
};

export const skillCategories: readonly SkillCategory[] = [
  {
    title: "Frontend",
    skills: ["React", "JavaScript", "TypeScript", "HTML/CSS", "Angular"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "Python", "PostgreSQL", "Go(GoLang)"],
  },
  {
    title: "Mobile",
    skills: ["Flutter/Dart", "React Native"],
  },
  {
    title: "Tools",
    skills: ["Git", "Github", "VS Code"],
  },
] as const;
