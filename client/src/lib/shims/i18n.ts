// i18next shim — só para build (CI)
type TFunc = (key: string, _?: any) => string;
const t: TFunc = (key) => key;

const i18n = {
  t,
  language: 'pt',
  isInitialized: true,
  init: async () => i18n,
  changeLanguage: async (_lng?: string) => i18n,
  use: (_: any) => i18n,
  on: () => i18n,
  off: () => i18n,
} as const;

export default i18n;
