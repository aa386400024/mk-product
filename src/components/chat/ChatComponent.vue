<template>
    <div class="main-content">
        <div class="header">
            <MyDropdown :options="options" v-model="selectedValue">
            </MyDropdown>
        </div>
        <!-- <MessageList :messages="chatStore.messages" /> -->
        <MessageList :messages="mockMessages" />
        <InputArea @sendMessage="sendMessage"  class="input-area"/>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, inject, ref, computed  } from 'vue';
import { format } from 'date-fns';
import { useChatStore } from '@/stores/use-chat-store';
import MessageList from './MessageList.vue';
import { MyDropdown } from "@/components/dropdown";
import InputArea from './InputArea.vue';

// 使用Pinia store管理聊天状态
const chatStore = useChatStore();

// 这里定义一个响应式数据来与下拉选择的值进行双向绑定
const selectedValue = ref('1');

// 定义下拉菜单的选项
const options = [
    {
        name: '通用大模型',
        options: [
            {
                value: '2',
                label: '文心一言',
                title: '文心一言-3.5',
                description: '百度打造的AI大模型，中文内容生成与理解的先锋',
                avatar: '/images/model-avatars/yiyan-bg.png',
            },
            {
                value: '3',
                label: '智谱清言',
                title: '智谱清言',
                description: '这是选项3的描述。',
                avatar: '/images/model-avatars/chatglm.png',
            },
            {
                value: '1',
                label: 'ChatGPT-4',
                title: 'GPT-4',
                description: '全球认可的顶尖AI模型，创意写作与逻辑推理的佼佼者。',
                avatar: '/images/model-avatars/chatgpt.png',
            },
            {
                value: '4',
                label: '通义千问',
                title: '通义千问',
                description: '这是选项4的描述。',
                avatar: '/images/model-avatars/tongyi.png',
            },
        ],
    },
    {
        name: '私有模型',
        options: [
            {
                value: '5',
                label: '母猪的产后护理',
                title: '母猪的产后护理',
                description: '专注畜牧业，提供专业深入的产后护理知识与建议。',
                avatar: '/images/model-avatars/yiyan-bg.png',
            },
        ],
    },
];


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
    {
        text: "我想了解更多关于你们产品的信息。",
        time: "10:06 AM",
        isSent: false,
        avatar: "https://via.placeholder.com/40",
    },
    {
        text: "我想了解更多关于你们产品的信息。",
        time: "10:06 AM",
        isSent: false,
        avatar: "https://via.placeholder.com/40",
    },
    {
        text: "我想了解更多关于你们产品的信息。",
        time: "10:06 AM",
        isSent: false,
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
    // mockMessages.value.push(newMessage);
    // 调用WebSocketPlugin的sendMessage方法发送消息
    console.log(newMessage, 'newMessage')
    socketPlugin.sendMessage(newMessage);
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
    height: 100vh;
    // padding: 20px 0 40px 10px; 
    position: relative;
    .input-area {
        position: absolute;
        bottom: 10px;
        left: 20px;
        right: 20px;
    }

    .header {
        width: 100%;
        height: 50px;
        border-bottom: 1px solid $gray-400;
        box-shadow: var(--el-box-shadow-light);
    }
}
</style>