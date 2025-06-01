import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false,
    },
    
    react: {
      useSuspense: false, // Important for SSR
    },
  });

export default i18n;
