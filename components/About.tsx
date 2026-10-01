/* eslint-disable @next/next/no-img-element --
   skillicons.dev returns a variable-size icon strip; `next/image` would need a
   fixed intrinsic size and there is nothing to gain from optimising a remote,
   already-cached PNG. */
import { FaGithub, FaLinkedin } from "react-icons/fa";

import { site, skillIcons } from "@/lib/site";

export function About() {
  return (
    <div className="mt-10 max-w-4xl rounded-lg border p-6 shadow-md bg-white dark:bg-gray-800 dark:text-white">
      <h2 className="mb-2 text-3xl font-semibold text-gray-900 dark:text-white">
        About Me
      </h2>

      <div className="flex flex-col gap-6 md:flex-row dark:text-white">
        <div className="text-gray-800 md:w-1/2 dark:text-white">
          <p>
            I am an aspiring software developer pursuing a Computer Science
            degree at RVCE, Bangalore. I have a passion for programming and
            building practical, user-centered products.
          </p>
          <br />
          <p>
            I specialize in modern web technologies such as React and Express.js
            to create engaging and interactive user interfaces. For
            cross-platform mobile development, I prefer Flutter and Dart,
            enabling me to craft beautiful and efficient native applications.
            On the backend, I&apos;m currently interested in Go (Golang) to
            build high-performance, scalable APIs that power robust solutions.
          </p>

          <div className="mt-4 flex flex-row gap-4">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-3xl text-gray-800 hover:text-black dark:text-white dark:hover:text-gray-300"
            >
              <FaGithub />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-3xl text-blue-600 hover:text-blue-800"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="md:w-1/2">
          <h3 className="mb-2 text-3xl font-bold">Tech Stack</h3>
          <a
            href="https://skillicons.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Light variant */}
            <img
              src={skillIcons.light}
              alt="Tech stack icons (light)"
              className="h-auto w-full dark:hidden"
            />

            {/* Dark variant */}
            <img
              src={skillIcons.dark}
              alt="Tech stack icons (dark)"
              className="hidden h-auto w-full dark:block"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
