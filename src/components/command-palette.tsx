import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  BookOpen,
  Briefcase,
  Github,
  Home,
  Linkedin,
  Mail,
  Sparkles,
} from "lucide-react";
import { BLOG_POSTS, PROJECTS, SOCIAL } from "@/lib/portfolio-data";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function go(fn: () => void) {
    setOpen(false);
    fn();
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search projects, posts, or jump to a section…" />
      <CommandList>
        <CommandEmpty>Nothing here.</CommandEmpty>
        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => go(() => navigate({ to: "/" }))}>
            <Home className="mr-2 h-4 w-4" /> Home
          </CommandItem>
          <CommandItem onSelect={() => go(() => navigate({ to: "/blog" }))}>
            <BookOpen className="mr-2 h-4 w-4" /> Blog
          </CommandItem>
          <CommandItem
            onSelect={() =>
              go(() => {
                navigate({ to: "/" });
                setTimeout(() => {
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }, 50);
              })
            }
          >
            <Briefcase className="mr-2 h-4 w-4" /> Projects section
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Case studies">
          {PROJECTS.map((p) => (
            <CommandItem
              key={p.slug}
              onSelect={() =>
                go(() =>
                  navigate({ to: "/projects/$slug", params: { slug: p.slug } })
                )
              }
            >
              <Sparkles className="mr-2 h-4 w-4" />
              <span className="truncate">{p.title}</span>
              <span className="ml-auto text-xs text-muted-foreground">{p.client}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Blog posts">
          {BLOG_POSTS.map((p) => (
            <CommandItem
              key={p.slug}
              onSelect={() =>
                go(() =>
                  navigate({ to: "/blog/$slug", params: { slug: p.slug } })
                )
              }
            >
              <BookOpen className="mr-2 h-4 w-4" />
              <span className="truncate">{p.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Contact">
          <CommandItem
            onSelect={() =>
              go(() => {
                window.location.href = `mailto:${SOCIAL.email}`;
              })
            }
          >
            <Mail className="mr-2 h-4 w-4" /> Email
          </CommandItem>
          <CommandItem
            onSelect={() =>
              go(() => window.open(SOCIAL.linkedin, "_blank", "noopener"))
            }
          >
            <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
          </CommandItem>
          <CommandItem
            onSelect={() =>
              go(() => window.open(SOCIAL.github, "_blank", "noopener"))
            }
          >
            <Github className="mr-2 h-4 w-4" /> GitHub
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}