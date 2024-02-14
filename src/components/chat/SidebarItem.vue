<template>
    <li class="chat-item" @click="toggleSelect" :class="{ 'is-selected': isSelected }">
        <div class="chat-content" :style="chatContentStyle">{{ chat.content }}</div>
        <div class="chat-actions" v-if="isSelected">
            <SvgIcon v-for="(action, index) in actions" :key="index" :name="action.icon" class="icon" size="14"
                @click.stop="performAction(action.method)" />
        </div>
    </li>
</template>
  
<script setup lang="ts">
import { reactive, toRefs, computed } from 'vue';
import axios from 'axios';
import type { Chat } from '@/types/chat';

const props = defineProps<{
    chat: Chat,
    isSelected: Boolean
}>();

// 假设每个图标加上间距大约占用24px宽度
const iconWidth = 24;

const emit = defineEmits(['update-chat', 'select-chat']);

// 仅将actions放入reactive对象中
const state = reactive({
    actions: [
        { icon: 'pin', method: 'pinChat' },
        { icon: 'edit', method: 'renameChat' },
        { icon: 'delete', method: 'deleteChat' }
    ]
});

// 解构toRefs以获取响应式的actions数组
const { actions } = toRefs(state);

// 计算`.chat-content`的样式，特别是宽度
const chatContentStyle = computed(() => {
    const baseWidth = props.isSelected ? `calc(100% - ${state.actions.length * iconWidth}px)` : '100%';
    return {
        maxWidth: baseWidth,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    };
});

const toggleSelect = () => {
    // 总是发出当前聊天的id，不再尝试在这里切换isSelected的值
    emit('select-chat', props.chat.id);
};


const performAction = async (actionMethod: string) => {
    try {
        let action = '';
        let url = `/api/chats/${props.chat.id}`;

        switch (actionMethod) {
            case 'pinChat':
                action = props.chat.pinned ? 'unpin' : 'pin';
                url = `/api/chats/${action}`;
                break;
            case 'renameChat':
                // Assuming there's a specific API or method for renaming, adjust accordingly
                break;
            case 'deleteChat':
                // Delete uses the same URL but no need to modify action
                break;
        }

        await axios.post(url, { id: props.chat.id });
        emit('update-chat');
    } catch (error) {
        console.error(`Failed to perform action ${actionMethod}:`, error);
    }
};
</script>
<style lang="scss" scoped>
.chat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8em;
    margin: 10px;
    border-radius: 6px;
    cursor: pointer;
    border: 1px solid $gray-600;
    font-size: .85rem;
    color: $gray-200;;
    &:hover {
        background-color: rgba(84, 84, 84, 0.6);
    }

    &.is-selected {
        background-color: $gray-700;

        /* 选中状态的背景颜色 */
        .chat-content {
            color: $color-theme;
        }
    }

    .chat-content {
        /* 确保文本在一行内显示，且超出部分显示省略号 */
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .chat-actions {
        display: flex;

        .icon {
            margin-left: 0.5em;
            cursor: pointer;
            margin-top: 2px;
            display: grid;
            place-items: center;
            color: $color-theme;
        }
    }

}
</style>
