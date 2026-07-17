import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "theme";

function getInitialIsDark() {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(getInitialIsDark);

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    // When the user hasn't set a manual preference, follow the system scheme.
    const applySystem = () => {
      if (localStorage.getItem(STORAGE_KEY) !== null) return;
      const next = media.matches;
      setIsDark(next);
      root.classList.toggle("dark", next);
    };

    applySystem();
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
