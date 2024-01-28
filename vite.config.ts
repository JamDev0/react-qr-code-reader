import react from "@vitejs/plugin-react";
import { resolve } from 'path';
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsConfigPaths from "vite-tsconfig-paths";
import * as packageJson from "./package.json";

export default defineConfig(() => ({
  plugins: [
    react(),
    tsConfigPaths(),
    dts({
      include: ["src"],
      exclude: ["src/stories"]
    }),
  ],
  build: {
    lib: {
      entry: resolve("src", "index.ts"),
      name: "react-qr-code-reader",
      formats: ["es", "cjs"],
      fileName: (format) =>
        `react-qr-code-reader.${
          format === "cjs" ? "cjs" : "es.js"
        }`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React'
        }
      }
    },
    optimizeDeps: {
      exclude: Object.keys(packageJson.peerDependencies),
    },
    esbuild: {
      minify: true,
    },
  },
}));