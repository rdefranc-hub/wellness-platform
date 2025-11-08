// client/src/lib/shims/react-i18next.ts
export const useTranslation = () => ({
  t: (key: string, _opts?: any) => key,
  i18n: {} as any,
});

export const Trans = (props: any) => (props?.children ?? null);

// compat para i18next.use(initReactI18next)
export const initReactI18next = { type: '3rdParty', init: () => {} } as any;

export default { useTranslation, Trans, initReactI18next };
