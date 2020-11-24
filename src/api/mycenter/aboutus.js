import { get, post } from '../api'
import qs from "querystring";
// 获取关于我们信息
export const getaboutus= () => get('/v1/sys/about-us')
// 获取版本历史
export const getVersionhistory = (params) => get('/v1/version/app/list',params)
// 提交反馈
export const Submitfeedback  = (params) => post('/v1/sys/bug/submit',qs.stringify(params))
// 获取最新版本
export const getlatestversion = () => get('/v1/version/app?appType=0')