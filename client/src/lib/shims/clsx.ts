export function clsx(...args: any[]): string {
  return args.filter(Boolean).join(' ');
}
export default clsx;
export type ClassValue = string | number | boolean | undefined | null | { [key: string]: any } | ClassValue[];
