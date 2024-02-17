<template>
    <aside class="chat-sidebar">
        <div class="sidebar-controls">
            <el-button color="#FFA500" plain round @click="createNewChat">
                <SvgIcon name="chat-3" class="chat-icon" size="15" /> 新会话
            </el-button>
            <div class="icon-view">
                <SvgIcon name="clear" class="icon" size="20" @click="clearChatHistory" />
            </div>
        </div>
        <el-scrollbar class="scrollbar-content">
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
    </aside>
</template>
  
<script setup lang="ts">
import { ref, reactive, toRefs, onMounted } from 'vue'
import SidebarItem from './SidebarItem.vue'
import { chatHistory } from '@/api/chat';
import { ElMessage, ElMessageBox } from 'element-plus'
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
    }, 300); // 延迟1秒模拟网络延迟
};

const createNewChat = () => {
    // 实现新建会话的逻辑
};

const clearChatHistory = () => {
    // 实现清空聊天记录的逻辑
    ElMessageBox.confirm(
        '确定清空所有聊天记录？此操作不可撤销。',
        '清空聊天记录确认',
        {
            confirmButtonText: '立即清空',
            cancelButtonText: '我再想想',
            type: 'warning',
        }
    )
        .then(() => {
            ElMessage({
                type: 'success',
                message: '聊天记录已成功清空。',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '操作已取消，聊天记录未被清空。',
            })
        })
};


const selectChat = (id: number | null) => {
    state.selectedChatId = id;
};

// 组件挂载时获取聊天记录
onMounted(fetchChats);
</script>
  
<style lang="scss" scoped>
.chat-sidebar {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: $gray-800;
    position: relative;
    transition: width 0.3s ease;
    overflow: hidden;

    .sidebar-controls {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px; // 根据需要调整内边距

        .el-button {
            flex-grow: 1;
            // color: #fff;
        }

        .chat-icon {
            margin-right: 8px;
        }

        .icon-view {
            height: 35px;
            width: 35px;
            background-color: #FFF6E6;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            cursor: pointer;
            margin-left: 15px;
            border: 1px solid #FFD280;

            &:hover {
                background-color: $color-theme;
                border: 1px solid #FFD280;

                .icon {
                    color: #fff; // 当.icon-view被悬停时改变图标颜色
                }
            }

            .icon {
                display: flex;
                color: $color-theme;
            }
        }

    }

    .scrollbar-content {
        flex: 1; // 让滚动内容占据剩余空间
        overflow-y: auto; // 如果内容超出则显示滚动条
    }

    .el-scrollbar {
        height: 100%;
        flex: 1;
        /* 占据剩余空间 */
        overflow-y: auto;
        /* 如果需要滚动 */
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
  