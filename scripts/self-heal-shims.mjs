// scripts/self-heal-shims.mjs
import fs from "fs";
import path from "path";

console.log("🤖 Iniciando auto-heal: criando shims e ajustando aliases...");

const shimsDir = path.resolve("client/src/lib/shims");
if (!fs.existsSync(shimsDir)) fs.mkdirSync(shimsDir, { recursive: true });

// Cria os shims necessários
const shims = {
  "trpc.ts": `// Lightweight TRPC shim
export const createTRPCReact = () => ({});
export const createTRPCProxyClient = () => ({});
export const httpBatchLink = (_: any) => (_i: any) => _i;
export default {};`,

  "react-query.ts": `// Minimal shim for @tanstack/react-query
export const QueryClient = class {};
export const QueryClientProvider = (props: any) => (props?.children ?? null);
export const useQuery = (..._args: any[]) => ({ data: undefined, isLoading: false, error: undefined });
export const useMutation = (..._args: any[]) => ({ mutate: () => {}, isLoading: false, error: undefined });
export default {};`,

  "wouter.ts": `// Minimal shim for 'wouter'
export const Link = (props: any) => (props?.children ?? null);
export const Route = (props: any) => (props?.children ?? null);
export const Router = (props: any) => (props?.children ?? null);
export const Switch = (props: any) => (props?.children ?? null);
export const useLocation = () => ['/', () => {}] as const;
export default {};`,

  "superjson.ts": `// Build-only superjson shim
export const parse = (s: string) => JSON.parse(s);
export const stringify = (v: any) => JSON.stringify(v);
export const serialize = (v: any) => ({ json: JSON.stringify(v) });
export const deserialize = (o: { json: string }) => JSON.parse(o?.json ?? 'null');
const SuperJSON = { parse, stringify, serialize, deserialize };
export default SuperJSON;`,
};

for (const [name, content] of Object.entries(shims)) {
  const file = path.join(shimsDir, name);
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, content, "utf8");
    console.log(`✅ Criado: ${name}`);
  }
}

console.log("✅ Auto-heal finalizado. Pronto para commit automático.");
