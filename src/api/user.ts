import request from "@/utils/request.ts"

export function ssoLogin(data) {
    return request.post('https://dev-api.yunmaolink.com' + "/api/v1/auth/login", data);
}