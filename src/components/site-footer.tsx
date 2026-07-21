import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail } from "lucide-react";
import { SOCIAL } from "@/lib/portfolio-data";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/", hash: "#about" },
  { label: "Skills", to: "/", hash: "#skills" },
  { label: "Experience", to: "/", hash: "#experience" },
  { label: "Projects", to: "/", hash: "#projects" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/", hash: "#contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background/50 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <div className="flex items-center gap-2 font-mono text-sm tracking-tight">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-primary/15 text-primary">
                &lt;/&gt;
              </span>
              <span className="text-foreground/90">Bibhu Bhushan Sinha</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Portfolio of Bibhu Bhushan Sinha, Senior Data Engineer building
              Spark, Databricks and cloud lakehouse platforms.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href={SOCIAL.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background/40 text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background/40 text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${SOCIAL.email}`}
                aria-label="Email"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background/40 text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-foreground">
                Sitemap
              </div>
              <ul className="mt-4 space-y-2">
                {LINKS.slice(0, 4).map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      hash={l.hash}
                      className="text-sm text-muted-foreground transition hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-foreground">
                More
              </div>
              <ul className="mt-4 space-y-2">
                {LINKS.slice(4).map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      hash={l.hash}
                      className="text-sm text-muted-foreground transition hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-foreground">
                Connect
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href={`mailto:${SOCIAL.email}`}
                    className="transition hover:text-foreground"
                  >
                    {SOCIAL.email}
                  </a>
                </li>
                <li>United Kingdom</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-8 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Bibhu Bhushan Sinha. All rights reserved.</span>
          <span className="font-mono">Built with TanStack Start & Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}
