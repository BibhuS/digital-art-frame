import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // GitHub Pages project sites serve the app under /<repo-name>/; BASE_URL
    // is injected by Vite from the GITHUB_PAGES_BASE env var in the workflow.
    basepath: (import.meta.env.BASE_URL || "/").replace(/\/$/, "") || "/",
  });

  return router;
};
