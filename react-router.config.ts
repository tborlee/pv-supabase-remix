import type { Config } from "@react-router/dev/config";

export default {
  ignoredRouteFiles: ["**/.*"],
  future: {
    unstable_optimizeDeps: true,
    v3_fetcherPersist: true,
    v3_relativeSplatPath: true,
    v3_throwAbortReason: true,
    v3_lazyRouteDiscovery: true,
    v3_singleFetch: true,
    v3_routeConfig: true,
  },
};
