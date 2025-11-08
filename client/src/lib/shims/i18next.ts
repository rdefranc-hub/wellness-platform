const i18n = {
  use: () => i18n,
  init: () => Promise.resolve(),
  t: (key: string) => key,
  changeLanguage: () => Promise.resolve(),
  language: 'pt-BR',
};

export default i18n;
