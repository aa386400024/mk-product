<template>
    <el-aside class="full-height-aside">
        <el-menu class="full-height-menu" :collapse="isCollapse" background-color="#304156" text-color="#fff"
            active-text-color="#ffd04b" :default-active="activeRoute">
            <template v-for="item in menuItems" :key="item.path">
                <sidebar-menu-item :item="item" />
            </template>
        </el-menu>
    </el-aside>
</template>

<script setup lang="ts">
import { defineProps, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import SidebarMenuItem from './SidebarMenuItem.vue';

interface MenuItem {
    path: string;
    title: string;
    children?: MenuItem[];
}

const props = defineProps({
    menuItems: Array as () => MenuItem[]
});
const isCollapse = ref(false); // 控制菜单是否折叠

const route = useRoute();
const activeRoute = computed(() => route.path);
</script>

<style lang="scss" scoped>
.full-height-aside {
    height: 100vh; // 侧边栏高度撑满

    .el-menu {
        height: 100%;
        overflow-y: auto;
        border-right: none;

        ::v-deep(.el-menu-item.is-active, .el-sub-menu__title.is-active) {
            background-color: #1f2d3d; // 激活项的背景颜色
            color: #ffd04b; // 激活项的文字颜色
        }
    }
}
</style>
