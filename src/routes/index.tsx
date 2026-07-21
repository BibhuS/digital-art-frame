import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useActiveSection } from "@/hooks/use-active-section";
import {
  ArrowUpRight,
  Command as CommandIcon,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { HeroCanvas } from "@/components/hero-canvas";
import { OrbitAvatar } from "@/components/orbit-avatar";
import { RotatingRole } from "@/components/rotating-role";
import { CommandPalette } from "@/components/command-palette";
import { ThemeToggle } from "@/components/theme-toggle";
import { Reveal } from "@/components/reveal";
import { AnimatedCounter } from "@/components/animated-counter";
import { BackToTop } from "@/components/back-to-top";
import { MobileNav } from "@/components/mobile-nav";
import { SiteFooter } from "@/components/site-footer";
import {
  BLOG_POSTS,
  PROJECTS,
  PROJECT_TECH_FILTERS,
  RESUME_URL,
  SOCIAL,
} from "@/lib/portfolio-data";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const NAV = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "/blog", label: "Blog", route: true },
  { href: "#contact", label: "Contact" },
];

const SKILLS: { group: string; items: string[] }[] = [
  {
    group: "Big Data & Processing",
    items: [
      "Apache Spark",
      "PySpark",
      "Spark Streaming",
      "Databricks",
      "Delta Lake",
      "Hive",
      "Sqoop",
      "Kafka",
      "Apache NiFi",
      "Streamsets",
    ],
  },
  {
    group: "Cloud",
    items: [
      "AWS Glue",
      "AWS Athena",
      "AWS S3",
      "AWS Lambda",
      "Step Functions",
      "DynamoDB",
      "Redshift",
      "CloudFormation",
      "Terraform",
      "Azure ADLS",
    ],
  },
  {
    group: "Languages",
    items: ["Scala", "Python", "Java", "SQL", "Shell"],
  },
  {
    group: "Orchestration & DevOps",
    items: [
      "Airflow",
      "Autosys",
      "Control-M",
      "Tivoli",
      "Oozie",
      "Jenkins",
      "Azure DevOps",
      "Git",
    ],
  },
  {
    group: "Data Stores",
    items: [
      "Snowflake",
      "PostgreSQL",
      "HBase",
      "Cassandra",
      "MongoDB",
      "Elastic Search",
      "MySQL",
    ],
  },
];

const EXPERIENCE = [
  {
    role: "Software Engineer III — Data Engineering",
    org: "JP Morgan Chase",
    period: "Sep 2024 — Present",
    location: "United Kingdom",
    bullets: [
      "Modernized legacy ETL workflows onto Databricks with the Medallion (Bronze/Silver/Gold) architecture on AWS.",
      "Designed hybrid pipelines with Databricks + Apache NiFi, masking PI attributes for restricted-country data.",
      "Built Python reconciliation tooling validating record counts and primary-key consistency across source and bronze layers.",
    ],
  },
  {
    role: "Consultant — Data Engineering",
    org: "Capgemini UK (Client: Barclays)",
    period: "Sep 2022 — Aug 2024",
    location: "United Kingdom",
    bullets: [
      "Built an Investment Banking datamart on AWS with Glue-PySpark, Step Functions, DynamoDB metadata and CloudFormation IaC.",
      "Landed curated data into Redshift powering dashboards, views and downstream consumer APIs.",
      "Automated S3-event driven ingestion via Lambda + EventBridge for unzipping, task status and scheduled orchestration.",
    ],
  },
  {
    role: "Specialist — Data Engineering",
    org: "LTI Mindtree (Client: Travelers Insurance)",
    period: "Nov 2020 — Aug 2022",
    location: "India",
    bullets: [
      "Built SIP-based data pipelines landing raw data in S3, parsed via PySpark on Databricks into Glue/Athena tables.",
      "Triggered PySpark jobs via Terraform-orchestrated Jenkins CI/CD pipelines.",
      "Owned P1 production support for critical client SIP jobs.",
    ],
  },
  {
    role: "Technical Lead — Big Data",
    org: "Wipro (Clients: MITIE Mozaic, Capital One)",
    period: "Jul 2018 — Nov 2020",
    location: "India",
    bullets: [
      "Built IoT → Kafka streaming pipelines with Streamsets and Python REST APIs feeding user dashboards.",
      "Developed reprocessing scripts to recover missed Kafka data windows.",
      "For Capital One: authored quantum sub-workflow JSON, Snowflake unit tests and Spark performance tuning.",
    ],
  },
  {
    role: "Associate — Big Data",
    org: "Cognizant (Clients: Sabre, ING Vysya)",
    period: "Apr 2016 — Jun 2018",
    location: "India",
    bullets: [
      "Built a Spark Streaming + Kafka Direct API consumer and a custom Flume EBCDIC→ASCII interceptor.",
      "Automated Spark batch/streaming with Oozie Coordinators, Bundles and Workflows.",
      "Designed HDFS ingestion, Hive schemas and standardization frameworks for enterprise reference data.",
    ],
  },
  {
    role: "Software Dev Analyst",
    org: "Dell International Services (Client: Sabre)",
    period: "Jan 2013 — Apr 2016",
    location: "India",
    bullets: [
      "Ingested SQL Server transactional data into HDFS via Sqoop and annotated with Apache UIMA + Java text analytics.",
      "Stored annotated data in HBase (JSON) powering pattern mining, rule engine and predictive scoring.",
      "Two-time Dell 'On the Spot' award recipient.",
    ],
  },
];

