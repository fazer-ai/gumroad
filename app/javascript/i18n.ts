import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonEn from './locales/en/common.json';
import productEn from './locales/en/product.json';
import checkoutEn from './locales/en/checkout.json';
import dashboardEn from './locales/en/dashboard.json';
import authenticationEn from './locales/en/authentication.json';

const resources = {
  en: {
    common: commonEn,
    product: productEn,
    checkout: checkoutEn,
    dashboard: dashboardEn,
    authentication: authenticationEn,
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
