<template>
    <el-row>
        <el-col :span="isSidebarCollapsed ? 0 : 4">
            <HistoryChatSidebar @update:collapse="handleSidebarCollapse"/>
        </el-col>
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
</script>

<style lang="scss" scoped>
.el-row {
    height: 100%;
}

</style>