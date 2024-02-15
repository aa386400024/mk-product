<template>
    <el-row>
        <el-col :span="isSidebarCollapsed ? 0 : 4">
            <HistoryChatSidebar @update:collapse="handleSidebarCollapse"/>
        </el-col>
        <div :class="{'expand-sidebar-btn': true, 'is-collapsed': isSidebarCollapsed}" @click="toggleSidebar">
            <SvgIcon :name="isSidebarCollapsed ? 'expand' : 'collapsed'" class="icon" size="16" />
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
};
</script>

<style lang="scss" scoped>
.el-row {
    height: 100%;
    position: relative; /* Ensure that the absolute positioning is relative to the row */
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
        left: 0; /* Stick to the left side when collapsed */
    }
    &:not(.is-collapsed) {
        left: calc(4 * 100% / 24); /* Adjust this based on the actual width of the sidebar */
    }
}
</style>
