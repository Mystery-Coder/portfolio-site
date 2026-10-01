"use client";

import { FaBars, FaXmark } from "react-icons/fa6";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/ThemeToggle";
import { site } from "@/lib/site";

type NavLink = {
  label: string;
  href: string;
  external: boolean;
};

const NAV_LINKS: readonly NavLink[] = [
  { label: "Blog", href: site.blog, external: true },
  { label: "About", href: "#about", external: false },
  { label: "Skills", href: "#skills", external: false },
  { label: "Projects", href: "#projects", external: false },
  { label: "Contact Me", href: "#contact", external: false },
];

const LINK_CLASS = "rounded px-2 py-1 text-left text-white transition-colors hover:text-blue-400";

export function Navbar() {
  const [open, setOpen] = useState(false);

  // Close the mobile panel on Escape.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 shadow-md dark:bg-gray-950">
      <div className="w-full px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="shrink-0 text-2xl font-bold text-blue-400">
            {site.name}
          </div>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map(({ label, href, external }) => (
              <a
                key={label}
                href={href}
                className={LINK_CLASS}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {label}
              </a>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              className="rounded p-2 text-white transition-colors hover:text-blue-400"
            >
              {open ? <FaXmark size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {open && (
        <div id="mobile-nav" className="border-t border-gray-800 md:hidden">
          <ul className="flex flex-col gap-1 px-4 py-3">
            {NAV_LINKS.map(({ label, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`${LINK_CLASS} block`}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
