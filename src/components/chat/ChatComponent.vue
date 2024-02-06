<template>
    <div class="main-content">
        <!-- <MessageList :messages="chatStore.messages" /> -->
        <MessageList :messages="mockMessages" />
        <InputArea @sendMessage="sendMessage"  class="input-area"/>
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, onUnmounted, inject, ref } from 'vue';
import { format } from 'date-fns';
import { useChatStore } from '@/stores/use-chat-store';
import MessageList from './MessageList.vue';
import InputArea from './InputArea.vue';

// 使用Pinia store管理聊天状态
const chatStore = useChatStore();

const mockMessages = ref([
    {
        text: "你好，欢迎使用我们的聊天应用！你好，欢迎使用我们的聊天应用！你好，欢迎使用我们的聊天应用！你好，欢迎使用我们的聊天应用！你好，欢迎使用我们的聊天应用！你好，欢迎使用我们的聊天应用！你好，欢迎使用我们的聊天应用！你好，欢迎使用我们的聊天应用！你好，欢迎使用我们的聊天应用！",
        time: "10:00 AM",
        isSent: true,
        avatar: "https://via.placeholder.com/40",
    },
    {
        text: "嗨，谢谢！很高兴加入。嗨，谢谢！很高兴加入。嗨，谢谢！很高兴加入。嗨，谢谢！很高兴加入。嗨，谢谢！很高兴加入。嗨，谢谢！很高兴加入。嗨，谢谢！很高兴加入。嗨，谢谢！很高兴加入。嗨，谢谢！很高兴加入。嗨，谢谢！很高兴加入。",
        time: "10:02 AM",
        isSent: false,
        avatar: "https://via.placeholder.com/40",
    },
    {
        text: "有什么可以帮助你的吗？",
        time: "10:05 AM",
        isSent: true,
        avatar: "https://via.placeholder.com/40",
    },
    {
        text: "我想了解更多关于你们产品的信息。",
        time: "10:06 AM",
        isSent: false,
        avatar: "https://via.placeholder.com/40",
    },
]);

// 从provide/inject获取WebSocketPlugin实例
const socketPlugin = inject('socket') as any; // 使用时确保已正确提供类型定义

const sendMessage = (message: string) => {
    const newMessage = {
        text: message,
        time: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        isSent: true,
        avatar: "https://via.placeholder.com/40", // 假设的用户头像URL
    };
    mockMessages.value.push(newMessage);
    // 调用WebSocketPlugin的sendMessage方法发送消息
    socketPlugin.sendMessage(message);
};

onMounted(() => {
    // 组件挂载时连接WebSocket
    socketPlugin.connect();
});

onUnmounted(() => {
    // 组件卸载时断开WebSocket连接
    socketPlugin.disconnect();
});
</script>

<style scoped lang="scss">
.main-content {
    height: 100%;
    padding: 0 0 15px 0;
    position: relative;
    .input-area {
        position: absolute;
        bottom: 10px;
        left: 0;
        right: 0;
    }
}
</style>