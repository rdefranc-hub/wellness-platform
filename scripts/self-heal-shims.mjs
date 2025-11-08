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
writeIfMissing(path.join(shimsDir, "trpc.ts"),
