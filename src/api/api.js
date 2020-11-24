import axios from 'axios'
import { Toast } from 'vant';
const request = axios.create({   
    //创建axios实例，在这里可以设置请求的默认配置
    timeout: 200000,
    // baseURL: process.env.NODE_ENV === 'production' ? '' : '/api',   
    //根据自己配置的反向代理去设置不同环境的baeUrl

    //测试接口
    // baseURL: 'https://api.fanswallet.chainfans.io',

    // 线上接口
    baseURL: 'https://api.fanswallet.chainfans.cloud',

})
request.defaults.headers.get['Content-Type'] = 'application/json';
request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
request.interceptors.request.use(config => {


    return config
},
    err => {
        return Promise.reject(err)
    })
request.interceptors.response.use(response => {
    // Toast.clear();
    return response.data
},
    error => {
        if (error.response) {

        }
        return Promise.reject(error)
    })

/* 统一封装get请求 */
export const get = (url, params, config = {}) => {
    return new Promise((resolve, reject) => {
        request({
            method: 'get',
            url,
            params,
            ...config
        }).then(response => {
            // alert(response)
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}

/* 统一封装post请求  */
export const post = (url, data, config = {}) => {
    return new Promise((resolve, reject) => {
        request({
            method: 'post',
            url,
            data,
            ...config
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}