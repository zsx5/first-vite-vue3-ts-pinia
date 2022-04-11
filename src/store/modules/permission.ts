import { defineStore } from 'pinia'

interface IspaceItem {
    projectId: string;
    spaceId: string
}

export const usePermissionStore = defineStore('permission', {
    state: () => {
        return {
            token: '',
            spaceList: [],
            projectId: '',
            tenantId: '',
            spaceId: '',
            userType: ''
        }
    },
    getters: {

    },
    actions: {
        setToken(token: string) {
            this.token = token;
        },
        setSpaceList(spaceList: IspaceItem) {
            this.spaceList = spaceList;
        },
        setProjectId(projectId) {
            this.projectId = projectId;
        },
        setTenantId(tenantId) {
            this.tenantId = tenantId;
        },
        setSpaceId(spaceId) {
            this.spaceId = spaceId;
        },
        setUserType(userType) {
            this.userType = userType;
        }

    }
})