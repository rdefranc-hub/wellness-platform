// Minimal shim for tailwind-merge utility.
export const twMerge = (...args: any[]) => args.filter(Boolean).join(' ');
export default twMerge;
