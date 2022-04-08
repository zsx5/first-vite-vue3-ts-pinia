import { defineStore } from 'pinia'
export const usePermissionStore = defineStore('permission', {
    state: () => {
        return {
            token: '',
        }
    },
    getters: {

    },
    actions: {
        setToken(token: string){
            this.token = token;
        }
    }
})