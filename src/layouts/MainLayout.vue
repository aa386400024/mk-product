<template>
    <!-- 将 el-header 移到最外层的 el-container 之前 -->
    <el-header>
        <Navbar />
    </el-header>

    <el-container class="outer-container">
        <!-- 使用封装的动态菜单组件 -->
        <el-aside width="200px">
            <el-scrollbar>
                <sidebar :menu-items="menuItems" />
            </el-scrollbar>
        </el-aside>

        <el-container>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
  
<script setup lang="ts">
import { RouterView } from 'vue-router';
import { Sidebar, Navbar, Footer } from '@/components/layout';

// 假设的菜单项数据，可以根据实际情况调整
const menuItems = [
    {
        title: '首页',
        path: '/',
        children: []
    },
    {
        title: '功能页面',
        path: '/',
        children: [
            {
                title: '获取数据',
                path: '/get-data',
                children: [] // 更多嵌套
            },
            {
                title: '删除数据',
                path: '/delete-data',
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
    // ...更多顶级菜单项
];
</script>
  
<style scoped lang="scss">
.el-header {
    position: fixed; // 设置为固定定位
    top: 0; // 定位到屏幕顶部
    left: 0; // 定位到屏幕左边
    width: 100%; // 占满整个屏幕宽度
    height: 50px;
    z-index: 1000; // 确保 header 在其他内容之上
    padding: 0;
    background: #2f54eb;
}

.outer-container {
    padding-top: 50px;
}
</style>
  