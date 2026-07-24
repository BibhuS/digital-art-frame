import { useEffect, useMemo, useRef, useState } from "react";
import { Database, Cloud, Cpu, GitBranch, Waves, Layers, Zap, BarChart3, Server, Boxes, Brain, Filter } from "lucide-react";

type NodeKind = "source" | "ingest" | "process" | "store" | "serve";

type Node = {
  id: string;
  label: string;
  sub?: string;
  kind: NodeKind;
  x: number;
  y: number;
  icon: React.ComponentType<{ className?: string }>;
};

type Edge = { from: string; to: string; label?: string };

type Preset = {
  id: string;
  name: string;
  blurb: string;
  nodes: Node[];
  edges: Edge[];
};

const KIND_STYLES: Record<NodeKind, string> = {
  source: "border-sky-400/40 bg-sky-500/10 text-sky-200",
  ingest: "border-violet-400/40 bg-violet-500/10 text-violet-200",
  process: "border-primary/50 bg-primary/15 text-primary",
  store: "border-emerald-400/40 bg-emerald-500/10 text-emerald-200",
  serve: "border-amber-400/40 bg-amber-500/10 text-amber-200",
};

const PRESETS: Preset[] = [
  {
    id: "batch",
    name: "Batch ETL",
    blurb: "Classic nightly batch — files land, Spark transforms, warehouse serves BI.",
    nodes: [
      { id: "s3", label: "S3 Landing", sub: "Raw files", kind: "source", x: 60, y: 90, icon: Cloud },
      { id: "glue", label: "Glue / Airflow", sub: "Orchestration", kind: "ingest", x: 260, y: 90, icon: GitBranch },
      { id: "spark", label: "Spark on EMR", sub: "Transform", kind: "process", x: 460, y: 90, icon: Cpu },
      { id: "rs", label: "Redshift", sub: "Warehouse", kind: "store", x: 660, y: 90, icon: Database },
      { id: "bi", label: "Tableau", sub: "BI", kind: "serve", x: 860, y: 90, icon: BarChart3 },
    ],
    edges: [
      { from: "s3", to: "glue" },
      { from: "glue", to: "spark" },
      { from: "spark", to: "rs" },
      { from: "rs", to: "bi" },
    ],
  },
  {
    id: "stream",
    name: "Streaming",
    blurb: "Event-driven pipeline with Kafka + Spark Structured Streaming into a live store.",
    nodes: [
      { id: "app", label: "Producers", sub: "IoT / apps", kind: "source", x: 60, y: 60, icon: Waves },
      { id: "kafka", label: "Kafka", sub: "Event log", kind: "ingest", x: 260, y: 120, icon: Layers },
      { id: "ss", label: "Structured Streaming", sub: "Windowed agg", kind: "process", x: 480, y: 60, icon: Zap },
      { id: "delta", label: "Delta Live", sub: "Bronze/Silver/Gold", kind: "store", x: 700, y: 120, icon: Database },
      { id: "api", label: "Realtime API", sub: "Low-latency", kind: "serve", x: 900, y: 60, icon: Server },
    ],
    edges: [
      { from: "app", to: "kafka" },
      { from: "kafka", to: "ss" },
      { from: "ss", to: "delta" },
      { from: "delta", to: "api" },
    ],
  },
  {
    id: "lakehouse",
    name: "Medallion Lakehouse",
    blurb: "Databricks lakehouse — Bronze → Silver → Gold with Unity Catalog governance.",
    nodes: [
      { id: "src", label: "Sources", sub: "DB · Files · APIs", kind: "source", x: 60, y: 100, icon: Boxes },
      { id: "adf", label: "ADF / Autoloader", sub: "Ingest", kind: "ingest", x: 260, y: 100, icon: GitBranch },
      { id: "bronze", label: "Bronze", sub: "Raw Delta", kind: "store", x: 460, y: 30, icon: Database },
      { id: "silver", label: "Silver", sub: "Conformed", kind: "process", x: 460, y: 170, icon: Filter },
      { id: "gold", label: "Gold", sub: "Curated marts", kind: "store", x: 680, y: 100, icon: Database },
      { id: "sql", label: "Databricks SQL", sub: "BI + apps", kind: "serve", x: 880, y: 100, icon: BarChart3 },
    ],
    edges: [
      { from: "src", to: "adf" },
      { from: "adf", to: "bronze" },
      { from: "bronze", to: "silver" },
      { from: "silver", to: "gold" },
      { from: "gold", to: "sql" },
    ],
  },
  {
    id: "ml",
    name: "ML Feature Pipeline",
    blurb: "Feature engineering + training + serving with MLflow and a feature store.",
    nodes: [
      { id: "raw", label: "Warehouse", sub: "Curated data", kind: "source", x: 60, y: 100, icon: Database },
      { id: "fe", label: "Feature Eng", sub: "PySpark", kind: "process", x: 260, y: 100, icon: Cpu },
      { id: "fs", label: "Feature Store", sub: "Online + offline", kind: "store", x: 460, y: 100, icon: Layers },
      { id: "train", label: "MLflow Train", sub: "Model registry", kind: "process", x: 680, y: 40, icon: Brain },
      { id: "serve", label: "Model Serving", sub: "REST / batch", kind: "serve", x: 680, y: 170, icon: Server },
      { id: "app2", label: "Product", sub: "Personalization", kind: "serve", x: 880, y: 100, icon: Zap },
    ],
    edges: [
      { from: "raw", to: "fe" },
      { from: "fe", to: "fs" },
      { from: "fs", to: "train" },
      { from: "fs", to: "serve" },
      { from: "train", to: "serve" },
      { from: "serve", to: "app2" },
    ],
  },
];

const VIEW_W = 960;
const VIEW_H = 240;
const NODE_W = 150;
const NODE_H = 62;

