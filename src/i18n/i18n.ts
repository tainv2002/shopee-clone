import { use } from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_EN from 'src/locales/en/home.json'
import HOME_VI from 'src/locales/vi/home.json'
import PRODUCT_EN from 'src/locales/en/product.json'
import PRODUCT_VI from 'src/locales/vi/product.json'

export const locales = {
  vi: 'Tiếng Việt',
  en: 'English'
} as const

export const defaultNS = 'home' as const

export const resources = {
  en: {
    home: HOME_EN,
    product: PRODUCT_EN
  },
  vi: {
    home: HOME_VI,
    product: PRODUCT_VI
  }
} as const

export default use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources,
    lng: 'vi', // if you're using a language detector, do not define the lng option
    fallbackLng: 'vi',
    ns: ['home', 'product'],
    defaultNS,
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  })
