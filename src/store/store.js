import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isVersion:false,
    isLogin:false,
    networkStatus:true,
    routerName:'chaincloud',
    shownav:true,
    del_walletId:'',
    newVersion:'',
    newVersionUrl:'',
    walletInfo:'',
    userName:'',
    wallet_data:{},
    wallet_default:{},
    isFingerprint:false,   // 是否开启指纹
    first_auto:0,
    minerData:'',
    isGuide:window.plus?!plus.storage.getItem("isGuide")?1:plus.storage.getItem("isGuide"):!localStorage.getItem("isGuide")?1:localStorage.getItem("isGuide"),
    appTop:0,
    lastBlockNumber:0,
    scanData:'',
    transferKeep:'',
    new_walletInfo:[],
    totalPriceCny:0,
  },
  mutations: {
    changeRoute(state,newVal){
      state.routerName=newVal
    },
    delWalletId(state,newVal){
      state.del_walletId=newVal
    },
    get_newVersion(state,newVal){
      state.newVersion=newVal
    },
    get_newVersionUrl(state,newVal){
      state.newVersionUrl=newVal
    },
    walletInfo(state,newVal){
      state.walletInfo=newVal
    },
    blockNumber(state,newVal){
      state.lastBlockNumber=newVal
    },
    userName(state,newVal){
      state.userName=newVal
    },
    walletData(state,newVal){
      state.wallet_data=newVal
    },
    wallet_default(state,newVal){
      state.wallet_default=newVal
    },
    isFingerprint(state,newVal){
      state.isFingerprint=newVal
    },
    first_auto(state,newVal){
      state.first_auto=newVal
    },
    isGuide(state,newVal){
      state.isGuide=newVal
    },
  },
  actions: {

  }
})
