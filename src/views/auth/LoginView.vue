<template>
    <div class="login-container">
        <el-card class="login-card">
            <h1 class="title">煤矿智能管理系统 <span class="version"></span></h1>

            <el-form size="large">
                <el-form-item>
                    <el-input v-model="loginForm.username" :prefix-icon="UserFilled" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="loginForm.password" :prefix-icon="Lock" show-password placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleLogin">登 录</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <footer class="login-footer">
            Copyright © 2021 - 2024 company.tech All Rights Reserved. 公司名称 版权所有
            <br>
            备案号
        </footer>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { UserFilled, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/userStore';
import { ElMessage } from 'element-plus'

// Component state
const loginForm = ref({
    username: '',
    password: ''
});

const userStore = useUserStore();

// Method to handle login
const handleLogin = () => {
    // 检查用户名和密码是否已输入
    if (!loginForm.value.username || !loginForm.value.password) {
        ElMessage.error('请输入账号和密码');
        return;
    }

    console.log('Login:', loginForm.value);
    userStore.login();
};
</script>
  
<style scoped lang="scss">
.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: url('@/assets/images/login-bg.jpg') no-repeat center right;
}

.login-card {
    width: 420px;
    border-radius: 15px;
    margin-bottom: 15px;
    box-shadow: var(--el-box-shadow-light);
    .el-button {
        width: 100%;
    }
}

.title {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
}

.version {
    font-size: 14px;
    color: #999;
}

.login-footer {
    width: 100%;
    color: #999;
    font-size: 12px;
    text-align: center;
    padding: 1rem 0;
    /* 或者你需要的任何内边距 */
    position: absolute;
    /* 使用绝对定位 */
    bottom: 0;
    /* 将 footer 放置在底部 */
    left: 0;
    /* 与左边界对齐 */
}</style>
  