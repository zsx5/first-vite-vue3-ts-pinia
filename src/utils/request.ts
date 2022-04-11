import axios from 'axios';
import { terrace } from "@/config/index"
import { usePermissionStore } from "@/store/modules/permission"

//创建一个新的实例以实现自定义配置
const instance = axios.create({
    baseURL: '',
    timeout: 30000,
});

//请求拦截
instance.interceptors.request.use(function (config) {
    if (!config.headers || !Object.keys(config.headers).length) {
        config.headers = {};
    }
    const { token, projectId, spaceId, userType } = usePermissionStore();//不能写成全局的
    config.headers.terrace = terrace;
    if (token) {
        config.headers.token = token;
    }

    if (projectId) {
        config.headers.projectId = projectId;
    }

    if (spaceId) {
        config.headers.spaceId = spaceId;
    }

    if (userType) {
        config.headers.userType = userType;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

//响应拦截
instance.interceptors.response.use(function (response) {
    let response_new = formateInterFaceState(response);
    return response_new;
}, function (error) {
    return Promise.reject(error);
});

//统一各平台接口返回的状态码的名称 retcode
export function formateInterFaceState(response) {
    let data = {
        data: response.data.data || '',
        msg: response.data.msg || response.data.message || '',
        retcode: response.data.retcode || response.data.code || response.data.status || 0,
    }
    return data
}

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