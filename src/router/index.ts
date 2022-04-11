import { createRouter, createWebHashHistory } from "vue-router";
import basicLayout from "@/layout/basicLayout/index.vue"
import Login from '@/views/login.vue'

const constantRoutes = [
    {
        path:'/',
        component: basicLayout,
        redirect: 'web',
        children: [
            {
                path:'/web',
                component: ()=> import("@/views/home.vue")
            }
        ]
    },
    {
        path:'/login',
        component: Login
    },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes,
})

export default router