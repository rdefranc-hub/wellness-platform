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
  // site publicado dentro de /wellness no HostGator
  base: "/wellness/",

  plugins: [react(), tailwindcss(), vitePluginManusRuntime()],

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

  // front roda a partir de client/
  root: path.resolve(__dirname, "client"),
  publicDir: path.resolve(__dirname, "client", "public"),

  // build SEMPRE em client/dist (padrão do Vite)
  build: {
    outDir: path.resolve(__dirname, "client", "dist"),
    emptyOutDir: true,
    assetsDir: "assets",
  },
})
