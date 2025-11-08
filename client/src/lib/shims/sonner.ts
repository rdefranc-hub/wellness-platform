// Minimal shim for sonner to satisfy bundling.
export const toast = (..._args: any[]) => ({});
export const Toaster = (props: any) => (props?.children ?? null);
export default { toast, Toaster };
