import {
  Cloud,
  Database,
  Flame,
  GitBranch,
  Terminal,
  Workflow,
  Zap,
  Boxes,
} from "lucide-react";

type OrbitIcon = { icon: typeof Cloud; label: string };

const RING_INNER: OrbitIcon[] = [
  { icon: Flame, label: "Spark" },
  { icon: Database, label: "Databricks" },
  { icon: Cloud, label: "AWS" },
  { icon: Workflow, label: "Airflow" },
  { icon: Zap, label: "Kafka" },
];

const RING_OUTER: OrbitIcon[] = [
  { icon: Terminal, label: "Python" },
  { icon: Boxes, label: "Delta Lake" },
  { icon: GitBranch, label: "CI/CD" },
  { icon: Database, label: "Snowflake" },
  { icon: Cloud, label: "Azure" },
  { icon: Flame, label: "PySpark" },
  { icon: Workflow, label: "NiFi" },
];

function Ring({
  items,
  radiusPct,
  duration,
  reverse = false,
  chipClass,
}: {
  items: OrbitIcon[];
  radiusPct: number;
  duration: number;
  reverse?: boolean;
  chipClass: string;
}) {
  return (
    <div
      className="absolute inset-0"
      style={{
        animation: `orbit-spin ${duration}s linear infinite${reverse ? " reverse" : ""}`,
      }}
    >
      {items.map((it, i) => {
        const angle = (i / items.length) * 2 * Math.PI - Math.PI / 2;
        const x = Math.cos(angle) * radiusPct;
        const y = Math.sin(angle) * radiusPct;
        const Icon = it.icon;
        return (
          <div
            key={it.label + i}
            className="absolute"
            style={{
              left: `calc(50% + ${x}%)`,
              top: `calc(50% + ${y}%)`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className={`grid place-items-center rounded-xl border border-border/70 bg-card/80 text-foreground shadow-lg shadow-primary/10 backdrop-blur-md transition hover:border-primary/60 hover:text-primary ${chipClass}`}
              style={{
                animation: `orbit-counter ${duration}s linear infinite${reverse ? "" : " reverse"}`,
              }}
              title={it.label}
            >
              <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function OrbitAvatar() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[380px] md:max-w-[480px]">
      <style>{`
        @keyframes orbit-spin { to { transform: rotate(360deg); } }
        @keyframes orbit-counter { to { transform: rotate(-360deg); } }
        @keyframes orbit-pulse {
          0%,100% { opacity: .35; transform: scale(1); }
          50% { opacity: .6; transform: scale(1.06); }
        }
        @keyframes orbit-drift {
          0%,100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(-4%, 3%, 0) scale(1.08); }
        }
      `}</style>

      {/* Animated background halo */}
      <div
        className="pointer-events-none absolute inset-[-10%] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "conic-gradient(from 0deg, color-mix(in oklab, var(--primary) 40%, transparent), color-mix(in oklab, var(--accent) 30%, transparent), transparent 55%, color-mix(in oklab, var(--primary) 40%, transparent))",
          animation: "orbit-spin 22s linear infinite, orbit-drift 14s ease-in-out infinite",
        }}
      />
      <div
        className="pointer-events-none absolute inset-[10%] rounded-full bg-primary/20 blur-2xl"
        style={{ animation: "orbit-pulse 6s ease-in-out infinite" }}
      />

      {/* Static orbit rings (dashed) */}
      <div className="pointer-events-none absolute inset-[14%] rounded-full border border-dashed border-border/60" />
      <div className="pointer-events-none absolute inset-[2%] rounded-full border border-dashed border-border/40" />

      {/* Orbiting icon rings */}
      <div className="absolute inset-[14%]">
        <Ring
          items={RING_INNER}
          radiusPct={46}
          duration={24}
          chipClass="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10"
        />
      </div>
      <div className="absolute inset-[2%]">
        <Ring
          items={RING_OUTER}
          radiusPct={48}
          duration={38}
          reverse
          chipClass="h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11"
        />
      </div>

      {/* Center avatar */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div
            className="absolute -inset-3 rounded-full bg-gradient-to-tr from-primary via-primary/60 to-accent opacity-60 blur-lg"
            style={{ animation: "orbit-pulse 5s ease-in-out infinite" }}
          />
          <div className="relative grid h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32 place-items-center rounded-full border border-primary/40 bg-background/80 backdrop-blur-xl shadow-2xl shadow-primary/30">
            <div className="grid h-[calc(100%-8px)] w-[calc(100%-8px)] place-items-center rounded-full bg-gradient-to-br from-primary/30 via-background to-accent/30">
              <span className="bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text font-mono text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-transparent">
                BS
              </span>
            </div>
            <span className="absolute -bottom-1 right-1 flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-background bg-primary" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}