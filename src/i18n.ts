import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    common: {
      "change": "Сhange",
      "get": "Get"
    }
  },
  rus: {
    common: {
      "change": "Меняю",
      "get": "Получаю"
    }
  }
}

export const availableLanguages = Object.keys(resources)

i18n.use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    defaultNS: "common",
    lng: "rus",
    fallbackLng: "rus",
    debug: true,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;