import { FaLinkedin } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

import { site } from "@/lib/site";

export function Contact() {
  return (
    <div className="p-6 text-center text-gray-800 dark:text-white">
      <h2 className="mb-4 text-4xl font-semibold">Contact Me</h2>
      <div className="mb-6 text-2xl">Connect with me on LinkedIn or email me</div>

      <div className="flex items-center justify-center gap-6 text-3xl">
        <a
          href={`mailto:${site.email}`}
          className="text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          aria-label={`Email ${site.email}`}
        >
          <CiMail />
        </a>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 transition-colors hover:text-blue-800"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
}
