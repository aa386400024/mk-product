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
        title: '轨迹管理',
        path: '/tracks-management',
        children: [
            {
                title: '添加轨迹',
                path: '/tracks-management/add-tracks',
                children: [] // 更多嵌套
            },
            {
                title: '模板导入',
                path: '/tracks-management/upload-tracks',
                children: [] // 更多嵌套
            },
            {
                title: '新元测试',
                path: '/tracks-management/mining-track-add',
                children: [] // 更多嵌套
            },
            {
                title: '删除轨迹',
                path: '/tracks-management/delete-tracks',
                children: [] // 更多嵌套
            },
            // ...更多子页面
        ]
    },
    {
        title: '考勤管理',
        path: '/attendance',
        children: [
            {
                title: '考勤偏移',
                path: '/attendance/attendance-edit',
                children: [] // 更多嵌套
            },
            // ...更多子页面
        ]
    },
    // {
    //     title: '其他页面2',
    //     path: '/about',
    //     children: []
    // },
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
  