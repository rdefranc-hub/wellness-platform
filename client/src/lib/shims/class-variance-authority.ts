// Minimal shim for class-variance-authority utility.
export const cva = (..._args: any[]) => () => '';
export const cx = (...args: any[]) => args.filter(Boolean).join(' ');
export default { cva, cx };
