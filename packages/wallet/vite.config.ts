import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

import Unocss from "unocss/vite";
import presetWind from "@unocss/preset-wind";
import presetAttributify from "@unocss/preset-attributify";
import transformerDirectives from "@unocss/transformer-directives";
import transformerVariantGroup from "@unocss/transformer-variant-group";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    Unocss({
      presets: [presetWind(), presetAttributify()],
      transformers: [transformerDirectives(), transformerVariantGroup()],
      safelist: "prose prose-sm m-auto text-left".split(" "),
    }),
    react(),
    eslint(),
  ],
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
