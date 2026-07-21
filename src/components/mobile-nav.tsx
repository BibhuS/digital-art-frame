import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Command as CommandIcon, Download } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";
import { RESUME_URL } from "@/lib/portfolio-data";

const NAV = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "/blog", label: "Blog", route: true },
  { href: "#contact", label: "Contact" },
];

function openCommandPalette() {
  const ev = new KeyboardEvent("keydown", {
    key: "k",
    metaKey: true,
    ctrlKey: true,
    bubbles: true,
  });
  document.dispatchEvent(ev);
}

export function MobileNav({ activeId }: { activeId: string }) {
  const [open, setOpen] = useState(false);

  const handleAnchor = (href: string) => {
    setOpen(false);
    if (href.startsWith("#")) {
      setTimeout(() => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 250);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background/40 text-foreground transition hover:border-primary/40 md:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] border-border/60 bg-background/95 backdrop-blur-xl">
        <SheetHeader className="text-left">
          <SheetTitle className="text-base font-semibold">Menu</SheetTitle>
        </SheetHeader>

        <nav className="mt-8 flex flex-col gap-1">
          {NAV.map((n) =>
            n.route ? (
              <Link
                key={n.href}
                to={n.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-foreground transition hover:bg-primary/10 hover:text-primary"
              >
                {n.label}
              </Link>
            ) : (
              <a
                key={n.href}
                href={n.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleAnchor(n.href);
                }}
                className="rounded-md px-3 py-2.5 text-sm text-foreground transition hover:bg-primary/10 hover:text-primary"
              >
                {n.label}
              </a>
            )
          )}
        </nav>

        <div className="mt-6 flex flex-col gap-2 border-t border-border/60 pt-6">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setTimeout(openCommandPalette, 250);
            }}
            className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2.5 text-sm text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
          >
            <CommandIcon className="h-4 w-4" /> Search <span className="ml-auto font-mono text-xs">⌘K</span>
          </button>

          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2.5 text-sm text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
          >
            <Download className="h-4 w-4" /> Resume
          </a>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-6">
          <span className="text-sm text-muted-foreground">Theme</span>
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
}
