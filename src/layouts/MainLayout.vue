<template>
    <el-container>
        <!-- 使用封装的动态菜单组件 -->
        <el-aside width="200px">
            <sidebar :menu-items="menuItems" />
        </el-aside>

        <el-container>
            <!-- 这里可以插入 Navbar 组件，如果你需要的话 -->
            <el-header>
                <Navbar />
            </el-header>


            <el-main>
                <router-view></router-view>
            </el-main>

            <!-- 插入 Footer 组件 -->
            <el-footer>
                <Footer />
            </el-footer>
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
    // ...更多顶级菜单项
];
</script>
  
<style scoped lang="scss">
.el-header {
    height: 50px;
    padding: 0;
}

.el-footer {
    height: 30px;
    padding: 0;
}
</style>
  