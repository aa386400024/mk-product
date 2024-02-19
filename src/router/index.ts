import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 主布局和视图
import MainLayout from '../layouts/MainLayout.vue'; // 主布局组件
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';

// 身份验证布局和视图
import AuthLayout from '../views/auth/AuthLayout.vue'
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import ForgotPasswordView from '../views/auth/ForgotPasswordView.vue'

export const constantRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        component: MainLayout, // 使用主布局
        children: [
            { path: '', name: 'home', component: HomeView },
        ]
    },
    {
        path: '/auth',
        component: AuthLayout,
        children: [
            { path: 'login', name: 'login', component: LoginView },
            { path: 'register', name: 'register', component: RegisterView },
            { path: 'forgot-password', name: 'forgot-password', component: ForgotPasswordView }
        ]
    },
    {
        path: '/app1/*', // 为app1子应用预留的路由
        component: () => import('@/components/micro-frontend/MicroAppContainer.vue')
    },
    // 可以添加更多路由规则
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: constantRoutes as RouteRecordRaw[]
})

// 动态添加路由的函数
export function addAsyncRoutes(routes: RouteRecordRaw[]) {
    routes.forEach((route) => {
        // 确保 route.name 存在且不是已有的路由
        if (route.name && !router.hasRoute(route.name)) {
            router.addRoute(route)
        }
    })
}

export default router
