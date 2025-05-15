
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar', 'ta', 'id'],
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/src/i18n/locales/{{lng}}/translation.json',
    },
  });

export default i18n;
