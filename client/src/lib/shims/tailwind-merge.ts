export function twMerge(...args: any[]): string {
  return args.filter(Boolean).join(' ');
}
