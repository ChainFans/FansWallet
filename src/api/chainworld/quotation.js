import { get, post } from './../api'
import qs from "querystring"

export const get_quotationList= (params) => get('/v1/market/coin-list',params)