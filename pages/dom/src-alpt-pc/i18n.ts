import Vue from 'vue'
import VueI18n, { LocaleMessages } from 'vue-i18n'
const en = require('@/language/en');
const cn = require('@/language/cn');

const messages = {en, cn};

Vue.use(VueI18n)

// function loadLocaleMessages (): LocaleMessages {
//   const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
//   const messages: LocaleMessages = {}
//   locales.keys().forEach(key => {
//     const matched = key.match(/([A-Za-z0-9-_]+)\./i)
//     if (matched && matched.length > 1) {
//       const locale = matched[1]
//       messages[locale] = locales(key)
//     }
//   })
//   return messages
// }
const defaultLocale = localStorage.getItem('alpt_language') || (location.origin.indexOf('en.instantex.io') > -1 ? 'en' : 'cn');

export default new VueI18n({
  // locale: process.env.VUE_APP_I18N_LOCALE || 'cn',
  locale: defaultLocale,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'cn',
  messages,
});
