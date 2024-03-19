<template>
    <el-container class="outer-container">
        <el-header>
            <Header />
        </el-header>

        <el-container>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import { Header } from '@/components/layout';

const menuItems = ref([
    {
        title: '首页',
        path: '/',
        children: []
    },
    {
        title: '其他页面',
        path: '/some-other-page',
        children: [
            {
                title: '子页面1',
                path: '/about',
                children: [] // 更多嵌套
            },
            // ...更多子页面
        ]
    },
    {
        title: '其他页面2',
        path: '/about',
        children: []
    },
]);
</script>

<style scoped lang="scss">
.el-aside {
    width: 240px;
    position: relative;
}
.el-main {
    padding: 20px;
}

.el-scrollbar {
    position: absolute;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 72px;
    height: 100%;
}
:deep(.el-header) {
    --el-header-padding: 0 !important;
}
</style>
  