import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

/**
 * Magnetic wrapper — pulls its child slightly toward the cursor on hover.
 * Respects prefers-reduced-motion.
 */
export function Magnetic({ children, strength = 0.25, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }
  function onLeave() {
    const el = ref.current;
    if (el) el.style.transform = "translate3d(0,0,0)";
  }

  return (
    <span
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={"inline-block " + (className ?? "")}
      style={{ display: "inline-block" }}
    >
      <span
        ref={ref}
        className="inline-block transition-transform duration-200 ease-out will-change-transform"
      >
        {children}
      </span>
    </span>
  );
}