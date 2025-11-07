export const QueryClient = class {};
export const QueryClientProvider = (props: any) => (props?.children ?? null);
export const useQuery = (..._args: any[]) => ({ data: undefined, isLoading: false, error: undefined });
export const useMutation = (..._args: any[]) => ({ mutate: () => {}, isLoading: false, error: undefined });
