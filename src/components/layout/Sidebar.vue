<template>
    <el-menu :collapse="isCollapse" background-color="#304156" text-color="#fff"
        active-text-color="#ffd04b" :default-active="activeRoute">
        <template v-for="item in menuItems" :key="item.path">
            <sidebar-menu-item :item="item" />
        </template>
    </el-menu>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
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
.el-menu {
    border-right: none;
}
</style>
