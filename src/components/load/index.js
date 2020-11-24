const LOADING = {
  install(Vue) {
      if (typeof window !== 'undefined' && window.Vue) {
          Vue = window.Vue
      }
      let tpl;
      // 挂载到vue原型上，暴露两个方法
      Vue.prototype.$loading = {
          show(){
              var loading = Vue.extend(require('@/components/Loading/Loading').default);
              // import Loading from './Loading.vue'
              tpl = new loading().$mount().$el;
              debugger
              document.body.appendChild(tpl);
              return tpl
          },
          hidden(){
              return document.body.removeChild(tpl);
          }

      }
  }
}
export default LOADING