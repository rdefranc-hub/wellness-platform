// Minimal shim for 'wouter' router to satisfy imports during bundling.
export const Link = (props: any) => (props?.children ?? null);
export const Route = (props: any) => (props?.children ?? null);
export const Router = (props: any) => (props?.children ?? null);
export const Switch = (props: any) => (props?.children ?? null);
export const useLocation = () => ['/', () => {}] as const;
export default {};
