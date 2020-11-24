
const routes = [
  {
    path: '/',
    redirect: '/firstScreenLoad',
    component: () => import('@/views/layout/index'),
    children: [
      // {
      //   path: 'home',
      //   name: 'home',
      //   meta: { requiresAuth: true },
      //   component: () => import('@/views/home/index'),
      // },
      {
        path: 'chaincloud',
        name: 'chaincloud',
        // meta:{keepAlive: true},
        component: () => import('@/views/chaincloud/index'),
      },
      {
        path: 'chainworld',
        name: 'chainworld',
        meta:{keepAlive: true},
        component: () => import('@/views/chainworld/index'),
      },
      {
        path: 'navigation',
        name: 'navigation', 
        meta:{keepAlive: true},
        component: () => import('@/views/navigation/index'),       
      },
      {
        path: 'wallet',
        name: 'wallet',
        // meta:{keepAlive: true},
        component: () => import('@/views/wallet/index'),
      },
      // {
      //   path: 'onlineask',
      //   name: 'onlineask',
      //   component: () => import('@/views/onlineask/index'),
      // },
      {
        path: 'mycenter',
        name: 'mycenter',
        meta:{keepAlive: false},
        component: () => import('@/views/mycenter/index'),
      },

    ]
  },
  //公共页面
  {
    path: '/thirdParty',
    name: 'thirdParty',
    meta: { headline: '' },   //第三方dapp
    component: () => import('@/views/navigation/third-dapp')
  },
  {
    path: '/webView',
    name: 'webView',
    meta: { headline: '' },   //webView
    component: () => import('@/views/navigation/webView')
  },
  {
    path: '/outer_chain',
    name: 'outer_chain',
    meta: { headline: '资讯' },   //第三方链接
    component: () => import('@/components/outer_chain')
  },
  {
    path: '/queryContract',
    name: 'queryContract',
    meta: { headline: 'Etherscan' },   //ETH游览器
    component: () => import('@/components/queryContract')
  },
  {
    path: '/consultation',
    name: 'consultation',
    meta: { headline: '咨询' },   //咨询
    component: () => import('@/components/consultation')
  },
  {   
    path: '/successPay',      //支付成功页面
    name: 'successPay',   
    component: () => import('@/components/successPay')
  },
  {   
    path: '/cancelPay',      //支付成功页面
    name: 'cancelPay',   
    component: () => import('@/components/cancelPay')
  },
  {   
    path: '/address_book',      //地址本
    name: 'address_book',   
    component: () => import('@/components/address_book')
  },
  {   
    path: '/fingerprint',      //指纹验证
    name: 'fingerprint',   
    component: () => import('@/components/fingerprint/index')
  },
  {   
    path: '/finger_login',      //指纹登录
    name: 'finger_login',   
    component: () => import('@/components/fingerprint/finger_login')
  },
  {   
    path: '/gesture_login',      //手势验证
    name: 'gesture_login',   
    component: () => import('@/components/gesture_login')
  },
  {   
    path: '/firstScreenLoad',      //首屏加载图
    name: 'firstScreenLoad',   
    component: () => import('@/components/firstScreenLoad')
  },
  // 设置身份
  {
    path: '/identity',
    name: 'identity',
    component: () => import('@/views/authorityvalidate/identity'),
  },
  // 添加币种
  {
    path: '/addToken',
    name: 'addToken',
    meta: { headline: '添加币种' },
    component: () => import('@/views/authorityvalidate/addToken'),
  },
  //首页 
  {
    path: '/fast_token',
    name: 'fast_token',
    meta: { headline: '一键发币' },
    component: () => import('@/views/chaincloud/fast_token')
  },
  {
    path: '/noticeInfo',
    name: 'noticeInfo',
    meta: { headline: '公告' },
    component: () => import('@/views/chaincloud/noticeInfo')
  },
  {
    path: '/noticeDetai',
    name: 'noticeDetai',
    meta: { headline: '公告详情' },
    component: () => import('@/views/chaincloud/component/noticeDetai')
  },
  //行情
  {
    path: '/quotation',
    name: 'quotation',
    component: () => import('@/views/chainworld/quotation')
  },
  {
    path: '/information_info',
    name: 'information_info',
    component: () => import('@/views/chainworld/information_info')
  },
  //钱包   
  {
    path: '/wallet_transfer',
    name: 'wallet_transfer',
    meta: { headline: '转账' },
    component: () => import('@/views/wallet/wallet_transfer')
  },
  {
    path: '/set_minerFee',
    name: 'set_minerFee',
    meta: { headline: '设置矿工费' },
    component: () => import('@/views/wallet/set_minerFee')
  },
  {
    path: '/wallet_collection',
    name: 'wallet_collection',
    meta: { headline: '收款' },
    component: () => import('@/views/wallet/wallet_collection')
  },
  {
    path: '/wallet_detail',
    name: 'wallet_detail',
    // meta:{keepAlive: true},
    meta: { headline: '交易纪录' },
    component: () => import('@/views/wallet/wallet_detail')
  },
  {
    path: '/transaction_detail',
    name: 'transaction_detail',
    meta: { headline: '详情' },
    // meta:{keepAlive: true},
    component: () => import('@/views/wallet/transaction_detail')
  },
  {
    path: '/scan',
    name: 'scan',
    component: () => import('@/components/scan')
  },
  {
    path: '/add_assets',
    name: 'add_assets',
    component: () => import('@/views/wallet/add_assets')
  },
  {   
    path: '/walletPassword',
    name: 'walletPassword',
    meta: { headline: '修改钱包密码' },
    component: () => import('@/views/walletmanage/walletdetail/walletPassword')
  },
  {   
    path: '/backupWord',
    name: 'backupWord',
    component: () => import('@/views/wallet/backup_word')
  },
  {   
    path: '/copy_word',
    name: 'copy_word',
    meta: { headline: '备份助记词' },
    component: () => import('@/views/wallet/backup_word/copy_word')
  },
  {   
    path: '/verification_word',
    name: 'verification_word',
    meta: { headline: '确认助记词' },
    component: () => import('@/views/wallet/backup_word/verification_word')
  },
  
  // 我的  
  {
    path: '/myOrder',
    name: 'myOrder',
    meta: { headline: '我的订单' },
    component: () => import('@/views/mycenter/myOrder/index'),
  },
  {
    path: '/orderInfo',
    name: 'orderInfo',
    meta: { headline: '订单详情' },
    component: () => import('@/views/mycenter/myOrder/orderInfo'),
  },
  {
    path: '/myFans',
    name: 'myFans',
    meta: { headline: '我的粉丝' },
    component: () => import('@/views/mycenter/myFans'),
  },
  {
    path: '/myBalance',
    name: 'myBalance',
    meta: { headline: '我的余额' },
    component: () => import('@/views/mycenter/myBalance'),
  },
  {
    path: '/deployed',
    name: 'deployed',
    meta: { headline: '已部署' },
    meta:{keepAlive: true},
    component: () => import('@/views/mycenter/myToken/deployed'),
  },
  {
    path: '/Burnable',
    name: 'Burnable',
    meta: { headline: '销毁' },
    component: () => import('@/views/mycenter/myToken/functions/Burnable'),
  },
  {
    path: '/Frozen',
    name: 'Frozen',
    meta: { headline: '冻结' },
    component: () => import('@/views/mycenter/myToken/functions/Frozen'),
  },
  {
    path: '/Increase',
    name: 'Increase',
    meta: { headline: '增发' },
    component: () => import('@/views/mycenter/myToken/functions/Increase'),
  },



  // 权限验证
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/authorityvalidate/login'),
  },
  // {
  //   path: '/register',
  //   name: 'register',
  //   component: () => import('@/views/authorityvalidate/register'),
  // },
  // {
  //   path: '/forgetpassword',
  //   name: 'forgetpassword',
  //   meta: {  requiresAuth: true },
  //   component: () => import('@/views/authorityvalidate/forgetpassword'),
  // },
  {
    path: '/linkreg',
    name: 'linkreg',
    meta: { requiresAuth: true },
    component: () => import('@/views/authorityvalidate/linkreg'),
  },
  {
    path: '/download',
    name: 'download',
    meta: { requiresAuth: true },
    component: () => import('@/views/authorityvalidate/download'),
  },
  //账号与安全
  {
    path: '/setaccount',
    name: 'setaccount',
    meta: { headline: '账号与安全' },
    component: () => import('@/views/mycenter/setperson/setaccount/setaccount'),
  },
  {
    path: '/setphone',
    name: 'setphone',
    meta: { headline: '验证原手机号', requiresAuth: true },
    component: () => import('@/views/mycenter/setperson/setaccount/setphone'),
  },
  {
    path: '/setphonenew',
    name: 'setphonenew',
    meta: { headline: '验证新手机号', requiresAuth: true },
    component: () => import('@/views/mycenter/setperson/setaccount/setphonenew'),
  },
  
  {
    path: '/revisepassword',
    name: 'revisepassword',
    meta: { headline: '修改密码', requiresAuth: true },
    component: () => import('@/views/mycenter/setperson/setaccount/revisepassword'),
  },
  {
    path: '/setname',
    name: 'setname',
    meta: {headline:'修改昵称'},
    component: () => import('@/views/mycenter/setperson/setaccount/setname')
  },
  {
    path: '/setsex',
    name: 'setsex',
    meta: {headline:'修改性别'},
    component: () => import('@/views/mycenter/setperson/setaccount/setsex')
  },
  {
    path: '/setpaypassword',
    name: 'setpaypassword',
    meta: {headline:'设置支付密码'},
    component: () => import('@/views/mycenter/setperson/setaccount/setpaypassword')
  },
  // 个人设置
  {
    path: '/setperson',
    name: 'setperson',
    meta: { headline: '个人设置' },
    component: () => import('../../views/mycenter/setperson/setperson'),
  },
  {
    path: '/aboutus',
    name: 'aboutus',
    meta: { headline: '关于我们' },
    component: () => import('@/views/mycenter/setperson/aboutus/aboutus'),
  },
  {
    path: '/companyprofile',
    name: 'companyprofile',
    meta: {headline: '公司简介'},
    component: () => import('@/views/mycenter/setperson/aboutus/companyprofile'),
  },
  {
    path: '/versionlog',
    name: 'versionlog',
    meta: {headline: '版本日志' },
    component: () => import('@/views/mycenter/setperson/aboutus/versionlog'),
  },
  {
    path: '/submitfeedback',
    name: 'submitfeedback',
    meta: { requiresAuth: true,headline: '意见&反馈' },
    component: () => import('@/views/mycenter/setperson/submitfeedback'),
  },
  {
    path: '/setlanguage',
    name: 'setlanguage',
    meta: {headline:'选择语言'},
    component: () => import('@/views/mycenter/setperson/setlanguage/index')
  },
  {
    path: '/sharefriend',
    name: 'sharefriend',
    meta: { requiresAuth: true },
    component: () => import('@/views/mycenter/sharefriend/index'),
  },

  {
    path: '/myaddress',
    name: 'myaddress',
    meta: {headline:'地址本',requiresAuth: true},
    component: () => import('@/views/mycenter/addressbook/myaddress')
  },
  {
    path: '/myaddressnew',
    name: 'myaddressnew',
    meta: {headline:'新建地址'},
    component: () => import('@/views/mycenter/addressbook/myaddressnew')
  },
  {
    path: '/revisemyaddress',
    name: 'revisemyaddress',
    meta: {headline:'修改地址'},
    component: () => import('@/views/mycenter/addressbook/revisemyaddress')
  },
  {
    path: '/custom_wallet',
    name: 'custom_wallet',
    component: () => import('@/views/chaincloud/custom_wallet'),
  },
  {   //创建钱包
    path: '/create_wallet',
    name: 'create_wallet',
    component: () => import('@/views/mycenter/wallet_management/create_wallet'),
  },
  {  //导入钱包
    path: '/import_wallet',
    name: 'import_wallet',
    meta: {headline:'导入钱包'},
    component: () => import('@/views/mycenter/wallet_management/import_wallet'),
  },
  {
    path: '/coinMaking',
    name: 'coinMaking',
    component: () => import('@/views/chaincloud/coinMaking'),
  },
  {
    path: '/walletmanage',
    name: 'walletmanage',
    meta:{headline:'钱包管理'},
    component: () => import('@/views/walletmanage/index'),
  },
  {
    path: '/walletdetail',
    name: 'walletdetail',
    meta: {headline:'管理'},
    component: () => import('@/views/walletmanage/walletdetail/index'),
  },
  {
    path: '/mywalletaddress',
    name: 'mywalletaddress',
    meta: {headline:'钱包地址'},
    component: () => import('@/views/walletmanage/walletdetail/mywalletaddress/index'),
  },
  //myToken
  {
    path: '/myToken',
    name: 'myToken',

    component: () => import('@/views/mycenter/myToken/index'),
  },
  {
    path: '/myDAPP',
    name: 'myDAPP',
    meta: {headline:'我的DAPP'},
    component: () => import('@/views/mycenter/myDAPP/index'),
  },
  {
    path: '/backupprompt',
    name: 'backupprompt',
    // meta: {headline:'钱包地址'},
    component: () => import('@/views/walletmanage/walletdetail/backupprompt/index'),
  },
  {
    path: '/exportprivatekey',
    name: 'exportprivatekey',
    meta: {headline:'导出私钥'},
    component: () => import('@/views/walletmanage/walletdetail/exportprivatekey/index'),
  },
  {
    path: '/backupmnemonic',
    name: 'backupmnemonic',
    // meta: {headline:'导出私钥'},
    component: () => import('@/views/walletmanage/walletdetail/backupmnemonic/index'),
  },
  {
    path: '/suremnemonic',
    name: 'suremnemonic',
    // meta: {headline:'导出私钥'},
    component: () => import('@/views/walletmanage/walletdetail/suremnemonic/index'),
  },
  {
    path: '/freePayment',
    name: 'freePayment',
    meta: {headline:'免密支付'},
    component: () => import('@/views/walletmanage/walletdetail/freePayment/index'),
  },
  
  
]
export default routes

