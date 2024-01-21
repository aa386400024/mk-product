// src/stores/userStore.js
import { defineStore } from 'pinia';
import router from '@/router';

export const useUserStore = defineStore('user', {
    state: () => ({
        isLoggedIn: false
    }),
    actions: {
        login() {
            // 实现登录逻辑，例如设置 isLoggedIn 为 true
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
