<template>
    <div class="message-list">
        <MessageItem v-for="(message, index) in messages" :key="index" :message="message" />
    </div>
</template>
  
<script setup lang="ts">
import { nextTick, onUpdated } from 'vue';
import MessageItem from './MessageItem.vue';

const props = defineProps<{
    messages: Array<{
        text: string,
        time: string,
        isSent: boolean,
        avatar: string,
    }>
}>();

// 添加滚动到底部的方法
const scrollToBottom = () => {
    nextTick(() => {
        const container = document.querySelector('.message-list');
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    });
};

onUpdated(scrollToBottom);
</script>
  
<style scoped lang="scss">
.message-list {
    height: calc(100% - 130px);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 30px 10px;
}
</style>