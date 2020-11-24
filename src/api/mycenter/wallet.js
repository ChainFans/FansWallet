import { get, post } from './../api'
import qs from "querystring"


export const add_token= (params) => post('/v1/wallet/add-token',qs.stringify(params)) //添加资产

// export const importWallet= (params) => post('/v1/wallet/import',qs.stringify(params)) //导入钱包

export const get_hotList= (params) => get('/v1/wallet/token/list-hot',params)  //热门货币

export const get_searchToken= (params) => get('/v1/wallet/token/list',params)  //搜索货币

export const get_walletData= (params) => get('/v1/wallet/list',params)  //获取代币数据

export const get_chainInfo= (params) => get('/v1/chain/info',params)  //获取公链详情

