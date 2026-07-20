import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "theme";

export function ThemeToggle() {
  // Keep the server render and the first client render identical. The real
  // theme is applied before paint by the root script, then reflected here after
  // hydration to avoid React hydration mismatches.
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const getNextTheme = () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? saved === "dark" : media.matches;
    };

    const applyTheme = () => {
      const next = getNextTheme();
      setIsDark(next);
      root.classList.toggle("dark", next);
    };

    applyTheme();

    // When the user hasn't set a manual preference, follow the system scheme.
    const applySystem = () => {
      if (localStorage.getItem(STORAGE_KEY) !== null) return;
      applyTheme();
    };

    media.addEventListener("change", applySystem);
    return () => media.removeEventListener("change", applySystem);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = !isDark;
    setIsDark(next);
    root.classList.add("theme-transition");
    root.classList.toggle("dark", next);
    localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    window.setTimeout(() => {
      root.classList.remove("theme-transition");
    }, 500);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      suppressHydrationWarning
      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background/40 text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
    >
      {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}
