// Minimal shim for clsx utility.
export const clsx = (...args: any[]) => args.filter(Boolean).join(' ');
export default clsx;
