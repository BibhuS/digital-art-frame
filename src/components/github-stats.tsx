import { useEffect, useState } from "react";
import { Github, Star, GitFork, Users } from "lucide-react";

type Stats = {
  publicRepos: number;
  followers: number;
  totalStars: number;
  topLang: string;
} | null;

const USER = "BibhuS";

export function GitHubStats() {
  const [stats, setStats] = useState<Stats>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [uRes, rRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USER}`),
          fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`),
        ]);
        if (!uRes.ok || !rRes.ok) throw new Error("gh");
        const u = await uRes.json();
        const repos: Array<{ stargazers_count: number; language: string | null }> = await rRes.json();
        const totalStars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
        const langCount: Record<string, number> = {};
        for (const r of repos) if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1;
        const topLang = Object.entries(langCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
        if (!cancelled)
          setStats({
            publicRepos: u.public_repos ?? 0,
            followers: u.followers ?? 0,
            totalStars,
            topLang,
          });
      } catch {
        if (!cancelled) setErr(true);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (err) return null;

  const items = [
    { icon: Github, label: "Public repos", value: stats?.publicRepos },
    { icon: Star, label: "Total stars", value: stats?.totalStars },
    { icon: Users, label: "Followers", value: stats?.followers },
    { icon: GitFork, label: "Top language", value: stats?.topLang },
  ];

  return (
    <a
      href={`https://github.com/${USER}`}
      target="_blank"
      rel="noreferrer"
      className="group mb-8 grid grid-cols-2 gap-3 rounded-xl border border-border/60 bg-card/40 p-4 transition hover:border-primary/40 md:grid-cols-4"
      aria-label="Live GitHub stats"
    >
      {items.map((it) => {
        const Icon = it.icon;
        return (
          <div key={it.label} className="flex items-center gap-3">
            <Icon className="h-4 w-4 text-primary" />
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {it.label}
              </div>
              <div className="text-base font-semibold text-foreground">
                {stats ? it.value : <span className="inline-block h-4 w-10 animate-pulse rounded bg-muted/40" />}
              </div>
            </div>
          </div>
        );
      })}
    </a>
  );
}