export const ThemeProvider = (props: any) => props?.children ?? null;
export const useTheme = () => ({
  theme: 'light',
  setTheme: (_: string) => {},
  themes: ['light', 'dark'],
});
