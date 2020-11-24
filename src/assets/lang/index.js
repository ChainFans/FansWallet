// const messages = {
//     //英文
//     en: {
//       message: {
//         hello: 'hello',
//         about: 'about',
//         welcome: "Welcome"
//       }
//     },
//     //简体中文
//     zhCHS: {
//       message: {
//         hello: '你好',
//         about: '关于',
//         welcome: "欢迎"
//       }
//     },
//     //繁体中文
//     zhCHT: {
//       message: {
//         hello: '妳好',
//         about: '關於',
//         welcome: "歡迎"
//       }
//     }
//   }
//   module.exports={
//       messages:messages
//   }
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
// import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
// import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    // ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    // ...elementZhLocale
  }
}

const i18n = new VueI18n({
  locale: Cookies.get('language') || 'zh', // set locale
  messages // set locale messages
})

export default i18n