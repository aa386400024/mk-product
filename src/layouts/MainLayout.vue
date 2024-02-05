<template>
    <el-container class="outer-container">
        <!-- 使用封装的动态菜单组件 -->
        <el-aside>
            <el-scrollbar>
                <VerticalMenu :menuItems="menuItems" />
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
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import { VerticalMenu } from '@/components/layout';


const menuItems = ref([
    { name: '首页', icon: 'home', active: true, path: '/' },
    { name: '对话', icon: 'chat', active: false, path: '/chat' },
    { name: '知识库', icon: 'knowledge-base', active: false, path: '/knowledge-base' },
    { name: '关于', icon: 'home', active: false, path: '/about' },
]); 
</script>

<style scoped lang="scss">
.el-aside {
    width: 72px;
    position: relative;
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
</style>
  