import axios from 'axios';
import { terrace } from "@/config/index"

//创建一个新的实例以实现自定义配置
const instance = axios.create({
    baseURL: '',
    timeout: 1000,
});

//请求拦截
instance.interceptors.request.use(function (config) {
    if(config.headers){
        config.headers.terrace = terrace
    } else {
        config.headers = {};
        config.headers.terrace = terrace
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

//响应拦截
instance.interceptors.response.use(function (response) {
    return response?.data?.data;
}, function (error) {
    return Promise.reject(error);
});

const http = {
    get: (url, params, headers) => {
        return instance.request({
            url: url,
            method: 'get',
            data: params,
            headers: { ...headers }
        })
    },
    post: (url, params, headers) => {
        return instance.request({
            url: url,
            method: 'post',
            data: params,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            }
        })
    },
}

export default http