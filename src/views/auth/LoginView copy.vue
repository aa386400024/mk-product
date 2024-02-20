<template>
    <div class="container" :style="containerStyle">
        <div class="header-login" v-if="slides.length > 0" @click="handleHeaderLoginBtn" :style="{ color: buttonColor }">
            登录
        </div>
        <!-- <transition name="fade-transform" mode="out-in">
            <div class="signBox" v-show="isShowSignCard">
                <div class="signIn">
                    <div class="logo">
                        <h2>人工智能策略交易平台</h2>
                    </div>
                    <el-form v-model="loginForm" :rules="loginRules" ref="loginFormRef" label-width="65px"
                        class="demo-ruleForm" :hide-required-asterisk="true">
                        <el-form-item label="账户：" prop="userName">
                            <el-input v-model="loginForm.userName" placeholder="请输入邮箱、手机号或工号"></el-input>
                        </el-form-item>
                        <el-form-item label="密码：" prop="passWord">
                            <el-input v-model="loginForm.passWord" type="password" placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <el-form-item label="验证码：" prop="verifyCode">
                            <el-col :span="16">
                                <el-input v-model="loginForm.verifyCode" placeholder="请输入验证码"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <el-button class="verifyCodeBtn" :type="btnType" @click="sendVerifyCode"
                                    :disabled="btnDisabled">
                                    {{ btnText }}
                                </el-button>
                            </el-col>
                        </el-form-item>
                    </el-form>

                    <el-checkbox v-model="checked" style="float: left" @change="loginChange">{{ loginDay
                    }}天内免登录</el-checkbox>
                    <el-button type="primary" @keyup.enter="handleLoginBtn" @click="submitForm('loginForm')">登 录</el-button>
                    <div class="reset-password">
                        <span>
                            <router-link :to="{ path: '/RetrievePass' }">忘记密码</router-link>
                        </span>
                    </div>
                </div>
            </div>
        </transition> -->
    </div>
</template>
  
<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElForm } from 'element-plus';
//   import { encryptedData } from '@/utils/auth';
//   import { isFromCitic } from '@/utils/common.js';

const router = useRouter();
const route = useRoute();

const isLoading = ref(true);
const buttonColor = ref("#575757");
const isShowSignCard = ref(false);
const slides = ref([]);
const options = ref({
    slidesPerView: "auto",
    spaceBetween: 0,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
});
const loginForm = ref({
    userName: "",
    passWord: "",
    verifyCode: "",
    uuid: "",
    freeLogin: "1",
});
const loginRules = ref({
    userName: [{ required: true, message: "账号不能为空", trigger: "blur" }],
    passWord: [{ required: true, message: "密码不能为空", trigger: "blur" }],
    verifyCode: [
        { required: true, message: "验证码不能为空", trigger: "blur" },
        { pattern: /^[0-9]{6}$/, message: "验证码格式不正确", trigger: "blur" },
    ],
});
const loginFormRef = ref<typeof ElForm | null>(null);
const checked = ref(false);
const btnType = ref("danger");
const btnDisabled = ref(false);
const btnText = ref("获取验证码");
const timer = ref<NodeJS.Timeout | null>(null);

// Computed properties
const containerStyle = computed(() => {
    return isLoading.value
        ? `background-image: none;`
        : slides.value.length > 0
            ? 'background-image: none;'
            : `background-image: url(${require('@/assets/images/login_bg.png')})`;
});

//   const citicsinfo = computed(() => isFromCitic && process.env.VUE_APP_BASE_URL.includes("ai.citicsinfo.com"));
//   const loginDay = computed(() => citicsinfo.value ? 7 : 15);

// Methods
const handleHeaderLoginBtn = () => {
    isShowSignCard.value = true;
};

const submitForm = (formName: string) => {
    // 逻辑实现，注意对应的 TypeScript 类型
};

const sendVerifyCode = () => {
    // 发送验证码逻辑
};

const loginChange = () => {
    // 登录更改逻辑
};

const handleLoginBtn = () => {

}

const onSlideChange = (swiper: any) => {
    // 幻灯片更改逻辑
};

// Mounted and Watch
onMounted(() => {
    // 初始化逻辑
});

watch(() => route.path, () => {
    // 路由变化逻辑
});
</script>
  
<style lang="scss" scoped>
/* 你的 SCSS 样式 */
</style>
  