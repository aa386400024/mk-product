<template>
    <div class="input-area">
        <el-input v-model="message" type="textarea" :autosize="{ minRows: 3, maxRows: 5 }" resize="none"
            class="input-field" :input-style="{
                height: '100px',
                borderRadius: '14px',
                padding: '10px 20px 50px 20px',
                border: '1px solid #ffd04b'
            }" placeholder="请输入消息..." clearable @keyup.enter="handleSend" />
        <div class="button-area">
            <div>
                <SvgIcon :name="'home'" :size="'24px'" class="icon" @click="handleSend" />
            </div>
            <div>
                <SvgIcon :name="'home'" :size="'24px'" class="icon" @click="handleSend" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

// 使用const定义组件事件发射器
const emit = defineEmits(['sendMessage'])

// 使用const定义响应式变量
const message = ref('')

// 使用const定义方法
const handleSend = () => {
    if (message.value.trim()) {
        emit('sendMessage', message.value)
        message.value = '' // 清空输入框
    }
}
</script>

<style scoped lang="scss">
.input-area {
    position: relative;
    margin: auto 20px;

    ::v-deep(.el-textarea) {
        --el-input-focus-border: 1px solid #ffd04b;
        --el-input-focus-border-color: 2px solid #ffd04b;
        --el-input-hover-border-color: 1px solid #fff2d0;
    }

    ::v-deep(.el-textarea__inner) {
        scrollbar-width: none;
        /* Firefox */
        -ms-overflow-style: none;
        /* IE 10+ */
    }

    ::v-deep(.el-textarea__inner::-webkit-scrollbar) {
        width: 0px;
        background: transparent;
        /* Chrome/Safari/Webkit */
    }

    .input-field {
        z-index: 1;
    }

    .button-area {
        position: absolute;
        bottom: 2px;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        padding: 0 10px 10px;
        margin: 0 5px;
        z-index: 2;
        background-color: #fff;
        border-radius: 10px;

        .icon {
            cursor: pointer;
        }
    }
}
</style>
