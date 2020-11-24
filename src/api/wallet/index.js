import { get, post } from '../api'
import qs from "querystring";
// 广播交易
export const transaction = (params) => get('/v1/wallet/ethereum/SendRawTransaction',params)
// 获取gasPrice
export const get_ethMinerInfo = (params) => get('/v1/wallet/ethereum/transfer-code',params)
// 获取nonce
export const next_nonce = (params) => get('/v1/wallet/ethereum/next-nonce',params)
// 获取ETH交易记录
export const get_transferList = (params) => get('/v1/wallet/ethereum/transfer/list',params)
// 获取ERC20交易记录
export const get_transferList_erc20 = (params) => get('/v1/wallet/ethereum/transfer/list-erc20',params)
// 获取交易记录
export const get_transferInfo = (params) => get('/v1/wallet/ethereum/transfer/info',params)
// 获取交易详情
export const get_transferReceipt = (params) => get('/v1/wallet/ethereum/transfer/info',params)
// 获取ERC20交易详情
export const get_transferReceipt_erc20 = (params) => get('/v1/wallet/ethereum/transfer/info-erc20',params)
// 创建钱包
export const created_wallet = (params) => post('/v1/wallet/create',qs.stringify(params))
 //获取公链详情
export const get_chainInfo= (params) => get('/v1/chain/info',params) 