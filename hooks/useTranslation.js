import { useTranslation as useI18nTranslation } from 'react-i18next';

export const useTranslation = () => {
  return useI18nTranslation();
};

export const supportedLanguages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'pt-BR', name: 'Portuguese', nativeName: 'Português (Brasil)' },
];

export default useI18nTranslation;