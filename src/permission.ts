
import { useUserStore } from '@/stores/userStore';

export function setupRouterGuard(router) {
    router.beforeEach((to, from, next) => {
        const userStore = useUserStore();
        const hasToken = localStorage.getItem('accessToken');

        if (!userStore.isLoggedIn && !hasToken && to.path !== '/auth/login') {
            next('/auth/login');
        } else {
            next();
        }
    });
}
 