export const format = (date: Date, formatStr: string) => date.toLocaleDateString();
export const parse = (dateStr: string) => new Date(dateStr);
export const isValid = (date: any) => date instanceof Date && !isNaN(date.getTime());
export const addDays = (date: Date, days: number) => new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
