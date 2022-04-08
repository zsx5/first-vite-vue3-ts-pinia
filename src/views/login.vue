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
                <a-input v-model:value="formState.mobile" placeholder="请输入手机号" />
            </a-form-item>

            <a-form-item name="password" :rules="[{ required: true, message: '请输入密码' }]">
                <a-input-password v-model:value="formState.password" placeholder="请输入密码" />
            </a-form-item>

            <a-form-item>
                <a-button class="btn" type="primary" html-type="submit">登录</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { ssoLogin } from "@/api/user"
import { usePermissionStore } from "@/store/modules/permission"
import { useRouter} from 'vue-router'
import md5 from "js-md5";

interface ILoginForm {
    mobile: string,
    password: string,
}

const { setToken }  = usePermissionStore();
console.log('usePermissionStore()', usePermissionStore())

const formState: ILoginForm = reactive({
    mobile: '',
    password: '',
})

const router = useRouter();

const onFinish = values => {
    console.log('Success:', values);
    let params = {
        mobile: formState.mobile,
        password: md5(formState.password),
        loginType: 0
    }
    ssoLogin(params).then(res => {
        console.log(res)
        let token = res.token.token;
        setToken(token);
        sessionStorage.setItem("token", JSON.stringify(token))
        router.push('/');
    }).catch((e) => {
        console.log(e);
    })
};

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};
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
