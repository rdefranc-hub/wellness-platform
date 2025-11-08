// Minimal shim for react-i18next to satisfy bundling.
export const initReactI18next = {};
export const useTranslation = () => ({ t: (key: string) => key, i18n: {} });
export default {};
