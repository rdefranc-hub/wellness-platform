// react-query shim – só para build
export class QueryClient {
  private queryCache = {
    subscribe: () => ({ unsubscribe: () => {} })
  };
  
  private mutationCache = {
    subscribe: () => ({ unsubscribe: () => {} })
  };

  getQueryCache() {
    return this.queryCache;
  }

  getMutationCache() {
    return this.mutationCache;
  }
}

export const QueryClientProvider = (p: any) => (p?.children ?? null);
export const useQuery = (..._a: any[]) => ({ data: undefined, isLoading: false, error: undefined });
export const useMutation = (..._a: any[]) => ({ mutate: () => {}, isLoading: false, error: undefined });
export default {};
