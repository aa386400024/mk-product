<template>
    <el-row>
        <el-col :span="isSidebarCollapsed ? 0 : 5">
            <div class="left-menu">
                <MySubsection :items="items" v-model="activeIndex" />
                <template v-if="activeIndex === 0">
                    <HistoryChatSidebar @update:collapse="handleSidebarCollapse" />
                    <div class="left-menu-footer">底部内容</div>
                </template>
                <template v-else-if="activeIndex === 1">
                    <div>分段器2的内容</div>
                </template>
                <template v-else-if="activeIndex === 2">
                    <div>分段器2的内容</div>
                </template>
                
            </div>
        </el-col>
        <div :class="{ 'expand-sidebar-btn': true, 'is-collapsed': isSidebarCollapsed }" @click="toggleSidebar">
            <SvgIcon :name="isSidebarCollapsed ? 'expand' : 'collapsed'" class="icon" size="16" />
        </div>
        <el-col :span="isSidebarCollapsed ? 24 : 19">
            <ChatComponent />
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ChatComponent, HistoryChatSidebar } from "@/components/chat";
import { MySubsection } from '@/components/subsection';

// 定义子组件需要的items数组
const items = ref([
    { label: '历史会话', slotName: 'slot1' },
    { label: '内容创作', slotName: 'slot2' },
    { label: '知识库啊', slotName: 'slot3' },
    // 根据需要添加更多分段器
]);

// 使用 ref 来响应式地跟踪当前激活的分段器索引
const activeIndex = ref(0);

const isSidebarCollapsed = ref(false);


const handleSidebarCollapse = (collapsed: boolean) => {
    isSidebarCollapsed.value = collapsed;
};

const toggleSidebar = () => {
    isSidebarCollapsed.value = !isSidebarCollapsed.value;
};
</script>

<style lang="scss" scoped>
.el-row {
    position: relative;
    /* Ensure that the absolute positioning is relative to the row */
    display: flex;
    flex-direction: row;
    height: 100vh;
    /* 或者使用100%，前提是父元素正确设置了高度 */
    align-items: stretch;
    /* 这会使所有子元素（el-col）的高度与el-row一样 */
}

.left-menu {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: $gray-800;
    &-footer {
        flex: 0 0 auto;
        padding: 10px;
        border-top: 1px solid $gray-700;
        background-color: red;
        box-shadow: --el-box-shadow-light; /* 添加朝上的阴影 */
    }
}

.expand-sidebar-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 18px;
    height: 50px;
    background-color: $gray-500;
    color: #fff;
    border-radius: 0 10px 10px 0;

    &:hover {
        background-color: $gray-600;
    }

    .icon {
        display: flex;
        color: $gray-200;
    }

    &.is-collapsed {
        left: 0;
        /* Stick to the left side when collapsed */
    }

    &:not(.is-collapsed) {
        left: calc(5 * 100% / 24);
        /* Adjust this based on the actual width of the sidebar */
    }
}</style>
