import { useUserStore } from '@/stores/userStore' // 假设这是您的用户 store
import { usePermissionStore } from '@/stores/permissionStore' // 假设这是您的权限 store
import router from '@/router'
import 'nprogress/nprogress.css'

// 白名单路由
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    const permissionStore = usePermissionStore()

    if (userStore.accessToken) {
        // 使用 Pinia store 中的令牌
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            if (userStore.user.roles && userStore.user.roles.length > 0) {
                // 有角色信息
                if (to.matched.length === 0) {
                    from.name ? next({ name: from.name }) : next('/404')
                } else {
                    next()
                }
            } else {
                try {
                    const { roles } = await userStore.getUserInfo() // 获取用户信息
                    const accessRoutes = await permissionStore.generateRoutes(roles) // 生成基于角色的路由
                    accessRoutes.forEach((route) => router.addRoute(route))
                    next({ ...to, replace: true })
                } catch (error) {
                    // 错误处理：重置令牌并跳转到登录页
                    await userStore.resetToken()
                    next(`/login?redirect=${to.path}`)
                }
            }
        }
    } else {
        // 未登录
        if (whiteList.includes(to.path)) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }
    }
})

router.afterEach(() => {
    
})
