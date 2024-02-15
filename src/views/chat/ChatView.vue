<template>
    <el-row>
        <el-col :span="isSidebarCollapsed ? 0 : 4">
            <HistoryChatSidebar @update:collapse="handleSidebarCollapse"/>
        </el-col>
        <div v-if="isSidebarCollapsed" class="expand-sidebar-btn" @click="toggleSidebar">
            <!-- 使用SvgIcon组件或者任何图标来表示展开 -->
            <SvgIcon name="expand" class="icon" size="16" />
        </div>
        <el-col :span="isSidebarCollapsed ? 24 : 20">
            <ChatComponent/>
        </el-col>
    </el-row>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { ChatComponent, HistoryChatSidebar } from "@/components/chat";

const isSidebarCollapsed = ref(false);

const handleSidebarCollapse = (collapsed: boolean) => {
    isSidebarCollapsed.value = collapsed;
};

const toggleSidebar = () => {
    isSidebarCollapsed.value = !isSidebarCollapsed.value;
    // 这里可以发出事件或调用方法通知`HistoryChatSidebar`组件更新状态
};
</script>

<style lang="scss" scoped>
.el-row {
    height: 100%;
}

.expand-sidebar-btn {
    position: absolute;
    top: 50%; // 垂直居中
    left: 0; // 紧贴左侧边缘
    transform: translateY(-50%); // 确保完全居中
    z-index: 10; // 保证按钮在其他元素之上
    cursor: pointer;

    // 按钮样式，可以根据实际设计调整
    display: flex;
    justify-content: center;
    align-items: center;
    width: 18px; // 与侧边栏收起时的宽度一致
    height: 50px; // 根据需要调整
    background-color: $gray-500;
    color: #fff;
    border-radius: 0 10px 10px 0; // 圆角效果
    &:hover {
        background-color: $gray-600;
    }
    .icon {
            display: flex;
            color: $gray-200;
        }
}
</style>