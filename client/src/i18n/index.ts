
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import idTranslations from './locales/id/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      id: {
        translation: idTranslations
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
