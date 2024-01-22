// src/stores/userStore.ts
import { defineStore } from 'pinia';
import router from '@/router';

// 定义状态接口
interface UserState {
    isLoggedIn: boolean;
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        isLoggedIn: false
    }),
    actions: {
        login() {
            // 实现登录逻辑
            this.isLoggedIn = true;
            localStorage.setItem('accessToken', 'your-token'); // 存储 token
            router.push({ name: 'home' });
        },
        logout() {
            // 实现登出逻辑
            this.isLoggedIn = false;
            localStorage.removeItem('accessToken'); // 移除 token
            router.push({ name: 'login' });
        }
    }
});
