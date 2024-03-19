<template>
    <div class="header">
        <div class="title">应用</div>
        <div class="navbar">
            <Navbar :navItems="navItems" @navigate="handleNavigate" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import type { Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Navbar from './Navbar.vue';

const navItems: Ref<NavItem[]> = ref([
    // 这里定义你的导航数据
    { label: '首页', children: [{ label: '欢迎页', route: '/welcome' }] },
    { label: '关于', children: [{ label: '公司简介', route: '/about' }] },
    {
        label: '产品',
        children: [
            { label: '产品1', route: '/product1' },
            { label: '产品2', route: '/product2' }
        ],
    },
    {
        label: '产品2',
        children: [
            { label: '产品1', route: '/product1' },
            { label: '产品2', route: '/product2' }
        ],
    },
]);

const router = useRouter();

const handleNavigate = (route: string) => {
    router.push(route);
};
</script>

<style scoped lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    margin: auto 40px;
}
.title {
    font-size: $spacing-md;
}

.navbar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
</style>