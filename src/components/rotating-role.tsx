import { useEffect, useState } from "react";

const ROLES = [
  "Senior Data Engineer",
  "Spark & Databricks Specialist",
  "Cloud Lakehouse Architect",
  "Streaming & Kafka Practitioner",
  "AWS Glue · Redshift · Snowflake",
];

export function RotatingRole() {
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const swap = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setI((n) => (n + 1) % ROLES.length);
        setVisible(true);
      }, 260);
    }, 2600);
    return () => clearInterval(swap);
  }, []);

  return (
    <div className="mt-5 flex items-center gap-3 font-mono text-sm text-muted-foreground">
      <span className="text-primary">$</span>
      <span className="text-foreground/60">role</span>
      <span className="text-muted-foreground/60">→</span>
      <span
        aria-live="polite"
        className={`inline-flex items-center transition-all duration-300 ${
          visible
            ? "translate-y-0 opacity-100"
            : "-translate-y-1 opacity-0"
        }`}
      >
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {ROLES[i]}
        </span>
        <span className="ml-1 inline-block h-4 w-[2px] animate-pulse bg-primary align-middle" />
      </span>
    </div>
  );
}