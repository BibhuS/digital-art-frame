import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { BLOG_POSTS, getPost, type BlogPost } from "@/lib/portfolio-data";
import { ReadingProgress, renderMarkdown } from "@/components/reading-progress";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} — Bibhu Bhushan Sinha` },
          { name: "description", content: loaderData.post.excerpt },
          { property: "og:title", content: loaderData.post.title },
          { property: "og:description", content: loaderData.post.excerpt },
          { property: "og:type", content: "article" },
        ]
      : [{ title: "Post not found" }, { name: "robots", content: "noindex" }],
  }),
  component: PostPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <p className="text-sm text-muted-foreground">That post doesn't exist.</p>
      <Link to="/blog" className="mt-4 inline-flex items-center gap-1.5 text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to blog
      </Link>
    </div>
  ),
});

function PostPage() {
  const { post } = Route.useLoaderData() as { post: BlogPost };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post.slug]);

  const others = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ReadingProgress />

      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> All posts
          </Link>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-muted-foreground">
              {post.readingMinutes} min read
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="font-mono uppercase tracking-widest text-primary">{post.tag}</span>
          <span>·</span>
          <span>
            {new Date(post.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>

        <article className="mt-12 border-t border-border/60 pt-8">
          {renderMarkdown(post.body)}
        </article>

        {others.length > 0 && (
          <section className="mt-20 border-t border-border/60 pt-10">
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Keep reading
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  to="/blog/$slug"
                  params={{ slug: o.slug }}
                  className="group rounded-xl border border-border/60 bg-card/40 p-4 transition hover:border-primary/40"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-sm font-medium text-foreground group-hover:text-primary">
                      {o.title}
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {o.readingMinutes} min · {o.tag}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}