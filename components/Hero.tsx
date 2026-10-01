import Image from "next/image";

import { site } from "@/lib/site";

export function Hero() {
  return (
    <div className="flex flex-col items-center p-38 text-center transition-colors duration-300 dark:bg-gray-800">
      <Image
        src="/me.webp"
        alt={site.shortName}
        width={160}
        height={160}
        priority
        className="mb-6 h-40 w-40 rounded-full object-cover shadow-md"
      />

      <h1 className="mb-4 text-5xl font-bold text-gray-900 sm:text-7xl dark:text-white">
        Hi, I&apos;m{" "}
        <span className="text-blue-700">{site.shortName}</span>
      </h1>

      <p className="mb-6 text-2xl text-gray-700 dark:text-white">
        {site.tagline}
      </p>

      <div className="flex flex-row gap-4">
        <a
          href="#projects"
          className="rounded bg-black px-4 py-2 font-semibold text-white shadow hover:bg-gray-700"
        >
          My Projects
        </a>
        <a
          href="#contact"
          className="rounded bg-white px-4 py-2 font-semibold text-black shadow hover:bg-gray-200"
        >
          Contact Me
        </a>
      </div>
    </div>
  );
}
