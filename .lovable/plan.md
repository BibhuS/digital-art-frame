## Motion Presets for Hero 3D Globe

Add three quick-select preset buttons to the hero control panel that set both animation speed and particle intensity in one tap.

### Presets
- **Calm** — speed 0.4x, particles off (or low density), gentle rotation
- **Balanced** — speed 1.0x, particles on (default density) — default on load
- **Dynamic** — speed 2.2x, particles on (higher density), lively rotation

### Changes (single file: `src/components/hero-canvas.tsx`)
1. Add a `preset` state (`"calm" | "balanced" | "dynamic"`) plus a `particleIntensity` state (low/medium/high) that scales particle count/opacity in the Three.js scene.
2. Render a compact preset row inside the existing control panel (above the speed slider): three pill buttons highlighting the active preset.
3. Clicking a preset updates speed + particles-on + intensity together. Manually adjusting the speed slider or toggling particles switches the active preset chip to "Custom".
4. Restyle the panel slightly so presets + manual controls read as two groups; keep it collapsed-friendly on mobile (wrap to two rows).

### Notes
- Purely presentational; no data or routing changes.
- Uses existing tokens (primary/accent) for the active pill — no new colors.
- No new dependencies.
