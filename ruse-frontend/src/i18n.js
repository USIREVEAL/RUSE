import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationDE from './locales/de/translations.json';
import translationEN from './locales/en/translations.json';
import translationFR from './locales/fr/translations.json';
import translationIT from './locales/it/translations.json';

const langs = ['en', 'it', 'fr', 'de'];

const resources = {
  en: {
    translation: translationEN
  },
  it: {
    translation: translationIT
  },
  fr: {
    translation: translationFR
  },
  de: {
    translation: translationDE
  }
};

const lang = window.location.pathname.split('/')[1];

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: lang !== undefined && langs.includes(lang) ? lang : 'en',
    fallbackLng: 'en',
    debug: false,
    keySeparator: false,

    interpolation: {
      escapeValue: false, 
    }
  });


export default i18n;