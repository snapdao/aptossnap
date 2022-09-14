import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [react(), eslint()],
  ...(process.env.NODE_ENV === "production" && {
    esbuild: {
      drop: ["console", "debugger"],
    },
  }),
  optimizeDeps: {
    include: ["@keystonehq/aptossnap-adapter"],
    exclude: [],
  },
});
