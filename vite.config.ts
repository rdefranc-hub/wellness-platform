// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: "/wellness/",
  plugins: [react()],
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
  root: path.resolve(__dirname, "client"),
  publicDir: path.resolve(__dirname, "client", "public"),
  build: {
    outDir: path.resolve(__dirname, "server", "_core", "public"),
    emptyOutDir: true,
    assetsDir: "assets"
  },
  server: {
    host: true,
    port: 5173,
    fs: { strict: true, deny: ["**/.*"] }
  }
});

