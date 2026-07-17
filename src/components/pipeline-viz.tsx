export function PipelineViz() {
  return (
    <div className="relative flex h-full min-h-[420px] items-center justify-center md:min-h-[520px]">
      <style>{`
        @keyframes pv-float {
          0%,100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(-18px) translateX(-4px); }
          75% { transform: translateY(-8px) translateX(2px); }
        }
        @keyframes pv-stream { 0% { stroke-dashoffset: 1000; } 100% { stroke-dashoffset: 0; } }
        .pv-path { stroke-dasharray: 100 900; animation: pv-stream 15s linear infinite; }
        .pv-node { animation: pv-float 6s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
        .pv-badge-a { animation: pv-float 5s ease-in-out infinite; }
        .pv-badge-b { animation: pv-float 7s ease-in-out infinite reverse; }
        @media (prefers-reduced-motion: reduce) {
          .pv-path, .pv-node, .pv-badge-a, .pv-badge-b { animation: none !important; }
        }
      `}</style>

      <svg
        viewBox="0 0 500 500"
        className="h-auto w-full max-w-[520px] drop-shadow-[0_0_30px_rgba(99,102,241,0.2)]"
        role="img"
        aria-label="Animated data pipeline visualisation"
      >
        <defs>
          <linearGradient id="pv-pipe" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(129,140,248)" stopOpacity="0.2" />
            <stop offset="50%" stopColor="rgb(167,139,250)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="rgb(129,140,248)" stopOpacity="0.2" />
          </linearGradient>
          <filter id="pv-glow">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g opacity="0.1">
          <circle cx="250" cy="250" r="220" fill="none" stroke="white" strokeWidth="0.5" />
          <circle cx="250" cy="250" r="150" fill="none" stroke="white" strokeWidth="0.5" />
          <line x1="250" y1="30" x2="250" y2="470" stroke="white" strokeWidth="0.5" />
          <line x1="30" y1="250" x2="470" y2="250" stroke="white" strokeWidth="0.5" />
        </g>

        <path d="M50,250 C150,250 150,100 250,100 S350,250 450,250" fill="none" stroke="url(#pv-pipe)" strokeWidth="2" />
        <path d="M50,250 C150,250 150,400 250,400 S350,250 450,250" fill="none" stroke="url(#pv-pipe)" strokeWidth="2" />

        <path className="pv-path" d="M50,250 C150,250 150,100 250,100 S350,250 450,250" fill="none" stroke="#818cf8" strokeWidth="3" strokeLinecap="round" filter="url(#pv-glow)" />
        <path className="pv-path" d="M50,250 C150,250 150,400 250,400 S350,250 450,250" fill="none" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" filter="url(#pv-glow)" style={{ animationDelay: "-7s" }} />

        <g className="pv-node">
          <rect x="225" y="225" width="50" height="50" rx="8" fill="#4f46e5" fillOpacity="0.2" stroke="#818cf8" strokeWidth="2" filter="url(#pv-glow)" />
          <rect x="235" y="235" width="30" height="30" rx="4" fill="#6366f1" />
          <circle cx="250" cy="250" r="4" fill="white">
            <animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>

        <circle cx="50" cy="250" r="6" fill="#818cf8" filter="url(#pv-glow)" />
        <circle cx="450" cy="250" r="6" fill="#a78bfa" filter="url(#pv-glow)" />
        <circle cx="250" cy="100" r="6" fill="#818cf8" filter="url(#pv-glow)" />
        <circle cx="250" cy="400" r="6" fill="#a78bfa" filter="url(#pv-glow)" />

        <g fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="10" fill="#818cf8" fontWeight="bold" opacity="0.45">
          <text x="270" y="90">SPARK</text>
          <text x="80" y="395">KAFKA</text>
          <text x="395" y="245">AWS</text>
          <text x="30" y="240">SOURCE</text>
          <text x="215" y="215" fill="#a78bfa">DATABRICKS</text>
        </g>
      </svg>

      <div className="pv-badge-a absolute right-0 top-2 rounded-lg border border-primary/25 bg-card/70 p-3 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          <span className="font-mono text-[10px] text-primary">INGESTION_ACTIVE</span>
        </div>
      </div>
      <div className="pv-badge-b absolute bottom-4 left-0 rounded-lg border border-accent/25 bg-card/70 p-3 backdrop-blur-md">
        <span className="font-mono text-[10px] text-accent">LATENCY · 12ms</span>
      </div>
    </div>
  );
}
