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
            <SvgIcon :name="isSidebarCollapsed ? 'expand' : 'collapsed'" class="icon" size="30" />
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
        box-shadow: --el-box-shadow-light;
        /* 添加朝上的阴影 */
    }
}

.expand-sidebar-btn {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%) scale(0.5);
    z-index: 10;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 119px;
    background: $gray-500;
    /* 与 SVG 相同的背景色 */
    clip-path: path('M0 0C3 14 13.9783 19.4318 17.6537 21.1119C22.5542 23.3519 26.4477 27.6485 28.4776 33.0565C30 37.1124 30 42.2543 30 52.538L30 66.462C30 76.7457 30 81.8876 28.4776 85.9435C26.4477 91.3515 22.5542 95.6481 17.6537 97.8881C13.9783 99.5682 3 105 0 119L0 0Z');
    //   transform: scale(0.6, 0.42); /* 缩放比例基于目标尺寸与原始尺寸的比例 */
    transform-origin: top left;

    /* 变换基点设置为左上角 */
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
