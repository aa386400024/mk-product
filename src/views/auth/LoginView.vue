<template>
    <div class="login-container">
        <div class="swiper-container">
            <MySwiper :slides="slidesData" />
        </div>
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
import { MySwiper } from '@/components/swiper';

import { UserFilled, Lock } from '@element-plus/icons-vue';
import { useUserStore } from '@/stores/user-store';
import { ElMessage } from 'element-plus'

// 创建一个ref对象，用于存储登录表单的数据
const loginForm = ref({
    userName: '',
    passWord: '',
    verifyCode: ''
});

// 定义并初始化slides数据
const slidesData = ref([
    { type: 'video', src: '/videos/winter.mp4' },
    // { type: 'image', src: 'path/to/image2.jpg', alt: 'Another image' },
    // 可以根据需要添加更多的滑块数据
]);

// 创建一个ref对象，用于存储是否已选中登录按钮的状态
const checked = ref(false);

// 使用useUserStore钩子函数，获取用户store对象
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
.swiper-container {
    position: fixed; // 设置为fixed使其充满整个屏幕
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    // z-index: -1; // 确保它在登录卡片下面
}

.login-container {
    position: relative; // 设置为相对定位
    min-height: 100vh;
    display: flex;
    justify-content: center; // 水平居中
    align-items: center; // 垂直居中
}

.login-card {
    position: absolute;
    right: 40px;
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

    .verify-view {}

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
}
</style>
  