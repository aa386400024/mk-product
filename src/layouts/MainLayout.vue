<template>
    <el-header>
        <Navbar />
    </el-header>
    <el-container>
        <el-main>
            <router-view></router-view>
        </el-main>
        <el-footer><Footer /></el-footer>
        
    </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import { Navbar, Footer } from '@/components/layout';

</script>

<style scoped lang="scss">
.el-header {
    position: fixed; // 设置为固定定位
    top: 0; // 定位到屏幕顶部
    left: 0; // 定位到屏幕左边
    width: 100%; // 占满整个屏幕宽度
    height: 70px;
    z-index: 1000; // 确保 header 在其他内容之上
    padding: 0;
    background: #fff;
}

</style>
  