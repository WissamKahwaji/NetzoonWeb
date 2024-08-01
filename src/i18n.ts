import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translatear from "./locales/ar/translation.json";
import translateen from "./locales/en/translation.json";
import HttpBackend from "i18next-http-backend";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(HttpBackend)
  .init({
    fallbackLng: "en",
    debug: true,
    returnObjects: true,
    detection: {
      order: ["cookie", "localStorage", "navigator"],
    },

    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: translateen,
      },
      ar: {
        translation: translatear,
      },
    },
  });

export default i18n;
