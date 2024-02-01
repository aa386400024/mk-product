import { defineStore } from 'pinia';
import type { RouteRecordRaw } from 'vue-router';
import { constantRoutes, addAsyncRoutes } from '@/router';
import { fetchRouterList } from '@/api/router/list';

const modules = import.meta.glob('../views/**/**.vue');
const Layout = () => import('@/layouts/MainLayout.vue');
// 判断是否有权限
const hasPermission = (roles: string[], route: RouteRecordRaw) => {
    if (route.meta && route.meta.roles) {
        if (roles.includes("ROOT")) {
            return true;
        }
        // 确保 roles 是一个字符串数组
        const routeRoles = route.meta.roles as string[];
        return roles.some(role => routeRoles.includes(role));
    }
    return true;
};


// 过滤异步路由
const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
    const asyncRoutes: RouteRecordRaw[] = [];

    routes.forEach(route => {
        console.log(route, 'route')
        const tmpRoute = { ...route };
        if (!route.name) {
            tmpRoute.name = route.path;
        }
        if (hasPermission(roles, tmpRoute)) {
            console.log(tmpRoute, 'tmpRoute')
            if (tmpRoute.component?.toString() === 'MainLayout') {
                tmpRoute.component = Layout;
            } else {
                const component = modules[`../views/${tmpRoute.component}.vue`];
                console.log(component, 'component')
                if (component) {
                    tmpRoute.component = component;
                } else {
                    tmpRoute.component = modules['../views/error-page/NotFound404.vue'];
                }
            }

            if (tmpRoute.children) {
                tmpRoute.children = filterAsyncRoutes(tmpRoute.children, roles);
            }

            asyncRoutes.push(tmpRoute);
        }
    });

    return asyncRoutes;
}

export const usePermissionStore = defineStore({
    id: 'permission',
    persist: true,
    state: () => ({
        routes: constantRoutes,
        mixLeftMenu: []
    }),
    actions: {
        setRoutes(newRoutes: RouteRecordRaw[]) {
            this.routes = constantRoutes.concat(newRoutes);
            addAsyncRoutes(newRoutes); // 动态添加路由
        },
        async generateRoutes(roles: string[]) {
            try {
                const { data: asyncRoutes } = await fetchRouterList({});
                // const asyncRoutes = [
                //     {
                //         path: '/',
                //         component: 'MainLayout', // 由于这是硬编码数据，我们只能用字符串来表示组件
                //         children: [
                //             { path: '', name: 'home', component: 'HomeView' },
                //             { path: 'about', name: 'about', component: 'AboutView' }
                //         ]
                //     }
                //     // 可以根据需要添加更多路由
                // ];
                
                const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
                this.setRoutes(accessedRoutes);
                return accessedRoutes;
            } catch (error) {
                // 在这里处理错误
                // 例如，记录错误或显示错误消息
                console.error("Error generating routes:", error);
                // 可以根据需要抛出错误或返回默认值
                throw error; // 或者 return [];
            }
        }
    }
});