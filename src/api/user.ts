import request from "@/utils/request.ts"
import { iotApi, workOderPrefix } from "@/config/index"


export function ssoLogin(data) {
    return request.post(iotApi + "/api/v1/auth/login", data);
}