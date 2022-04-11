import request from "@/utils/request.ts"
import { iotApi, workOderPrefix } from "@/config/index"


export function ssoLogin(data: {mobile: string; pwssword: string; loginType: number }) {
    return request.post(iotApi + "/api/v1/auth/login", data);
}

export function getSpaceList() {
    return request.get(workOderPrefix + "/ym/v2/project/list", null, { 'Content-Type':'application/x-www-form-urlencoded'} );
}