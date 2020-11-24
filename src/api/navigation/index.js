import { get, post } from './../api'
import qs from "querystring"

export const get_dappList = () => get('/v1/wallet/dapp/list')