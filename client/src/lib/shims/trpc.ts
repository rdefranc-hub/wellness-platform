// Lightweight TRPC shim for bundling without a backend.
export const createTRPCReact = () => ({});
export const createTRPCProxyClient = () => ({});
export const httpBatchLink = (_: any) => (_i: any) => _i;
export class TRPCClientError extends Error {
  constructor(message: string) {
    super(message);
  }
}
export const trpc = new Proxy({}, {
  get: () => () => Promise.resolve({})
});
export default {};
