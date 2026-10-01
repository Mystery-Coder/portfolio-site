"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

/** Stable no-op subscription: hydration state never changes on its own. */
const subscribe = () => () => {};

/**
 * `false` during SSR and the hydration render, `true` from the first commit
 * onwards.
 *
 * next-themes resolves the stored theme on the client before React hydrates, so
 * reading `resolvedTheme` during the hydration render would not match the
 * server HTML. `useSyncExternalStore` supplies the server snapshot for the
 * hydration pass and the client snapshot afterwards, which avoids both the
 * mismatch and a setState-in-effect cascade.
 */
function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const hydrated = useHydrated();

  const isDark = hydrated && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`flex items-center gap-1.5 rounded bg-gray-200 px-3 py-1 text-black transition-colors dark:bg-gray-700 dark:text-white ${className}`}
    >
      {/* Fixed-width slots keep the navbar from shifting when the label swaps. */}
      <span className="w-4 text-center" aria-hidden="true">
        {isDark ? "🌙" : "☀️"}
      </span>
      <span className="w-10 text-left">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}
