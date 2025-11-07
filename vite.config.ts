// vite.config.ts
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  // o site será servido em /wellness/
  base: "/wellness/",

  // plugins necessários
  plugins: [react(), tailwindcss(), vitePluginManusRuntime()],

  // atalhos de import
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@components": path.resolve(__dirname, "client", "src", "components"),
      "@pages": path.resolve(__dirname, "client", "src", "pages"),
      "@lib": path.resolve(__dirname, "client", "src", "lib"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },

  // o projeto front roda a partir de client/
  root: path.resolve(__dirname, "client"),
  publicDir: path.resolve(__dirname, "client", "public"),

  // saída do build (fica em client/dist) — é isso que o deploy envia
  build: {
    outDir: "dist",
    emptyOutDir: true,
    assetsDir: "assets",
  },

  // dev server (local)
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: { strict: true, deny: ["**/.*"] },
  },
});
