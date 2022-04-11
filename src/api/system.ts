
import request from "@/utils/request.ts"
import { iotApi, workOderPrefix } from "@/config/index"

export function dictionaryList() {
    return request.post(workOderPrefix + "/system/dictionaryCategory/list", null, {'Content-Type':'application/x-www-form-urlencoded'});
}