import { createRouter, createWebHashHistory } from "vue-router";
import Login from '@/views/login.vue'

const constantRoutes = [
    {
        path:'/',
        redirect: '/login',
        component:()=> import('@/views/home.vue')
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