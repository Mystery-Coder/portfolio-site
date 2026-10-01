import type { ReactNode } from "react";

export const SECTION_IDS = ["about", "skills", "projects", "contact"] as const;

export type SectionId = (typeof SECTION_IDS)[number];

/**
 * Wrapper for a page section. `scroll-mt-20` offsets the sticky navbar when a
 * `#anchor` link is followed.
 */
export function Section({
  id,
  children,
}: {
  id: SectionId;
  children: ReactNode;
}) {
  return (
    <section id={id} className="w-full max-w-4xl scroll-mt-20 px-4">
      {children}
    </section>
  );
}
