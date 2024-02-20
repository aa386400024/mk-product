<template>
    <div class="login-container">
        <el-card class="login-card">
            <h1 class="title">人工智能策略交易平台</h1>

            <el-form size="large" label-width="65px">
                <el-form-item label="账户 :">
                    <el-input v-model="loginForm.userName" placeholder="请输入邮箱、手机号或工号"></el-input>
                </el-form-item>
                <el-form-item label="密码 :">
                    <el-input v-model="loginForm.passWord" show-password placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="验证码 :">
                    <el-input v-model="loginForm.verifyCode" placeholder="请输入验证码">
                        <template #append>
                            <div class="verify-view">
                                <el-button type="primary" @click="handleGetVerifyCod">获取验证码</el-button>
                            </div>
                        </template>
                    </el-input>
                </el-form-item>
            </el-form>
            <el-checkbox v-model="checked">15天内免登录</el-checkbox>
            <el-button type="primary" size="large" class="login-btn" @click="handleLogin">登 录</el-button>
            <div class="action-links">
                <span>忘记密码</span>
            </div>
        </el-card>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { UserFilled, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user-store';
import { ElMessage } from 'element-plus'

// Component state
const loginForm = ref({
    userName: '',
    passWord: '',
    verifyCode: ''
});

const checked = ref(false)

const userStore = useUserStore();

// 获取验证码
const handleGetVerifyCod = () => {

}

// Method to handle login
const handleLogin = () => {
    // 检查用户名和密码是否已输入
    if (!loginForm.value.userName || !loginForm.value.passWord) {
        ElMessage.error('请输入账号和密码');
        return;
    }

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
    min-width: 420px;
    border-radius: 10px;
    padding: 15px;
    box-shadow: var(--el-box-shadow-light);
    .title {
        text-align: center;
        font-size: 20px;
        margin-bottom: 30px;
        color: $color-theme;
    }
    .login-btn {
        width: 100%;
        margin: 8px auto 15px;
    }
    .verify-view {

    }
    .action-links {
        color: $color-theme;
        span {
            cursor: pointer;
        }
    }
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
  