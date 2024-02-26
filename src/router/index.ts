import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 主布局和视图
const MainLayout = () => import('../layouts/MainLayout.vue'); // 主布局组件
const HomeView = () => import('../views/HomeView.vue');
const AboutView = () => import('../views/AboutView.vue');

// 身份验证布局和视图
const AuthLayout = () => import('../views/auth/AuthLayout.vue');
const LoginView = () => import('../views/auth/LoginView.vue');
const RegisterView = () => import('../views/auth/RegisterView.vue');
const ForgotPasswordView = () => import('../views/auth/ForgotPasswordView.vue');

const ChatView = () => import('../views/chat/ChatView.vue');
const KnowledgeBase = () => import('../views/knowledge-base/index.vue');


export const constantRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        component: MainLayout, // 使用主布局
        children: [
            { path: '', name: 'home', component: HomeView },
            { path: 'chat', name: 'chat', component: ChatView },
            { path: 'knowledge-base', name: 'knowledgeBase', component: KnowledgeBase },
            { path: 'about', name: 'about', component: AboutView }
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
