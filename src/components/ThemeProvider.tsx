"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ThemeProvider({ children }: Props) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="space"
      enableSystem={false}
      storageKey="mode"
      themes={["earth", "space"]}
      value={{
        earth: "earth",
        space: "dark",
      }}
    >
      {children}
    </NextThemesProvider>
  );
}
