<template>
    <el-header class="header">
        <img src="@/assets/logo.svg" alt="Logo" class="logo" />
        <div class="nav-items">
            <router-link to="/">首页</router-link>
            <router-link to="/about">关于</router-link>
            <!-- 你可以根据需要添加更多链接 -->
        </div>
    </el-header>
</template>
  
<script setup lang="ts">
import { RouterLink } from 'vue-router';
// 可以在这里添加一些脚本逻辑
</script>
  
<style scoped lang="scss">
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #333;
    /* 根据你的设计调整 */
    color: white;
}

.logo {
    width: 50px;
    /* 根据需要调整 */
}

.nav-items a {
    margin-left: 20px;
    color: white;
}
</style>
  