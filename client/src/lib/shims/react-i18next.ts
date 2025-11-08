export const initReactI18next = {
  type: '3rdParty',
  init: () => {},
};

export const useTranslation = () => ({
  t: (key: string) => key,
  i18n: {
    changeLanguage: () => Promise.resolve(),
    language: 'pt-BR',
  },
});

export const Trans = (props: any) => props?.children ?? null;
