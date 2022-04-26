import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    common: {
      "title": "Currency сonverter",
      "change": "Сhange",
      "get": "Get",
      "error": "Only positive numbers are permitted",
      "altArrowBtn": "Arrow"
    }
  },
  rus: {
    common: {
      "title": "Конвертер валют",
      "change": "Меняю",
      "get": "Получаю",
      "error": "Должно быть положительным числом",
      "altArrowBtn": "Стрелка"
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