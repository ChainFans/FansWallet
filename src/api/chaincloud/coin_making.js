import { get, post } from './../api'
import qs from "querystring"

export const app_version = () => get('/v1/version/app?appType=0')