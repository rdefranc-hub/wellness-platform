// vite.config.ts
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime"

import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  // o site publicado roda em /wellness/
  base: "/wellness/",

  plugins: [react(), tailwindcss(), vitePluginManusRuntime()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@components": path.resolve(__dirname, "client", "src", "components"),
      "@pages": path.resolve(__dirname, "client", "src", "pages"),
      "@lib": path.resolve(__dirname, "client", "src", "lib"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets")
    }
  },

  // Vite rodando a partir do front-end em /client
  root: path.resolve(__dirname, "client"),
  publicDir: path.resolve(__dirname, "client", "public"),

  // build do front vai para o local que o server espera servir
  build: {
    outDir: path.resolve(__dirname, "server", "_core", "public"),
    emptyOutDir: true,
    assetsDir: "assets"
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
      "127.0.0.1"
    ],
    fs: { strict: true, deny: ["**/.*"] }
  }
})
