import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './locales/en.json';
import ptBR from './locales/pt-BR.json';
import eo from './locales/eo.json';

const locales = Localization.getLocales();
const deviceLanguage = locales[0]?.languageCode ?? 'en';
const supportedLanguages = ['en', 'pt', 'eo'];
const defaultLanguage = supportedLanguages.includes(deviceLanguage) ? deviceLanguage : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      'pt-BR': { translation: ptBR },
      eo: { translation: eo },
    },
    lng: defaultLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v4',
  });

export default i18n;