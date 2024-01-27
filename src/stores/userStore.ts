// src/stores/userStore.ts
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
}

// 定义模拟账号列表
const mockAccounts = ['user1', 'user2', 'user3'];

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        isLoggedIn: false,
        userinfo: null // 初始状态为null
    }),
    persist: {
        enabled: true,
        // 可以配置持久化的方式，如localStorage或sessionStorage
        storage: window.localStorage
    },
    actions: {
        login() {
            // 实现登录逻辑
            this.isLoggedIn = true
            const token = 'your-token' // 假设这是你的token
            localStorage.setItem('accessToken', token) // 存储token
            // 假设这是从后端获取的用户信息
            const userInfoFromApi = {
                username: 'admin'
                // 其他字段...
            }
            localStorage.setItem('userinfo', JSON.stringify(userInfoFromApi)) // 存储用户信息
            this.userinfo = userInfoFromApi // 设置用户信息
            router.push({ name: 'home' })
        },

        getUserinfo() {
            // 从本地存储获取用户信息
            const storedUserInfo = localStorage.getItem('userinfo')
            if (storedUserInfo) {
                this.userinfo = JSON.parse(storedUserInfo)
            }
            return this.userinfo // 返回用户信息
        },

        logout() {
            // 实现登出逻辑
            this.isLoggedIn = false
            localStorage.removeItem('accessToken') // 移除token
            localStorage.removeItem('userinfo') // 移除用户信息
            this.userinfo = null // 重置用户信息
            router.push({ name: 'login' })
        }
    }
})
