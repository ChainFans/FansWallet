import { get, post } from './../api'
import qs from "querystring"

export const get_fastNewsList= (params) => get('/v1/news/flash/list',params)

export const isNewslike  = (params) => post('/v1/news/flash/like',qs.stringify(params))