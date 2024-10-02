import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';

import { SupportedLanguages } from '@/enums/SupportedLanguages';
import en from './json/en.json';
import pt from './json/pt.json';

const resources = {
  en: {
    translation: en,
  },
  pt: {
    translation: pt,
  },
};

const [firstLocale] = getLocales();

i18n.use(initReactI18next).init({
  resources,
  lng: firstLocale?.languageCode ?? SupportedLanguages.en,
  fallbackLng: SupportedLanguages.en,
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
