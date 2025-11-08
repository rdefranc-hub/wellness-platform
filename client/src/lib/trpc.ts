// client/src/lib/trpc.ts
// Reexporta o shim já criado para TRPC.
// Assim, qualquer import "@/lib/trpc" encontra esse arquivo.

export * from './shims/trpc';
export { default } from './shims/trpc';

// Create trpc object with createClient and Provider
const Component = (props: any) => props?.children ?? null;
export const trpc = {
  createClient: () => ({}),
  Provider: Component,
  useQuery: () => ({ data: undefined, isLoading: false }),
  useMutation: () => ({ mutate: () => {}, isLoading: false }),
};
