// Minimal shim for date-fns.
export const format = (date: any, fmt: string) => date?.toString() ?? '';
export const addDays = (date: any, days: number) => date;
export const subDays = (date: any, days: number) => date;
export const startOfWeek = (date: any) => date;
export const endOfWeek = (date: any) => date;
export const startOfMonth = (date: any) => date;
export const endOfMonth = (date: any) => date;
export const isSameDay = (date1: any, date2: any) => false;
export const isAfter = (date1: any, date2: any) => false;
export const isBefore = (date1: any, date2: any) => false;
export default {};
