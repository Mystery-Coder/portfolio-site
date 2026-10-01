"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      // `disableTransitionOnChange` is deliberately omitted: the section
      // wrappers animate their background over 300ms on theme change.
    >
      {children}
    </NextThemesProvider>
  );
}
