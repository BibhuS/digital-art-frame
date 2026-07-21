import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={
        "fixed right-5 bottom-5 z-40 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-lg backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-card hover:text-primary " +
        (visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none")
      }
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
