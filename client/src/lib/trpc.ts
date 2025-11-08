// client/src/lib/trpc.ts
// Reexporta o shim já criado para TRPC.
// Assim, qualquer import "@/lib/trpc" encontra esse arquivo.

export * from './shims/trpc';
export { default } from './shims/trpc';
