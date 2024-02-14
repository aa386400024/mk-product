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

const handleSidebarCollapse = (collapsed) => {
    isSidebarCollapsed.value = collapsed;
};
</script>

<style lang="scss" scoped>
::v-deep(.el-main) {
    --el-main-padding: 0 !important;
}
.el-row {
    height: 100%;
}

</style>