export function ArchitecturePlayground() {
  const [presetId, setPresetId] = useState(PRESETS[2].id);
  const [nodesById, setNodesById] = useState<Record<string, Node>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [flow, setFlow] = useState(true);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const dragRef = useRef<{ id: string; dx: number; dy: number } | null>(null);

  const preset = useMemo(
    () => PRESETS.find((p) => p.id === presetId)!,
    [presetId],
  );

  useEffect(() => {
    const map: Record<string, Node> = {};
    preset.nodes.forEach((n) => (map[n.id] = { ...n }));
    setNodesById(map);
    setSelected(null);
  }, [preset]);

  function toSvgPoint(clientX: number, clientY: number) {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const p = pt.matrixTransform(ctm.inverse());
    return { x: p.x, y: p.y };
  }

  function onPointerDown(e: React.PointerEvent, id: string) {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    const node = nodesById[id];
    if (!node) return;
    const { x, y } = toSvgPoint(e.clientX, e.clientY);
    dragRef.current = { id, dx: x - node.x, dy: y - node.y };
    setSelected(id);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragRef.current) return;
    const { id, dx, dy } = dragRef.current;
    const { x, y } = toSvgPoint(e.clientX, e.clientY);
    setNodesById((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        x: Math.max(0, Math.min(VIEW_W - NODE_W, x - dx)),
        y: Math.max(0, Math.min(VIEW_H - NODE_H, y - dy)),
      },
    }));
  }
  function onPointerUp() {
    dragRef.current = null;
  }

  function edgePath(a: Node, b: Node) {
    const x1 = a.x + NODE_W;
    const y1 = a.y + NODE_H / 2;
    const x2 = b.x;
    const y2 = b.y + NODE_H / 2;
    const mx = (x1 + x2) / 2;
    return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
  }

  const selectedNode = selected ? nodesById[selected] : null;

  return (
    <div className="rounded-2xl border border-border/60 bg-card/40 p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPresetId(p.id)}
              className={
                "rounded-full border px-3 py-1 text-xs transition " +
                (p.id === presetId
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border/60 text-muted-foreground hover:border-primary/30 hover:text-foreground")
              }
            >
              {p.name}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setFlow((f) => !f)}
          className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-background/60 px-3 py-1 text-xs text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
        >
          <Zap className="h-3 w-3" /> {flow ? "Pause flow" : "Play flow"}
        </button>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{preset.blurb}</p>

      <div className="mt-4 overflow-x-auto">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="min-w-[720px] w-full touch-none select-none"
          style={{ height: 320 }}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" className="fill-primary/70" />
            </marker>
            <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" className="stroke-border/40" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width={VIEW_W} height={VIEW_H} fill="url(#grid)" />

          {/* edges */}
          {preset.edges.map((e, i) => {
            const a = nodesById[e.from];
            const b = nodesById[e.to];
            if (!a || !b) return null;
            const d = edgePath(a, b);
            return (
              <g key={i}>
                <path d={d} className="stroke-primary/40" strokeWidth={1.5} fill="none" markerEnd="url(#arrow)" />
                {flow && (
                  <circle r={3} className="fill-primary">
                    <animateMotion dur={`${2.2 + (i % 3) * 0.4}s`} repeatCount="indefinite" path={d} />
                  </circle>
                )}
              </g>
            );
          })}

          {/* nodes */}
          {Object.values(nodesById).map((n) => {
            const Icon = n.icon;
            const active = selected === n.id;
            return (
              <g
                key={n.id}
                transform={`translate(${n.x} ${n.y})`}
                onPointerDown={(e) => onPointerDown(e, n.id)}
                style={{ cursor: "grab" }}
              >
                <rect
                  width={NODE_W}
                  height={NODE_H}
                  rx={10}
                  className={
                    "transition " +
                    KIND_STYLES[n.kind] +
                    (active ? " ring-2 ring-primary/60" : "")
                  }
                  style={{
                    fill: "currentColor",
                    fillOpacity: 0.08,
                    stroke: "currentColor",
                    strokeOpacity: 0.5,
                  }}
                />
                <foreignObject x={0} y={0} width={NODE_W} height={NODE_H}>
                  <div className={"flex h-full items-center gap-2 px-3 " + KIND_STYLES[n.kind].split(" ").filter((c) => c.startsWith("text-")).join(" ")}>
                    <Icon className="h-4 w-4 shrink-0" />
                    <div className="min-w-0">
                      <div className="truncate text-[11px] font-semibold text-foreground">{n.label}</div>
                      {n.sub && (
                        <div className="truncate text-[10px] text-muted-foreground">{n.sub}</div>
                      )}
                    </div>
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-widest text-muted-foreground">
        <Legend swatch="bg-sky-500/40" label="Source" />
        <Legend swatch="bg-violet-500/40" label="Ingest" />
        <Legend swatch="bg-primary/50" label="Process" />
        <Legend swatch="bg-emerald-500/40" label="Store" />
        <Legend swatch="bg-amber-500/40" label="Serve" />
        <span className="ml-auto normal-case tracking-normal text-[11px]">
          Tip: drag any node to rearrange
        </span>
      </div>

      {selectedNode && (
        <div className="mt-4 rounded-lg border border-border/60 bg-background/60 p-4 text-sm">
          <div className="text-xs uppercase tracking-widest text-primary">
            {selectedNode.kind}
          </div>
          <div className="mt-1 font-semibold text-foreground">{selectedNode.label}</div>
          {selectedNode.sub && (
            <div className="text-xs text-muted-foreground">{selectedNode.sub}</div>
          )}
        </div>
      )}
    </div>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={"h-2 w-2 rounded-sm " + swatch} />
      {label}
    </span>
  );
}