
import { useUserStore } from '@/stores/userStore';

export function setupRouterGuard(router) {
    router.beforeEach((to, from, next) => {
        const hasToken = localStorage.getItem('accessToken');

        if (to.path !== '/auth/login' && !hasToken) {
            next('/auth/login');
        } else {
            if (to.path !== '/auth/login') {
                // 确保在这里调用 useUserStore，这样只有在应用实例化之后才会执行
                const userStore = useUserStore();
                if (!userStore.isLoggedIn) {
                    next('/auth/login');
                } else {
                    next();
                }
            } else {
                next();
            }
        }
    });
}
