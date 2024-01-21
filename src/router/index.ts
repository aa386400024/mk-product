import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/userStore'; // 导入 userStore

// 主布局和视图
import MainLayout from '../layouts/MainLayout.vue'; // 主布局组件
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';

// 身份验证布局和视图
import AuthLayout from '../views/auth/AuthLayout.vue';
import LoginView from "../views/auth/LoginView.vue";
import RegisterView from "../views/auth/RegisterView.vue";
import ForgotPasswordView from "../views/auth/ForgotPasswordView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: MainLayout, // 使用主布局
            children: [
                { path: '', name: 'home', component: HomeView },
                { path: 'about', name: 'about', component: AboutView },
            ],
        },
        {
            path: '/auth',
            component: AuthLayout,
            children: [
                { path: 'login', name: 'login', component: LoginView },
                { path: 'register', name: 'register', component: RegisterView },
                { path: 'forgot-password', name: 'forgot-password', component: ForgotPasswordView },
            ],
        },
        // 可以添加更多路由规则
    ],
});

export default router;
