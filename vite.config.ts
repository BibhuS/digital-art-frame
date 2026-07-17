// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { BLOG_POSTS, PROJECTS } from "./src/lib/portfolio-data";

const prerenderRoutes = [
  "/",
  "/blog",
  ...BLOG_POSTS.map((p) => `/blog/${p.slug}`),
  ...PROJECTS.map((p) => `/projects/${p.slug}`),
];

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  nitro: {
    // GitHub Pages is static-only. This preset is ignored inside Lovable builds
    // (which force Cloudflare), but it makes `bun run build` produce a static site
    // when run in GitHub Actions.
    preset: "static",
    output: {
      dir: ".output",
      publicDir: ".output/public",
    },
  },
});
