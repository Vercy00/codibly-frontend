"use client";

import { Theme } from "@/types/theme";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext<[Theme, () => void]>(["dark", () => {}]);

interface ThemeProviderProps {
  children: ReactNode;
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("dark");
  const switchTheme = useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.theme = newTheme;
    setTheme(newTheme);
  }, [theme, setTheme]);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );

    setTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
  }, [theme]);

  return (
    <ThemeContext.Provider value={[theme, switchTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined)
    throw new Error("useTheme must be used within ThemeProvider");

  return context;
}

export { useTheme, ThemeProvider };
