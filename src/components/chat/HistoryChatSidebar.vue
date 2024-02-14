<template>
    <aside class="chat-sidebar">
        <el-scrollbar>
            <!-- 置顶聊天 -->
            <section v-if="pinnedChats.length > 0" class="chat-section">
                <h2 class="chat-header">置顶</h2>
                <ul class="chat-list">
                    <SidebarItem v-for="chat in pinnedChats" :key="chat.id" :chat="chat"
                        :isSelected="selectedChatId === chat.id" @select-chat="selectChat" @update-chat="fetchChats" />
                </ul>
            </section>

            <!-- 分类聊天 -->
            <section v-for="(chats, category) in categorizedChats" :key="category" class="chat-section">
                <h2 class="chat-header">{{ categoryLabels[category] }}</h2>
                <ul class="chat-list">
                    <SidebarItem v-for="chat in chats" :key="chat.id" :chat="chat" :isSelected="selectedChatId === chat.id"
                        @select-chat="selectChat" @update-chat="fetchChats" />
                </ul>
            </section>
        </el-scrollbar>

        <!-- 展开/收起控制按钮 -->
        <div class="collapse-icon" @click="toggleSidebar">
            <SvgIcon :name="'home'" class="icon" size="24" />
        </div>
    </aside>
</template>
  
<script setup lang="ts">
import { ref, reactive, toRefs, onMounted } from 'vue'
import SidebarItem from './SidebarItem.vue'
import { chatHistory } from '@/api/chat';
import type { Chat, CategorizedChats } from '@/types/chat'

// 定义mock数据
const mockData = {
    pinned: [
        { id: 1, content: '这是一条置顶消息这是一条置顶消息', pinned: true, timestamp: new Date().toISOString() },
        // 其他置顶消息...
    ],
    today: [
        { id: 2, content: '今天的消息', pinned: false, timestamp: new Date().toISOString() },
        { id: 211, content: '今天的2消息', pinned: false, timestamp: new Date().toISOString() },
        // 今天的其他消息...
    ],
    yesterday: [
        { id: 3, content: '昨天的消息', pinned: false, timestamp: new Date().toISOString() },
        // 昨天的其他消息...
    ],
    last7Days: [
        { id: 4, content: '过去7天的消息', pinned: false, timestamp: new Date().toISOString() },
        // 过去7天的其他消息...
    ],
    last30Days: [
        { id: 5, content: '过去30天的消息', pinned: false, timestamp: new Date().toISOString() },
        { id: 6, content: '过去30天的消息', pinned: false, timestamp: new Date().toISOString() },
        { id: 7, content: '过去30天的消息', pinned: false, timestamp: new Date().toISOString() },
        { id: 8, content: '过去30天的消息', pinned: false, timestamp: new Date().toISOString() },
        { id: 9, content: '过去30天的消息', pinned: false, timestamp: new Date().toISOString() },
        { id: 10, content: '过去30天的消息', pinned: false, timestamp: new Date().toISOString() },
        { id: 11, content: '过去30天的消息', pinned: false, timestamp: new Date().toISOString() },
        { id: 12, content: '过去30天的消息', pinned: false, timestamp: new Date().toISOString() },
        // 过去30天的其他消息...
    ],
};

// 使用reactive定义响应式状态
const state = reactive({
    pinnedChats: [] as Chat[],
    categorizedChats: {} as CategorizedChats,
    selectedChatId: null as number | null,
    categoryLabels: {
        today: '今天',
        yesterday: '昨天',
        last7Days: '过去7天',
        last30Days: '过去30天'
    }
});

// 将reactive状态转换为单独的响应式引用
const { pinnedChats, categorizedChats, selectedChatId, categoryLabels } = toRefs(state);

const emit = defineEmits(['update:collapse']);

// 新增侧边栏展开/收起状态
const isCollapsed = ref(false);

// 切换侧边栏状态
const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value;
    // 发出事件以便父组件可以相应调整布局
    emit('update:collapse', isCollapsed.value);
};

// 获取聊天记录的异步函数
// const fetchChats = async () => {
//     try {
//         const params = {}; // 根据需要设置参数
//         const response = await chatHistory(params);
//         const { pinned, ...categories } = response.data;
//         state.pinnedChats = pinned;
//         state.categorizedChats = categories;
//     } catch (error) {
//         console.error('获取聊天记录失败:', error);
//     }
// };

// 模拟获取聊天记录的函数
const fetchChats = () => {
    // 使用setTimeout来模拟异步请求
    setTimeout(() => {
        state.pinnedChats = mockData.pinned;
        state.categorizedChats = {
            today: mockData.today,
            yesterday: mockData.yesterday,
            last7Days: mockData.last7Days,
            last30Days: mockData.last30Days,
        };
    }, 1000); // 延迟1秒模拟网络延迟
};

const selectChat = (id: number | null) => {
    state.selectedChatId = id;
};

// 组件挂载时获取聊天记录
onMounted(fetchChats);
</script>
  
<style lang="scss" scoped>
.chat-sidebar {
    height: 100vh;
    background-color: $gray-800;
    position: relative;
    transition: width 0.3s ease;

    &.is-collapsed {
        width: 50px; // 或其他你希望的收起宽度
    }

    .collapse-icon {
        position: absolute;
        top: 50%;
        right: -20px; // 根据需要调整
        cursor: pointer;
        transform: translateY(-50%);
        z-index: 100;
    }

    // 侧边栏样式
    .chat-section {
        // 聊天部分样式
        padding-top: 15px;
    }

    .chat-header {
        // 部分标题样式
        color: $gray-500;
        font-size: 12px;
        padding: 0 10px;
    }

    .chat-list {
        // 聊天列表样式
        padding: 0;
        list-style: none;
    }
}
</style>
  