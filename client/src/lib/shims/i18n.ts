// i18next shim — carrega traduções reais de pt-BR.json
import ptBR from '../../locales/pt-BR.json';

type TFunc = (key: string, options?: any) => string;

// Função para buscar valor aninhado no objeto de traduções
const getNestedValue = (obj: any, path: string): string => {
  const keys = path.split('.');
  let value = obj;
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return path; // Retorna a chave se não encontrar
    }
  }
  return typeof value === 'string' ? value : path;
};

const t: TFunc = (key, options) => {
  let translation = getNestedValue(ptBR, key);
  
  // Suporte para interpolação {{variable}}
  if (options && typeof translation === 'string') {
    Object.keys(options).forEach(optKey => {
      translation = translation.replace(`{{${optKey}}}`, options[optKey]);
    });
  }
  
  return translation;
};

const i18n = {
  t,
  language: 'pt-BR',
  isInitialized: true,
  init: async () => i18n,
  changeLanguage: async (_lng?: string) => i18n,
  use: (_: any) => i18n,
  on: () => i18n,
  off: () => i18n,
} as const;

export default i18n;
