import { reactRouter } from "@react-router/dev/vite"
import { defineConfig } from "vite";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    reactRouter(),
  ],
});
