import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ru from './locales/ru.json';
import de from './locales/de.json';
import uk from './locales/uk.json';
import en from './locales/en.json';

const resources = {
  ru: { translation: ru },
  de: { translation: de },
  uk: { translation: uk },
  en: { translation: en },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'de',
    supportedLngs: ['de', 'ru', 'uk', 'en'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;

export const languages = [
  { code: 'de', label: 'DE', fullName: 'Deutsch' },
  { code: 'ru', label: 'RU', fullName: 'Русский' },
  { code: 'uk', label: 'УКР', fullName: 'Українська' },
  { code: 'en', label: 'EN', fullName: 'English' },
];
