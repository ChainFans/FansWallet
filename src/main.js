import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './router/intercept'
import store from './store/store'
import fastClick from 'fastclick'
import "@/assets/style/css/normalize.css"
import "@/assets/style/css/resetui.scss"
import "@/assets/style/css/border.css"
import "@/assets/style/css/iconfont.css"

import public_js from '@/components/public-function.js'
Vue.prototype.public_js = public_js

// import axios from '../src/api/api'
import VueCookies from 'vue-cookies'
import VueClipboard from 'vue-clipboard2' 

import Vant from 'vant';
import 'vant/lib/index.css';

// Vue.prototype.$axios = axios;
// import Loading from '../src/components/load/index.vue'
// Vue.use(Loading)
// Vue.use(Loading, {
//   container: '.app',
// })
import { Lazyload } from 'vant';

Vue.use(Lazyload);



Vue.config.productionTip = false
VueClipboard.config.autoSetContainer = true

// fastClick.attach(document.body)

Vue.use(Vant);
Vue.use(VueClipboard)
Vue.use(VueCookies)

// if (!(/(iPhone|iPod|Android|ios|iPad)/i.test(navigator.userAgent))) {
//     location.href = 'http://www.chainfans.io'
// } else {
new Vue({
  router,
  store,
  // i18n,
  render: h => h(App)
}).$mount('#app')
// }
