<template>
    <div>
        <div class="message-item" :class="{ 'is-sent': message.isSent }">
            <div class="avatar">
                <img :src="message.avatar" alt="User avatar" />
            </div>
            <div class="message-content">
                <div class="time">{{ message.time }}</div>
                <div class="content">
                    <MarkdownRenderer :markdown="message.text" />
                </div>
                <div class="tools">
                    <SvgIcon v-for="item in toolItems" :key="item.icon" :name="item.icon" :size="'24px'" class="icon"
                        @click="() => handleToolClick(item.icon)" />
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { ElMessage } from 'element-plus'
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer.vue';

const props = defineProps<{
    message: {
        text: string,
        time: string,
        isSent: boolean,
        avatar: string,
    }
}>();

const toolItems = computed(() => props.message.isSent ? [
    { icon: 'resend', label: '重发' },
    { icon: 'copy', label: '复制' },
] : [
    { icon: 'voice', label: '语音播报' },
    { icon: 'copy', label: '复制' },
    { icon: 'like', label: '点赞' },
    { icon: 'dislike', label: '踩' },
    { icon: 'word', label: '导出Word' },
]);

const copyTextToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text);
        ElMessage.success('消息文本已成功复制到剪贴板。');
    } catch (err) {
        ElMessage.error('无法复制文本，请手动复制或检查浏览器权限。');
        console.error('Failed to copy: ', err);
    }
};

const handleToolClick = (iconName: string) => {
    console.log(`${iconName} clicked`);
    // 根据iconName执行不同的逻辑
    switch (iconName) {
        case 'resend':
            // 重发逻辑
            break;
        case 'copy':
            // 复制逻辑
            copyTextToClipboard(props.message.text);
            break;
        case 'voice':
            // 语音播报逻辑
            break;
        case 'like':
            // 点赞逻辑
            break;
        case 'dislike':
            // 踩逻辑
            break;
        case 'word':
            // 导出Word逻辑
            break;
        default:
            console.log('未知工具操作');
    }
};


</script>

<style scoped lang="scss">
.message-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 30px;

    &.is-sent {
        flex-direction: row-reverse;

        .avatar {
            margin-left: 10px; // 对于发送消息，调整头像与消息框的间距
            margin-right: 0;
        }
    }

    &:not(.is-sent) {
        .avatar {
            margin-right: 10px; // 对于接收的消息，保持原有间距
        }
    }

    .avatar {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        overflow: hidden;
        border-radius: 20px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .message-content {
        display: flex;
        flex-direction: column;
        max-width: calc(100% - 60px); // 调整以适应头像和间距
    }

    .time,
    .content,
    .tools {
        align-self: flex-start;
    }

    &.is-sent .time,
    &.is-sent .content,
    &.is-sent .tools {
        align-self: flex-end;
    }

    &.is-sent .content {
        background-color: #dcf8c6;
        /* 设定发送消息的背景颜色为浅蓝色 */
    }


    .content {
        padding: 8px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    }

    .time {
        font-size: 0.75rem;
        color: #999;
        margin-bottom: 5px; // 时间和消息内容之间的间距
    }

    .tools {
        display: flex;
        gap: 5px;
        margin-top: 5px; // 工具栏和消息内容之间的间距

        .icon {
            cursor: pointer;
            background-color: $gray-100; // 示例背景颜色，可以根据需要调整
            border-radius: 6px; // 完全圆角
            padding: 5px; // 内边距，根据图标大小调整
            display: flex; // 使图标垂直和水平居中
            justify-content: center;
            align-items: center;
            // 可选：添加一个轻微的阴影效果，增强视觉效果
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

            &:hover {
                background-color: $gray-600;
                color: #ffd04b;
            }
        }
    }
}
</style>
