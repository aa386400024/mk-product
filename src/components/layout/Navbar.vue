<template>
    <div class="header">
        <img src="@/assets/images/logo.png" alt="Logo" class="logo" />
        <div class="title">欢迎使用</div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user-store'; // 导入用户状态store

const userStore = useUserStore();

// 当组件被加载时，调用getUserInfo来确保userinfo是最新的
onMounted(() => {
    userStore.getUserInfo();
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
    color: $gray-800;
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
        margin-left: 20px;
        height: 80%;
    }
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
}
</style>
