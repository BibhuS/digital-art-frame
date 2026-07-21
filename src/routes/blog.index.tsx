import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { BLOG_POSTS } from "@/lib/portfolio-data";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Bibhu Bhushan Sinha" },
      {
        name: "description",
        content:
          "Notes on Spark, Databricks, cloud lakehouses and the boring-on-purpose engineering that keeps them running.",
      },
      { property: "og:title", content: "Blog — Bibhu Bhushan Sinha" },
      {
        property: "og:description",
        content: "Notes on data engineering, Spark, Databricks and cloud lakehouses.",
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-muted-foreground">bibhu.dev / blog</span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="font-mono text-xs uppercase tracking-widest text-primary">Writing</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
          The blog
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Notes from the trenches — data platforms, Spark, Databricks, and the
          unglamorous engineering that keeps them boring to operate.
        </p>

        <div className="mt-12 divide-y divide-border/60 border-y border-border/60">
          {BLOG_POSTS.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group grid gap-2 py-8 transition md:grid-cols-[140px_1fr_80px] md:items-baseline"
            >
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {new Date(p.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </div>
              <div>
                <div className="text-lg font-semibold text-foreground group-hover:text-primary md:text-xl">
                  {p.title}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{p.excerpt}</div>
              </div>
              <div className="text-right font-mono text-xs text-muted-foreground">
                {p.readingMinutes} min · {p.tag}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}