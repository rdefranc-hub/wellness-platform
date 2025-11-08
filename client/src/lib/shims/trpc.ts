export const createTRPCReact = () => ({
  createClient: () => ({}),
  Provider: ({ children }: any) => children,
  useQuery: () => ({ data: undefined, isLoading: false }),
  useMutation: () => ({ mutate: () => {}, isLoading: false }),
});

export const createTRPCProxyClient = () => ({});
export const httpBatchLink = (_: any) => (_i: any) => _i;

export class TRPCClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TRPCClientError';
  }
}

// Export trpc instance for use in main.tsx
export const trpc = createTRPCReact();

export default {};
