export const create = (storeInitializer: any) => {
  const store: any = {};
  const storeApi = {
    getState: () => store,
    setState: (partial: any) => Object.assign(store, partial),
    subscribe: () => () => {},
    destroy: () => {},
  };
  const initialState = storeInitializer(storeApi.setState, storeApi.getState, storeApi);
  Object.assign(store, initialState);
  return () => store;
};
export default { create };