function Portfolio() {
  const [filter, setFilter] = useState<string>("All");
  const filteredProjects = useMemo(
    () =>
      filter === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.tech.includes(filter)),
    [filter],
  );

  const sectionIds = useMemo(
    () => NAV.filter((n) => !n.route).map((n) => n.href.replace("#", "")),
    [],
  );
  const activeId = useActiveSection(sectionIds);

  const isActive = (href: string) => activeId === href.replace("#", "");

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <CommandPalette />
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />
        <div className="absolute top-[40%] -right-40 h-[420px] w-[600px] rounded-full bg-accent/15 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <a href="#top" className="flex min-w-0 items-center gap-2 font-mono text-sm tracking-tight">
            <span className="truncate bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              Bibhu Bhushan Sinha
            </span>
          </a>
          <nav className="hidden gap-8 text-sm md:flex">
            {NAV.map((n) =>
              n.route ? (
                <Link
                  key={n.href}
                  to={n.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {n.label}
                </Link>
              ) : (
                <a
                  key={n.href}
                  href={n.href}
                  className={`relative transition-colors hover:text-foreground ${
                    isActive(n.href)
                      ? "font-medium text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {isActive(n.href) && (
                    <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
                  )}
                  {n.label}
                </a>
              ),
            )}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const ev = new KeyboardEvent("keydown", {
                  key: "k",
                  metaKey: true,
                  ctrlKey: true,
                  bubbles: true,
                });
                document.dispatchEvent(ev);
              }}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background/40 text-muted-foreground transition hover:border-primary/40 hover:text-foreground sm:inline-flex sm:h-auto sm:w-auto sm:gap-1.5 sm:px-2.5 sm:py-1.5"
              aria-label="Open command palette"
            >
              <CommandIcon className="h-3.5 w-3.5" />
              <span className="hidden font-mono text-xs sm:inline">⌘K</span>
            </button>
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 rounded-md border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition hover:bg-primary/20 sm:inline-flex"
            >
              <Download className="h-3.5 w-3.5" /> Resume
            </a>
            <MobileNav activeId={activeId} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero */}
        <section id="top" className="relative scroll-mt-20 pt-14 pb-16 md:pt-32 md:pb-32">
          <div className="pointer-events-auto absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
            <HeroCanvas />
          </div>
          <div className="grid items-center gap-10 lg:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)]">
          <div className="order-1 min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for opportunities
          </div>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-7xl">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              Bibhu Bhushan Sinha.
            </span>
          </h1>
          <RotatingRole />
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
            Data Engineer & Architect with 13+ years turning complex, messy
            data into scalable, cloud-native platforms. I specialize in
            Databricks, Spark, AWS, Snowflake, and modern lakehouse
            architectures—building reliable pipelines, optimizing distributed
            workloads, and designing systems that scale with confidence. I enjoy
            taking ownership of the entire data lifecycle, from architecture
            and engineering to performance tuning and automation, and sharing
            my knowledge through technical blogs, architecture diagrams, and
            hands-on projects.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 shrink-0" /> United Kingdom
            </span>
            <a
              href={`mailto:${SOCIAL.email}`}
              className="inline-flex min-w-0 max-w-full items-center gap-1.5 transition hover:text-foreground"
            >
              <Mail className="h-4 w-4 shrink-0" /> <span className="truncate">{SOCIAL.email}</span>
            </a>
            <a
              href={`tel:${SOCIAL.phone}`}
              className="inline-flex items-center gap-1.5 transition hover:text-foreground"
            >
              <Phone className="h-4 w-4 shrink-0" /> {SOCIAL.phoneDisplay}
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition hover:shadow-primary/40"
            >
              View My Work <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card/50 px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-card"
            >
              Get in Touch
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card/50 px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-card"
            >
              <Download className="h-4 w-4" /> Resume
            </a>
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="inline-flex items-center justify-center rounded-md border border-border bg-card/50 p-2.5 text-foreground transition hover:border-primary/40"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="inline-flex items-center justify-center rounded-md border border-border bg-card/50 p-2.5 text-foreground transition hover:border-primary/40"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
          </div>
          <div className="order-2 w-full">
            <OrbitAvatar />
          </div>
          </div>

          {/* Stat strip */}
          <div className="mt-16 grid grid-cols-2 gap-4 border-t border-border/60 pt-8 sm:grid-cols-4">
            {(
              [
                [13, "+", "Years in data"],
                [9, "+", "Years in cloud"],
                [6, "", "Enterprise clients"],
                [4, "", "Industry domains"],
              ] as [number, string, string][]
            ).map(([n, suffix, label]) => (
              <div key={label}>
                <div className="text-3xl font-semibold text-foreground">
                  <AnimatedCounter value={n} suffix={suffix} />
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <Reveal>
          <Section id="about" title="About">
            <div className="grid gap-10 md:grid-cols-3">
              <div className="space-y-4 md:col-span-2 text-muted-foreground leading-relaxed">
                <p>
                  I design and ship large-scale data platforms — the kind that
                  move billions of records a day, survive audits, and stay boring
                  to operate. Most of my career has been in{" "}
                  <span className="text-foreground">Spark, PySpark and Scala</span>{" "}
                  on Cloudera, AWS and Azure Databricks.
                </p>
                <p>
                  Right now I'm at JP Morgan Chase modernizing legacy ETL onto
                  Databricks with a Medallion lakehouse on AWS. Before that I
                  spent two years at Capgemini building an investment-banking
                  datamart for Barclays with AWS Glue, Step Functions and
                  Redshift.
                </p>
                <p>
                  I care about the un-glamorous parts: idempotent pipelines,
                  metadata-driven orchestration, honest reconciliation, and
                  pipelines that a tired on-call engineer can actually read at
                  3am.
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-card/40 p-6">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Domains
                </div>
                <ul className="mt-4 space-y-2 text-sm">
                  {[
                    "Banking & Capital Markets",
                    "Insurance",
                    "IoT & Streaming",
                    "Aerospace / GIS",
                  ].map((d) => (
                    <li key={d} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-primary" />
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">
                  Methodology
                </div>
                <p className="mt-2 text-sm">Agile · Scrum · Waterfall</p>
              </div>
            </div>
          </Section>
        </Reveal>

        {/* Skills */}
        <Reveal delay={80}>
          <Section id="skills" title="Skills & Toolkit">
            <div className="grid gap-4 md:grid-cols-2">
              {SKILLS.map((s, idx) => (
                <Reveal key={s.group} delay={idx * 60}>
                  <div
                    className="group rounded-xl border border-border/60 bg-card/40 p-6 transition hover:border-primary/30 hover:bg-card/70"
                  >
                    <div className="text-xs uppercase tracking-widest text-primary">
                      {s.group}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {s.items.map((i) => (
                        <span
                          key={i}
                          className="rounded-md border border-border/60 bg-background/60 px-2.5 py-1 text-xs text-foreground/90"
                        >
                          {i}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>
        </Reveal>

        {/* Experience */}
        <Reveal delay={80}>
          <Section id="experience" title="Experience">
            <ol className="relative border-l border-border/60 pl-6 md:pl-8">
              {EXPERIENCE.map((e, i) => (
                <Reveal key={e.role + i} delay={i * 80} direction="left">
                  <li className="pb-12 last:pb-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {e.role}
                      </h3>
                      <span className="font-mono text-xs text-muted-foreground">
                        {e.period}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-primary">{e.org}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {e.location}
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      {e.bullets.map((b, j) => (
                        <li key={j} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/70" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                </Reveal>
              ))}
            </ol>
          </Section>
        </Reveal>

        {/* Projects */}
        <Reveal delay={80}>
          <Section id="projects" title="Selected Projects">
            <div className="mb-8 flex flex-wrap gap-2">
              {PROJECT_TECH_FILTERS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFilter(t)}
                  className={
                    "rounded-full border px-3 py-1 text-xs transition " +
                    (filter === t
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border/60 text-muted-foreground hover:border-primary/30 hover:text-foreground")
                  }
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {filteredProjects.map((p, idx) => (
                <Reveal key={p.title} delay={idx * 80}>
                  <Link
                    to="/projects/$slug"
                    params={{ slug: p.slug }}
                    className="group relative block h-full overflow-hidden rounded-xl border border-border/60 bg-card/40 p-6 transition hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card/70"
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition group-hover:opacity-100" />
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                          {p.client}
                        </div>
                        <h3 className="mt-1 text-lg font-semibold text-foreground">
                          {p.title}
                        </h3>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {p.body}
                    </p>
                    <div className="mt-5 inline-flex rounded-md border border-border/60 bg-background/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
                      {p.tag}
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
            {filteredProjects.length === 0 && (
              <div className="rounded-xl border border-dashed border-border/60 p-8 text-center text-sm text-muted-foreground">
                No projects match that filter yet.
              </div>
            )}
          </Section>
        </Reveal>

        {/* Blog preview */}
        <Reveal delay={80}>
          <Section id="writing" title="From the blog">
            <div className="grid gap-5 md:grid-cols-3">
              {BLOG_POSTS.map((p, idx) => (
                <Reveal key={p.slug} delay={idx * 80}>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="group block h-full rounded-xl border border-border/60 bg-card/40 p-6 transition hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card/70"
                  >
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-mono uppercase tracking-widest text-primary">
                        {p.tag}
                      </span>
                      <span>{p.readingMinutes} min</span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-foreground group-hover:text-primary">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {p.excerpt}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
            <div className="mt-8">
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-accent"
              >
                All posts <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Section>
        </Reveal>

        {/* Contact */}
        <Reveal delay={80}>
          <Section id="contact" title="Get in touch">
            <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-card/60 to-card/20 p-8 md:p-12">
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                Building something data-heavy?
              </h3>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Happy to chat about Spark, Databricks, lakehouses, streaming, or
                your next data platform.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${SOCIAL.email}`}
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                >
                  <Mail className="h-4 w-4" /> Say hello
                </a>
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-background/40 px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-primary/40"
                >
                  <Download className="h-4 w-4" /> Resume (PDF)
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-6 border-t border-border/60 pt-6 text-sm text-muted-foreground">
                <a
                  href={`mailto:${SOCIAL.email}`}
                  className="inline-flex items-center gap-2 transition hover:text-foreground"
                >
                  <Mail className="h-4 w-4" /> {SOCIAL.email}
                </a>
                <a
                  href={`tel:${SOCIAL.phone}`}
                  className="inline-flex items-center gap-2 transition hover:text-foreground"
                >
                  <Phone className="h-4 w-4" /> {SOCIAL.phoneDisplay}
                </a>
                <a
                  href={SOCIAL.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition hover:text-foreground"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
                <a
                  href={SOCIAL.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition hover:text-foreground"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </div>
            </div>
          </Section>
        </Reveal>

        <SiteFooter />
      </main>
      <BackToTop />
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 py-14 md:py-28">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight sm:text-3xl md:mb-14 md:text-4xl">
        {title}
      </h2>
      {children}
    </section>
  );
}
