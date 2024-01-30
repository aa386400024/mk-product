import { useUserStore } from '@/stores/user-store' // 导入用户 store
import { usePermissionStore } from '@/stores/permission-store' // 导入权限 store
import router from '@/router'

// 白名单路由，无需登录即可访问
const whiteList = ['/auth/login']

// 路由全局前置守卫
router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore() // 使用用户 store
    const permissionStore = usePermissionStore() // 使用权限 store

    // 如果用户已经登录
    if (userStore.accessToken) {
        // 如果已登录但访问登录页面，则重定向到主页
        if (to.path === '/auth/login') {
            next({ path: '/' })
        } else {
            // 检查用户是否有角色信息
            if (userStore.userinfo?.roles && userStore.userinfo?.roles.length > 0) {
                // 如果有角色信息且即将访问的路由不存在，则重定向到404页面
                if (to.matched.length === 0) {
                    from.name ? next({ name: from.name }) : next('/NotFound404')
                } else {
                    // 如果路由存在，则正常导航
                    next()
                }
            } else {
                // 如果没有角色信息，则尝试获取用户信息
                try {
                    const userInfo = await userStore.getUserInfo()
                    if (userInfo !== null) {
                        const { roles } = userInfo
                        await permissionStore.generateRoutes(roles)
                        next({ ...to, replace: true })
                    } else {
                        // 获取用户信息失败，重置 token 并重定向到登录页面
                        await userStore.resetToken()
                        next(`/auth/login?redirect=${to.path}`)
                    }
                } catch (error) {
                    // 获取用户信息失败，重置 token 并重定向到登录页面
                    await userStore.resetToken()
                    next(`/auth/login?redirect=${to.path}`)
                }
            }
        }
    } else {
        // 如果用户未登录
        // 检查即将访问的路由是否在白名单内
        if (whiteList.includes(to.path)) {
            next() // 在白名单内直接放行
        } else {
            // 不在白名单内，重定向到登录页面
            next(`/auth/login?redirect=${to.path}`)
        }
    }
})

// 路由全局后置守卫
router.afterEach(() => {
    // 这里可以添加一些全局的路由导航后置处理逻辑
    // 比如关闭进度条、页面标题设置等
})
