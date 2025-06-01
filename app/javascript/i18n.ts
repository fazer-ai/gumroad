import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import productEn from './locales/en/product.json';
import commonEn from './locales/en/common.json';
import checkoutEn from './locales/en/checkout.json';
import authenticationEn from './locales/en/authentication.json';
import settingsEn from './locales/en/settings.json';

const resources = {
  en: {
    product: productEn,
    common: commonEn,
    checkout: checkoutEn,
    authentication: authenticationEn,
    settings: settingsEn,
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
