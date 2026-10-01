import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Section } from "@/components/Section";
import { Skills } from "@/components/Skills";
import { getProjectsData } from "@/lib/github";

/**
 * Regenerate the page in the background at most once an hour. The upstream
 * fetch inside `getProjectsData` carries the same window, so a GitHub outage
 * serves the last good page instead of failing the build.
 *
 * Declared as a literal because Next.js reads route segment config statically.
 */
export const revalidate = 3600;

export default async function Home() {
  const { repos, languageStats } = await getProjectsData();

  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <div className="flex flex-col items-center space-y-20 bg-gray-100 pb-20 transition-colors duration-300 dark:bg-gray-600">
          <Section id="about">
            <About />
          </Section>

          <Section id="skills">
            <Skills />
          </Section>

          <Section id="projects">
            <Projects repos={repos} languageStats={languageStats} />
          </Section>

          <Section id="contact">
            <Contact />
          </Section>
        </div>
      </main>
    </>
  );
}
