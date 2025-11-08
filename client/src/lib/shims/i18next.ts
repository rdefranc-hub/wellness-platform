// Minimal shim for i18next to satisfy bundling.
export const use = (..._args: any[]) => ({ init: () => {}, use });
export const init = (..._args: any[]) => ({});
export const t = (key: string) => key;
export default { use, init, t };
