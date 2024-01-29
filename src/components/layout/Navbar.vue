<template>
    <div class="header">
        <!-- <img src="@/assets/images/logo.svg" alt="Logo" class="logo" /> -->
        <div class="title">应用</div>
        <div class="nav-items">
            <!-- 直接显示用户名 -->
            <span v-if="userStore.userinfo">{{ userStore.userinfo.username }}</span>
            <span v-if="userStore.userinfo" class="divider">|</span>
            <span @click="logout" class="logout">退 出</span>
            <!-- <el-button type="warning" text @click="logout">退出</el-button> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore'; // 导入用户状态store

const userStore = useUserStore();

// 当组件被加载时，可以调用getUserinfo来确保userinfo是最新的
onMounted(() => {
    userStore.getUserinfo();
});

// 登出方法
function logout() {
    userStore.logout(); // 处理登出的方法
    // 这里可以添加额外的登出逻辑
}
</script>

<style scoped lang="scss">

.title {
    font-size: $spacing-md;
}

.nav-items {
    display: flex;
    align-items: center;
    gap: 10px;

    /* 或者使用你需要的间距值 */
    .divider {
        margin: 0 5px; // 可以根据需要调整边距
    }
    .logout {
        color: #FFA500;
        cursor: pointer;
        font-weight: bold;
    }
}</style>
