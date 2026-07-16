import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    function on() {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setP(total > 0 ? Math.min(1, Math.max(0, h.scrollTop / total)) : 0);
    }
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-primary to-accent transition-[width] duration-75"
        style={{ width: `${p * 100}%` }}
      />
    </div>
  );
}

export function renderMarkdown(md: string) {
  const blocks = md.split(/\n\n+/);
  return blocks.map((b, i) => {
    if (b.startsWith("## ")) {
      return (
        <h2 key={i} className="mt-10 text-2xl font-semibold tracking-tight text-foreground">
          {b.replace(/^##\s+/, "")}
        </h2>
      );
    }
    if (b.startsWith("- ")) {
      const items = b.split(/\n/).map((l) => l.replace(/^-\s+/, ""));
      return (
        <ul key={i} className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
          {items.map((it, j) => (
            <li key={j}>{it}</li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i} className="mt-4 leading-relaxed text-muted-foreground">
        {b}
      </p>
    );
  });
}