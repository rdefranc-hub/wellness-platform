// vite.config.ts
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime"

import path from "node:path"
import { fileURLToPath } from "node:url"

// __dirname compatível com ESM/Node
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  // *** IMPORTANTE: como o site roda em /wellness, avise ao Vite ***
  base: "/wellness/",

  plugins: [
    react(),
    tailwindcss(),
    // removido: @builder.io/vite-plugin-jsx-loc (incompatível com Vite 7)
    vitePluginManusRuntime(),
  ],

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

  // projeto de front roda a partir de client/
  root: path.resolve(__dirname, "client"),
  publicDir: path.resolve(__dirname, "client", "public"),

  // build do front será copiado para onde o server espera
  build: {
    outDir: path.resolve(__dirname, "server", "_core", "public"),
    emptyOutDir: true,
  },

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
})
