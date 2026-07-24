import { useEffect, useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";

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

function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  }
  return (
    <div className="group relative mt-6 overflow-hidden rounded-lg border border-border/60 bg-card/60">
      <div className="flex items-center justify-between border-b border-border/60 px-3 py-1.5">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {lang || "code"}
        </span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1 rounded-md border border-border/60 px-2 py-0.5 text-[10px] text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-foreground">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function renderMarkdown(md: string): ReactNode[] {
  const parts: Array<{ type: "code" | "text"; content: string; lang?: string }> = [];
  const re = /```(\w+)?\n([\s\S]*?)```/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(md)) !== null) {
    if (m.index > last) parts.push({ type: "text", content: md.slice(last, m.index) });
    parts.push({ type: "code", content: m[2], lang: m[1] });
    last = m.index + m[0].length;
  }
  if (last < md.length) parts.push({ type: "text", content: md.slice(last) });

  const nodes: ReactNode[] = [];
  parts.forEach((part, pi) => {
    if (part.type === "code") {
      nodes.push(<CodeBlock key={`c-${pi}`} code={part.content.trimEnd()} lang={part.lang} />);
      return;
    }
    const blocks = part.content.split(/\n\n+/);
    blocks.forEach((b, i) => {
      if (!b.trim()) return;
      const key = `${pi}-${i}`;
      if (b.startsWith("## ")) {
        nodes.push(
          <h2 key={key} className="mt-10 text-2xl font-semibold tracking-tight text-foreground">
            {b.replace(/^##\s+/, "")}
          </h2>,
        );
        return;
      }
      if (b.startsWith("- ")) {
        const items = b.split(/\n/).map((l) => l.replace(/^-\s+/, ""));
        nodes.push(
          <ul key={key} className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
            {items.map((it, j) => (
              <li key={j}>{it}</li>
            ))}
          </ul>,
        );
        return;
      }
      nodes.push(
        <p key={key} className="mt-4 leading-relaxed text-muted-foreground">
          {b}
        </p>,
      );
    });
  });
  return nodes;
}