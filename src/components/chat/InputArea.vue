<template>
    <div class="input-area">
        <el-input v-model="message" class="input-field" placeholder="请输入消息..." clearable @keyup.enter="handleSend" />
        <el-button type="primary" icon="el-icon-send" @click="handleSend">发送</el-button>
    </div>
</template>
  
<script setup lang="ts">
import { ref, defineEmits } from 'vue';

// 使用const定义组件事件发射器
const emit = defineEmits(['sendMessage']);

// 使用const定义响应式变量
const message = ref('');

// 使用const定义方法
const handleSend = () => {
    if (message.value.trim()) {
        emit('sendMessage', message.value);
        message.value = ''; // 清空输入框
    }
};
</script>
  
<style scoped lang="scss">
.input-area {
    display: flex;
    align-items: center;
    gap: 10px;

    .input-field {
        flex-grow: 1;
    }
}
</style>
  