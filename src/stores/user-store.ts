import { defineStore } from 'pinia';
import router from '@/router';
import { logout } from "@/api/auth/login";
// 定义用户信息接口
interface UserInfo {
    username: string
    roles: string[];
}

// 定义状态接口
interface UserState {
    isLoggedIn: boolean
    userinfo: UserInfo | null // userinfo现在是一个对象或者null
    accessToken: string | null
}

// 模拟的用户数据
const mockUsers = [
    { username: 'xy1', password: 'xy@142536..$', roles: ['user'] },
    { username: 'xy2', password: 'xy@142536..$', roles: ['user'] },
    { username: 'xy3', password: 'xy@142536..$', roles: ['user'] },
    { username: 'xy4', password: 'xy@142536..$', roles: ['user'] },
    { username: 'xy5', password: 'xy@142536..$', roles: ['user'] },
    { username: 'xyadmin', password: 'xy@147258_@$&', roles: ['user'] },
];

export const useUserStore = defineStore('user', {
    persist: true,
    state: (): UserState => ({
        isLoggedIn: false,
        userinfo: null, // 初始状态为null
        accessToken: null // 初始状态为null
    }),
    actions: {
        login(username: string, password: string) {
            const user = mockUsers.find(u => u.username === username && u.password === password);
            if (user) {
                // 用户认证成功
                this.isLoggedIn = true;
                this.userinfo = { username: user.username, roles: user.roles };
                this.accessToken = 'mock-token'; // 模拟 token
                router.push({ name: 'home' });
            } else {
                // 用户认证失败
                throw new Error('登录失败，请检查您的用户名和密码。');
            }
        },

        getUserInfo() {
            // 假设这是从后端获取的用户信息
            const userInfoFromApi = {
                username: 'admin',
                roles: ['admin', 'editor']
            }
            this.userinfo = userInfoFromApi // 设置用户信息
            return this.userinfo
        },

        resetToken() {
            this.accessToken = null;
            this.userinfo = null;
            this.isLoggedIn = false;
        },

        // logout 方法：清理认证信息并处理登出相关逻辑
        async logout() {
            try {
                // await logout({}); // 调用登出 API
                this.resetToken(); // 清除认证状态
                router.push({ name: 'login' }); // 重定向到登录页面
            } catch (error) {
                console.error('Logout failed:', error);
                // 处理登出失败的情况
            }
        },
    }
})
