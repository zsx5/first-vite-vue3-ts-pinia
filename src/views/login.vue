<template>
    <div class="form-box">
        <div class="font-size-26 font-weight-bold m-b-40">用户登录</div>
        <a-form
            :model="formState"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
        >
            <a-form-item name="mobile" :rules="[{ required: true, message: '请输入手机号' }]">
                <a-input v-model:value="formState.mobile" autocomplete="off" placeholder="请输入手机号" />
            </a-form-item>

            <a-form-item name="password" :rules="[{ required: true, message: '请输入密码' }]">
                <a-input-password
                    v-model:value="formState.password"
                    autocomplete="off"
                    placeholder="请输入密码"
                />
            </a-form-item>

            <a-form-item>
                <a-button class="btn" type="primary" html-type="submit">登录</a-button>
            </a-form-item>
        </a-form>
    </div>
    <a-modal v-model:visible="visible" title="选择空间">
        <a-select
            ref="select"
            v-model:value="projectId"
            style="width: 80%"
            @change="handleChange"
            :getPopupContainer="triggerNode => triggerNode.parentNode"
            :options="spaceOptions"
        ></a-select>
        <template #footer>
            <a-button key="cancel" @click="visible = false">取消</a-button>
            <a-button key="confirm" type="primary" @click="handleOk">确认</a-button>
        </template>
    </a-modal>
</template>
<script setup lang="ts">
import { reactive, ref, toRef } from 'vue'
import { ssoLogin, getSpaceList } from "@/api/auth"
import { dictionaryList } from "@/api/system"
import { usePermissionStore } from "@/store/modules/permission"
import { useSystemStore } from "@/store/modules/system"
import { useRouter } from 'vue-router'
import { USER_TYPE_CUSTOMER } from '@/config'
import md5 from "js-md5";
import type { SelectProps } from 'ant-design-vue';

interface ILoginForm {
    mobile: string,
    password: string,
}
const formState: ILoginForm = reactive({
    mobile: '18523303635',
    password: 'zs123456',
})

const onFinish = values => {
    console.log('Success:', values);
    let params = {
        mobile: formState.mobile,
        password: md5(formState.password),
        loginType: 0
    }
    ssoLogin(params).then(res => {
        console.log(res)
        let token = res?.data?.token.token;
        const { setToken, setUserType } = usePermissionStore();
        setToken(token);
        setUserType(USER_TYPE_CUSTOMER)
        getSpace();
    }).catch((e) => {
        console.log(e);
    })
};

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};

const spaceOptions = ref<SelectProps['options']>([]);
const visible = ref(false);

function getSpace() {
    getSpaceList().then(res => {
        spaceOptions.value = res.data.map(item => {
            return {
                ...item,
                value: item.projectId,
                label: item.name
            }
        });
        visible.value = true;
        const { setSpaceList } = usePermissionStore();
        setSpaceList(res.data);
    })
}



const projectId = ref('');
function handleChange(val) {
    projectId.value = val;
    const { setProjectId } = usePermissionStore();
    setProjectId(val);
}


function handleOk() {
    let selectSpace = spaceOptions.value?.find(v => {
        return v.projectId === projectId.value;
    })
    if (selectSpace) {
        const { setSpaceId, setTenantId } = usePermissionStore();
        setSpaceId(selectSpace.spaceId);
        setTenantId(selectSpace.tenantId);
        getDictionary();
    }
}

let dictionary = [];
const router = useRouter();
function getDictionary() {
    dictionaryList().then(res => {
        console.log(res);
        dictionary = res.data;
        const { setDictionary } = useSystemStore();
        setDictionary(dictionary);
        router.push('/');
    }).catch(e => {
        console.log(e)
    })
}
</script>
<style lang="less" scoped>
.form-box {
    width: 400px;
    margin-left: 50%;
    padding-top: 50%;
    transform: translate(-50%, -50%);

    .btn {
        width: 100%;
    }
}
</style>
