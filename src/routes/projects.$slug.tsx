import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { getProject, PROJECTS, type Project } from "@/lib/portfolio-data";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ params, loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.project.title} — Bibhu Bhushan Sinha` },
          { name: "description", content: loaderData.project.body },
          { property: "og:title", content: loaderData.project.title },
          { property: "og:description", content: loaderData.project.body },
          { property: "og:type", content: "article" },
          { property: "og:url", content: `/projects/${params.slug}` },
        ]
      : [{ title: "Project not found" }, { name: "robots", content: "noindex" }],
    links: loaderData
      ? [{ rel: "canonical", href: `/projects/${params.slug}` }]
      : [],
  }),
  component: ProjectPage,
  notFoundComponent: () => (
    <FallbackMissing message="That case study doesn't exist." />
  ),
});

function FallbackMissing({ message }: { message: string }) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <p className="text-sm text-muted-foreground">{message}</p>
      <Link to="/" className="mt-4 inline-flex items-center gap-1.5 text-primary">
        <ArrowLeft className="h-4 w-4" /> Back home
      </Link>
    </div>
  );
}

function ProjectPage() {
  const { project } = Route.useLoaderData() as { project: Project };

  const others = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
      </div>

      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-muted-foreground">
              {project.client}
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="font-mono text-xs uppercase tracking-widest text-primary">
          Case study
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{project.body}</p>

        <div className="mt-8 grid grid-cols-2 gap-4 border-y border-border/60 py-6 text-sm md:grid-cols-4">
          <Meta label="Client" value={project.client} />
          <Meta label="Role" value={project.role} />
          <Meta label="Period" value={project.period} />
          <Meta label="Stack" value={project.tag} />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">What I built</h2>
          <ul className="mt-4 space-y-3">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex gap-3 text-muted-foreground">
                <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                <span className="leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">Tech stack</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-md border border-border/60 bg-card/40 px-2.5 py-1 text-xs text-foreground/90"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">Outcome</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {project.outcome.map((o, i) => (
              <li
                key={i}
                className="rounded-xl border border-border/60 bg-card/40 p-4 text-sm text-foreground/90"
              >
                {o}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 border-t border-border/60 pt-10">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            More case studies
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                to="/projects/$slug"
                params={{ slug: o.slug }}
                className="group rounded-xl border border-border/60 bg-card/40 p-4 transition hover:border-primary/40"
              >
                <div className="flex items-start justify-between">
                  <div className="text-sm font-medium text-foreground group-hover:text-primary">
                    {o.title}
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{o.client}</div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-foreground">{value}</div>
    </div>
  );
}