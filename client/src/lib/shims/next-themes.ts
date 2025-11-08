// Minimal shim for next-themes.
export const ThemeProvider = (props: any) => props?.children ?? null;
export const useTheme = () => ({ theme: 'light', setTheme: () => {} });
export default {};
