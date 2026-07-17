import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const prefersDark =
      saved === null
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
        : saved === "dark";
    setIsDark(prefersDark);
    root.classList.toggle("dark", prefersDark);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = !isDark;
    setIsDark(next);
    root.classList.add("theme-transition");
    root.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    window.setTimeout(() => {
      root.classList.remove("theme-transition");
    }, 500);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background/40 text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
    >
      {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}
