// Stub para permitir build sem backend TRPC.
// Atende imports como "@/lib/trpc".
export const createTRPCReact = () => ({});
export const createTRPCProxyClient = () => ({});
export const httpBatchLink = (_: any) => (_i: any) => _i;

export default {};
