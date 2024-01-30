import { defineStore } from 'pinia'
import router from '@/router'


// 定义用户信息接口
interface UserInfo {
    username: string
    // 可以添加更多用户信息字段，如email, avatar等
}

// 定义状态接口
interface UserState {
    isLoggedIn: boolean
    userinfo: UserInfo | null // userinfo现在是一个对象或者null
    accessToken: string | null
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        isLoggedIn: false,
        userinfo: null, // 初始状态为null
        accessToken: null // 初始状态为null
    }),
    persist: {
        enabled: true,
        storage: window.localStorage
    },
    actions: {
        login() {
            // 实现登录逻辑
            this.isLoggedIn = true
            this.accessToken = 'your-token' // 假设这是你的token

            // 假设这是从后端获取的用户信息
            const userInfoFromApi = {
                username: 'admin'
                // 其他字段...
            }
            this.userinfo = userInfoFromApi // 设置用户信息
            router.push({ name: 'home' })
        },

        getUserInfo() {
            // 返回用户信息
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
                await logoutApi(); // 调用登出 API
                this.resetToken(); // 清除认证状态
                router.push({ name: 'login' }); // 重定向到登录页面
            } catch (error) {
                console.error('Logout failed:', error);
                // 处理登出失败的情况
            }
        },
    }
})
