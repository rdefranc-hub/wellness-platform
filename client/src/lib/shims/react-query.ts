// react-query shim – só para build
export const QueryClient = class {};
export const QueryClientProvider = (p: any) => (p?.children ?? null);
export const useQuery = (..._a: any[]) => ({ data: undefined, isLoading: false, error: undefined });
export const useMutation = (..._a: any[]) => ({ mutate: () => {}, isLoading: false, error: undefined });
export default {};
