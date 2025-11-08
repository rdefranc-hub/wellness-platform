import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const clientDir = path.join(root, "client");
const shimsDir = path.join(clientDir, "src", "lib", "shims");
const viteConfigPath = path.join(root, "vite.config.ts");
const tsconfigClientPath = path.join(clientDir, "tsconfig.json");

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writeIfMissing(file, content) {
  if (!fs.existsSync(file)) {
    ensureDir(path.dirname(file));
    fs.writeFileSync(file, content, "utf8");
    console.log("created:", path.relative(root, file));
    return true;
  }
  return false;
}

function upsertFileContains(file, marker, inject) {
  const exists = fs.existsSync(file);
  const src = exists ? fs.readFileSync(file, "utf8") : "";
  if (!src.includes(marker)) {
    const next = exists ? src + "\n" + inject : inject;
    ensureDir(path.dirname(file));
    fs.writeFileSync(file, next, "utf8");
    console.log("updated:", path.relative(root, file), "(injected marker:", marker, ")");
    return true;
  }
  return false;
}

// --- conteúdos dos shims (build-only, sem deps externas) ---
const shimTRPC = `// Lightweight TRPC shim for bundling without a backend.
export const createTRPCReact = () => ({});
export const createTRPCProxyClient = () => ({});
export const httpBatchLink = (_: any) => (_i: any) => _i;
export default {};
`;

const shimReactQuery = `// Minimal shim for @tanstack/react-query (build-only).
export const QueryClient = class {};
export const QueryClientProvider = (props: any) => (props?.children ?? null);
export const useQuery = (..._args: any[]) => ({ data: undefined, isLoading: false, error: undefined });
export const useMutation = (..._args: any[]) => ({ mutate: () => {}, isLoading: false, error: undefined });
export default {};
`;

const shimWouter = `// Minimal shim for 'wouter' (build-only).
export const Link = (props: any) => (props?.children ?? null);
export const Route = (props: any) => (props?.children ?? null);
export const Router = (props: any) => (props?.children ?? null);
export const Switch = (props: any) => (props?.children ?? null);
export const useLocation = () => ['/', () => {}] as const;
export default {};
`;

const shimSuperjson = `// Build-only superjson shim: sem dependências.
export const parse = (s: string) => JSON.parse(s);
export const stringify = (v: any) => JSON.stringify(v);
export const serialize = (v: any) => ({ json: JSON.stringify(v) });
export const deserialize = (o: { json: string }) => JSON.parse(o?.json ?? 'null');
const SuperJSON = { parse, stringify, serialize, deserialize };
export default SuperJSON;
`;

// --- criar shims se faltarem ---
ensureDir(shimsDir);
writeIfMissing(path.join(shimsDir, "trpc.ts"), shimTRPC);
writeIfMissing(path.join(shimsDir, "react-query.ts"), shimReactQuery);
writeIfMissing(path.join(shimsDir, "wouter.ts"), shimWouter);
writeIfMissing(path.join(shimsDir, "superjson.ts"), shimSuperjson);

// --- upsert vite.config.ts com root e aliases necessários ---
const viteTemplate = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'client'),
  base: '/wellness/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client', 'src'),
      '@lib': path.resolve(__dirname, 'client', 'src', 'lib'),
      '@shared': path.resolve(__dirname, 'shared'),
      // build-only shims:
      '@tanstack/react-query': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'react-query.ts'),
      '@trpc/react-query': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'trpc.ts'),
      '@trpc/client': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'trpc.ts'),
      '@trpc/server': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'trpc.ts'),
      'wouter': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'wouter.ts'),
      'superjson': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'superjson.ts'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'client', 'index.html'),
    },
  },
  server: { port: 5173 },
});
`;

// Se o arquivo não existir, cria completo. Se existir, injeta um marcador simples.
if (!fs.existsSync(viteConfigPath)) {
  fs.writeFileSync(viteConfigPath, viteTemplate, "utf8");
  console.log("created:", path.relative(root, viteConfigPath));
} else {
  const marker = "'@trpc/client': path.resolve(__dirname, 'client', 'src', 'lib', 'shims', 'trpc.ts')";
  upsertFileContains(viteConfigPath, marker, viteTemplate);
}

// --- tsconfig do client (para editores/tsc entenderem paths) ---
const tsconfigClient = `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["DOM", "ES2022"],
    "jsx": "react-jsx",
    "strict": true,
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@lib/*": ["src/lib/*"],
      "@shared/*": ["../shared/*"]
    }
  },
  "include": ["src"]
}
`;
writeIfMissing(tsconfigClientPath, tsconfigClient);

console.log("self-heal complete");
