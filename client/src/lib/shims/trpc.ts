export const createTRPCReact = () => ({});
export const createTRPCProxyClient = () => ({});
export const httpBatchLink = (_: any) => (_i: any) => _i;
export class TRPCClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TRPCClientError';
  }
}
export default {};
