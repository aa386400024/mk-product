import { useUserStore } from '@/stores/user-store' // 导入用户 store
import { usePermissionStore } from '@/stores/permission-store' // 导入权限 store
import router from '@/router'

// 白名单路由，无需登录即可访问
const whiteList = ['/auth/login']
// 定义子应用的路由前缀
const subAppRoutes = ['/app1', '/app2']; // 假设您有两个子应用

router.beforeEach(async (to, from, next) => {
    // 检查当前路由是否属于任何子应用
    const isSubAppRoute = subAppRoutes.some(prefix => to.path.startsWith(prefix));
    if (isSubAppRoute) {
        // 如果是子应用路由，直接放行
        return next();
    }

    const userStore = useUserStore();
    const permissionStore = usePermissionStore();

    if (userStore.accessToken) {
        if (to.path === '/auth/login') {
            next({ path: '/' });
        } else {
            if (userStore.userinfo?.roles && userStore.userinfo.roles.length > 0) {
                if (to.matched.length === 0) {
                    from.name ? next({ name: from.name }) : next('/NotFound404');
                } else {
                    next();
                }
            } else {
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
                    await userStore.resetToken();
                    next(`/auth/login?redirect=${to.path}`);
                }
            }
        }
    } else {
        if (whiteList.includes(to.path)) {
            next();
        } else {
            next(`/auth/login?redirect=${to.path}`);
        }
    }
});

// 路由全局后置守卫
router.afterEach(() => {
    // 这里可以添加一些全局的路由导航后置处理逻辑
    // 比如关闭进度条、页面标题设置等
})
